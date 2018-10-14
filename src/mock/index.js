import Mock from "mockjs";

Mock.mock('/saveForm',{
    'code':'1',
    'msg':"done",
})

Mock.mock('/updateForm',{
  'code':'1',
  'msg':"done",
})

Mock.mock('/getTypes',[{
  'value': '类型1',
  'key': 1
},{
  'value': '类型2',
  'key': 2
},{
  'value': '类型3',
  'key': 3
}])

Mock.mock('/getGender',[{
  'value': '男',
  'key': 1
},{
  'value': '女',
  'key': 2
},{
  'value': '未知',
  'key': 3
}])

