import Ember from 'ember';

export default Ember.Component.extend({
  transaction:'',
  actions:{
    setGender(gender,index){
      this.set('selected.'+index+'.gender',gender);
    },
    proceed(){
      var selected=this.get('selected');
      var seats=this.get('seats');
      var re=false;
      var totalFare=0;
      var isFemale=false;
      $.each(selected,function(index,obj){
        if(obj.name=='' || obj.gender==undefined || obj.dob==''){
          re=true;
        }
        if(obj.gender==='MALE'){
          if(obj.column%2==0){
            var filter=seats.filterBy('side',obj.side).filterBy('position',obj.position).filterBy('row',obj.row).filterBy('column',obj.column-1);
            //console.log('even', filter[0]);
            if(filter.length!=0 && filter[0].isFemale){
              console.log('even');
              isFemale=true;
            }
          }
          else{
            var filter=seats.filterBy('side',obj.side).filterBy('position',obj.position).filterBy('row',obj.row).filterBy('column',obj.column+1);
            //console.log('odd',filter[0].isFemale);
            if(filter.length!=0 && filter[0].isFemale){
              console.log('odd');
              isFemale=true;
            }
          }
        }
        totalFare=totalFare+obj.fare;
      });
      var trans=this.get('transaction');
      if(re || trans.length==0){
        alert('All fields are required');
      }
      else if(isFemale){
        alert('Selected seat for male near ladies seat');
        this.send('selectSeats');
      }
      else{
        //console.log(this.get('selected'));
        var datas;
        $.ajax({
          type:"POST",
          url:"/bookseats",
          async:false,
          data:{totalFare:totalFare,transaction:trans,userId:1,tripId:1,passengers:JSON.stringify(this.get('selected'))},
          success:function(data){
            //console.log(data);
            datas=data;
          }
        });
        var booking=this.get('viewBooking');
        booking(datas);
      }
    },
    selectSeats(){
      /*var select=this.get('selectSeats');
      select();*/
      location.reload();
    }
  }
});
