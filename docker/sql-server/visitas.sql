-- we don't know how to generate database visitas-002 (class Database) :(
create table vis.contact
(
  id           uniqueidentifier default newsequentialid() not null
    primary key,
  name         nvarchar(100)                              not null,
  full_address nvarchar(max),
  phoneNumber  nvarchar(100),
  email        nvarchar(100)
)
go

create table vis.divisionContactFields
(
  id           uniqueidentifier default newsequentialid() not null
    constraint divisionContactFields_id_pk
    primary key,
  division_id  uniqueidentifier                           not null,
  fieldName    nvarchar(30)                               not null,
  fieldType    char(3) default 'TXT'                      not null,
  fieldOptions nvarchar(max)
)
go

exec sp_addextendedproperty 'MS_Description', 'Current supported fieldType ty', 'SCHEMA', 'vis', 'TABLE',
                            'divisionContactFields', 'COLUMN', 'fieldType'
go

create table vis.division
(
  id   uniqueidentifier default newsequentialid() not null
    primary key,
  code nvarchar(30)                               not null,
  name nvarchar(50)                               not null
)
go

create unique index division_code_uindex
  on vis.division (code)
go

create table vis.divisionContact
(
  division_id uniqueidentifier not null
    constraint divisionContact_fk_division
    references vis.division,
  contact_id  uniqueidentifier not null
    constraint divisionContact_fk_contact
    references vis.contact,
  constraint divisionContact_division_id_contact_id_pk
  primary key (division_id, contact_id)
)
go

create table vis.territory
(
  id           uniqueidentifier default newsequentialid() not null
    primary key,
  code         nvarchar(30)                               not null,
  name         nvarchar(100),
  valid        bit default 1                              not null,
  created_by   nvarchar(50),
  created_date datetime,
  updated_by   nvarchar(50),
  updated_date datetime
)
go

create unique index territory_code_uindex
  on vis.territory (code)
go

create table vis.divisionTerritory
(
  division_id  uniqueidentifier not null
    constraint divisionTerritory_fk_division
    references vis.division,
  territory_id uniqueidentifier not null
    constraint divisionTerritory_fk_territory
    references vis.territory,
  constraint divisionTerritory_division_id_territory_id_pk
  primary key (division_id, territory_id)
)
go

create table vis.territoryContact
(
  division_id  uniqueidentifier not null,
  territory_id uniqueidentifier not null,
  contact_id   uniqueidentifier not null,
  constraint territoryContact_divisionTerritory_division_id_territory_id_fk
  foreign key (division_id, territory_id) references vis.divisionTerritory,
  constraint territoryContact_divisionContact_division_id_contact_id_fk
  foreign key (division_id, contact_id) references vis.divisionContact
)
go

CREATE view vis.viewDivisionTerritoryCodes as
  select
    d.code division_code,
    t.code territory_code,
    d.id   division_id,
    t.id   territory_id
  from vis.division d
    inner join vis.divisionTerritory dt on d.id = dt.division_id
    inner join vis.territory t on dt.territory_id = t.id
go

create procedure vis.uspRemoveTerritory
    @divisionId  nvarchar(max),
    @territoryId nvarchar(max)
as begin
  begin transaction
  delete tc from territoryContact tc
  where tc.territory_id = @territoryId and
        exists(select null
               from divisionTerritory dt
               where dt.division_id = @divisionId and dt.territory_id = tc.territory_id);

  delete dt from divisionTerritory dt
  where dt.division_id = @divisionId and dt.territory_id = @territoryId;

  delete from vis.territory
  where id = @territoryId;
  commit transaction
end
go

create procedure vis.usp_UpsertTerritory
    @divisionId  uniqueidentifier,
    @territoryId nvarchar,
    @code        nvarchar(max),
    @name        nvarchar(100)
as begin
  begin transaction

  update vis.territory
  set code = @code, name = @name, valid = 1
  where
    id = @territoryId and exists(select null
                                 from vis.divisionTerritory
                                 where division_id = @divisionId and territory_id = @territoryId);

  if @@rowcount = 0
    begin
      declare @tmp table(id uniqueidentifier);
      declare @newId uniqueidentifier;

      insert into vis.territory (code, name, valid)
      output inserted.id into @tmp
      values (@code, @name, 1);
      select @newId = id
      from @tmp;
      insert into vis.divisionTerritory values (@divisionId, @newId);
    end
  commit transaction
  select *
  from vis.territory
  where code = @code;
end
go

