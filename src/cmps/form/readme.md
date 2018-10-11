## actions 的设计

```javascript
// actions必须附着在组件上，可以使用组件的上下文
var xactions = [
  {
    source: {
      action: 'valueChange', /*事件类型*/ 
      trigger: 'value === 2' /*触发条件, 不写时表示直接触发*/
    },
    // 目标事件源信息，source 和 target 的
    target: [{
      _cmp: '3', /*使用组件的id*/
      action: 'disable' 
    }]
  }
]
```