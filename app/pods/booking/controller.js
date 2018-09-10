import Ember from 'ember';
import $ from 'jquery';
export default Ember.Controller.extend({
  actions:{
    exportPDF(){

    html2canvas($("#content"), {
            onrendered: function(canvas) {
                var pdf = new jsPDF('l', 'pt', 'a4');
                var image = canvas;
                pdf.addImage(Canvas2Image.convertToPNG(canvas),40,20);
                pdf.save("eTicket.pdf");
            }
        });
    },
    getSeats:function(){
      $.ajax({
        type:"POST",
        url:"/getseats",
        async:false,
        data:{busId:2,tripId:2},
        success:function(data){
          console.log(data);
        }
      });
    }
  }
});
