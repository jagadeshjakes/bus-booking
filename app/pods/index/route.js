import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var datas;
    $.ajax({
      type:"POST",
      url:"/getseats",
      async:false,
      data:{busId:1,tripId:1},
      success:function(data){
        //console.log(data);
        datas=data;
      }
    });
    return datas;
  }
});
