import Ember from 'ember';
import $ from 'jquery';
export default Ember.Route.extend({
  model(bId){
    
    var datas;
    $.ajax({
      type:"POST",
      url:"/getbookings",
      async:false,
      data:{bookingId:bId.bookingId},
      success:function(data){
        datas= data;
      }
    });
      console.log(datas);
      return datas;
  }
});
