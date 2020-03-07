export default {
  fakeData: [
    {id:1,firstName:"A",lastName:'B',email:'a@aa.aa',phone:11111111111},
    {id:2,firstName:"C",lastName:'D',email:'b@bb.bb',phone:21111111111},
    {id:3,firstName:"E",lastName:'F',email:'c@cc.cc',phone:31111111111},
    {id:4,firstName:"G",lastName:'H',email:'d@dd.dd',phone:41111111111},
    {id:5,firstName:"I",lastName:'J',email:'e@ee.ee',phone:51111111111},
    {id:6,firstName:"K",lastName:'L',email:'f@ff.ff',phone:61111111111},
  ],
  tableColumns: [{field:'id',title:'#',type:'number'},
    {field:'firstName',title:'First name',type:'text'},
    {field:'lastName',title:'Last name',type:'text'},
    {field:'email',title:'E-mail',type:'email'},
    {field:'phone',title:'Phone',type:'phone'}]
};
