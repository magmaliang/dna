import { contextFill } from "../utils";

/**
 * check if then action should trigger
 * @param {*} action 
 * @param {*} evt : dna event
 */
function shouldTrigger(action, evt){
  let {source} = action
  if (source.action !== evt.eventName) {
    return false
  }

  // if evt is a field value-change event,then check the trigger
  if (evt.eventName === 'valueChange' && source.trigger) {
    let foo = new Function("value", 'return ' + source.trigger)

    return foo(evt.value)
  }

  return true
}

const xactionDealMap = {
  visible: function(target){
    target._meta.visible = true;
  },
  unVisible: function(target) {
    target._meta.visible = false;
  },
  enable: function(target) {
    target._meta.enable = true;
  },
  disable: function(target) {
    target._meta.enable = false;
  },
  flashDataMap: function(target) {
    
  },
  setValue: function(target, value) {
    
  },
}

/**
 * 
 * @param {*} fields : form的所有fields
 * @param {*} event : 源事件
 */
export default function fieldsXActionHandler(fields, event) {
  event.action.forEach(singleAction => {
    if (shouldTrigger(singleAction, event)) {
      singleAction.target.forEach(element => {
        // get target
        let target = fields.find(x => x._id === element._cmp)
        if (!target) {
          throw new Error(`cannot find target cmp(id): ${element._cmp}`)
        }
  
        xactionDealMap[element.action](target)
      });
    }
  })
  
  return fields;
}