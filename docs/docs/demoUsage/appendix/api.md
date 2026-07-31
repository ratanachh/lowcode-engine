---
title: Demo Usage APIs
sidebar_position: 2
---

## Data sources

### Request a data source

```javascript
// Request userList (defined in the data source panel)

this.dataSourceMap['userList']
  .load({
    data: {},
  })
  .then((res) => {})
  .catch((error) => {});
```

### Read data source values

```javascript
const { userList } = this.state;
```

### Update data source values manually

```javascript
// Read value defined in the data source panel
const { user } = this.state;

// Update state
this.setState({
  user: {},
});
```
