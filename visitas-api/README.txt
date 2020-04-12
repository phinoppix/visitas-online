Test data

> http://localhost:4000
```
query {
  territoriesPerDivision(divisionCode:"AAA") {
    code
    name
    division {
      name
    }
    boundaries{
      latitude
      longitude
    }
    aggregates {
      countContacts
    }
  }
  division(divisionCode:"CA-HEARTLAKE") {
    code
    name
    aggregates {
      countTerritories
    }
  }
  contactsPerTerritory(divisionCode:"CA-HEARTLAKE") {
    name
    full_address
    territory {
      code
      name
    }
    division{
      code
      name
    }
  }
}
```