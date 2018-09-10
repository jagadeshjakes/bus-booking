import Ember from 'ember';
import $ from 'jquery';
export default Ember.Route.extend({
  model(){
    var datas;
    $.ajax({
      type:"POST",
      url:"/getbookings",
      async:false,
      data:{bookingId:1},
      success:function(data){
        datas= data;
      }
    });
      console.log(datas);
      return datas;
  }
});
