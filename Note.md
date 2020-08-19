## AuthLogin countries

AuthLogin countries props > views\Auth\index.vue > this.$store.state.common

App.vue

```js
mounted() {
    this.$store.dispatch('getSystemSetting')
  }
```

store\Common\index.js

```js
const actions = {
  getSystemSetting(store) {
    return ClearRequest(store, types.GET_SYSTEM_SETTING, {
      url: 'Common/systemSettingEX'
    })
  }
}
```

mock\index.js

```js
  app.get('/en-us/Common/systemSettingEX', function(rep, res) {
    var json = util.getJsonFile('./systemSettingEX_en-us.json')
    res.json(Mock.mock(json))
  })
```