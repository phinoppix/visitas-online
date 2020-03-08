Test data

> http://localhost:4000
```
query {
  territoriesPerCong(congregationCode:"AAA") {
    code
    name
    congregation {
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
  congregation(congCode:"CA-HEARTLAKE") {
    code
    name
    aggregates {
      countTerritories
    }
  }
  contactsPerTerritory(congregationCode:"CA-HEARTLAKE") {
    name
    full_address
    territory {
      code
      name
    }
    congregation{
      code
      name
    }
  }
}
```