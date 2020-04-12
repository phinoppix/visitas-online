--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 12.0

-- Started on 2020-02-13 14:01:57 EST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 18004)
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger;


--
-- TOC entry 11 (class 2615 OID 18273)
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger_data;


--
-- TOC entry 9 (class 2615 OID 18436)
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- TOC entry 4809 (class 0 OID 0)
-- Dependencies: 9
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- TOC entry 2 (class 3079 OID 16402)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4810 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- TOC entry 3 (class 3079 OID 18437)
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- TOC entry 4811 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- TOC entry 2028 (class 1247 OID 18614)
-- Name: stamp; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.stamp AS (
	stamp_by character varying(100),
	stamp_date date
);


SET default_tablespace = '';

--
-- TOC entry 223 (class 1259 OID 18595)
-- Name: division; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.division (
    id integer NOT NULL,
    code character varying(30) NOT NULL,
    name character varying(50) NOT NULL,
    created public.stamp,
    updated public.stamp
);


--
-- TOC entry 222 (class 1259 OID 18593)
-- Name: division_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.division_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4812 (class 0 OID 0)
-- Dependencies: 222
-- Name: division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.division_id_seq OWNED BY public.division.id;


--
-- TOC entry 229 (class 1259 OID 18643)
-- Name: division_territories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.division_territories (
    division_id integer NOT NULL,
    territory_id integer NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 18618)
-- Name: contact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    name character varying(100),
    full_address character varying(500),
    location_data json,
    status character varying(15),
    created public.stamp,
    updated public.stamp,
    remarks text
);


--
-- TOC entry 225 (class 1259 OID 18603)
-- Name: territory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.territory (
    id integer NOT NULL,
    code character varying(30),
    name character varying(50),
    boundaries public.geography(Point,4326)[],
    created public.stamp,
    updated public.stamp
);


--
-- TOC entry 230 (class 1259 OID 18658)
-- Name: territory_assignment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.territory_assignment (
    territory_id integer,
    user_id character varying(100),
    check_in date,
    check_out date,
    created public.stamp,
    updated public.stamp
);


--
-- TOC entry 228 (class 1259 OID 18626)
-- Name: territory_contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.territory_contacts (
    territory_id integer NOT NULL,
    contact_id integer NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 18601)
-- Name: territory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.territory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4813 (class 0 OID 0)
-- Dependencies: 224
-- Name: territory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.territory_id_seq OWNED BY public.territory.id;


--
-- TOC entry 4647 (class 2604 OID 18598)
-- Name: division id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.division ALTER COLUMN id SET DEFAULT nextval('public.division_id_seq'::regclass);


--
-- TOC entry 4648 (class 2604 OID 18606)
-- Name: territory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory ALTER COLUMN id SET DEFAULT nextval('public.territory_id_seq'::regclass);


--
-- TOC entry 4660 (class 2606 OID 18600)
-- Name: division division_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.division
    ADD CONSTRAINT division_pkey PRIMARY KEY (id);


--
-- TOC entry 4670 (class 2606 OID 18647)
-- Name: division_territories division_territories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.division_territories
    ADD CONSTRAINT division_territories_pkey PRIMARY KEY (division_id, territory_id);


--
-- TOC entry 4666 (class 2606 OID 18625)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- TOC entry 4668 (class 2606 OID 18630)
-- Name: territory_contacts territory_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory_contacts
    ADD CONSTRAINT territory_contacts_pkey PRIMARY KEY (territory_id, contact_id);


--
-- TOC entry 4662 (class 2606 OID 18608)
-- Name: territory territory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory
    ADD CONSTRAINT territory_pkey PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 18642)
-- Name: territory un_territory_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory
    ADD CONSTRAINT un_territory_code UNIQUE (code);


--
-- TOC entry 4673 (class 2606 OID 18648)
-- Name: division_territories fk_division_territories_division; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.division_territories
    ADD CONSTRAINT fk_division_territories_division FOREIGN KEY (division_id) REFERENCES public.division(id) NOT VALID;


--
-- TOC entry 4674 (class 2606 OID 18653)
-- Name: division_territories fk_division_territories_territory; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.division_territories
    ADD CONSTRAINT fk_division_territories_territory FOREIGN KEY (territory_id) REFERENCES public.territory(id) NOT VALID;


--
-- TOC entry 4675 (class 2606 OID 18664)
-- Name: territory_assignment fk_territory_assignment_territory; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory_assignment
    ADD CONSTRAINT fk_territory_assignment_territory FOREIGN KEY (territory_id) REFERENCES public.territory(id) NOT VALID;


--
-- TOC entry 4671 (class 2606 OID 18636)
-- Name: territory_contacts fk_territory_contacts_contact; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory_contacts
    ADD CONSTRAINT fk_territory_contacts_contact FOREIGN KEY (contact_id) REFERENCES public.contact(id) NOT VALID;


--
-- TOC entry 4672 (class 2606 OID 18631)
-- Name: territory_contacts fk_territory_contacts_territory; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.territory_contacts
    ADD CONSTRAINT fk_territory_contacts_territory FOREIGN KEY (territory_id) REFERENCES public.territory(id);


-- Completed on 2020-02-13 14:01:59 EST

--
-- PostgreSQL database dump complete
--

INSERT INTO division (code, name, created) VALUES ('CA-HEARTLAKE', 'Heartlake Tagalog, Brampton ON', ROW('admin', '2020-04-07'));