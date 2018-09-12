import Ember from 'ember';

export default Ember.Controller.extend({
  toSelect:true,
  toPassengers:false,
  selected:null,
  actions:{
    selectPassengers(selected){
      this.set('toSelect',false);
      this.set('selected',selected);
      this.set('toPassengers',true);
    },
    selectSeats(){
      this.set('toSelect',true);
      this.set('selected',null);
      this.set('toPassengers',false);
    },
    viewBooking(bookingId){
      this.transitionToRoute('booking',bookingId);
    }
  }
});
