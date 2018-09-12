import Ember from 'ember';
import $ from 'jquery';
export default Ember.Component.extend({
  upperLeft:null,
  upperRight:null,
  lowerLeft:null,
  lowerRight:null,
  selected:[],
  totalFare:0,
  center:null,
  isUpper:true,
  canProceed:false,
  seatsSelected:false,
  init(){
    this._super(...arguments);
    var datas=this.get('seats');
    var upperLeft=[];
    var upperRight=[];
    var lowerLeft=[];
    var lowerRight=[];
    $.each(datas,function(index,object){
      var row=object.row-1;
      var column=object.column-1;
      if(object.position==='UPPER'){
        if(object.side==='LEFT'){
          if(upperLeft[row]===undefined){
            upperLeft[row]=[];
          }
          upperLeft[row][column]=object;
        }
        else{
          if(upperRight[row]===undefined){
            upperRight[row]=[];
          }
          upperRight[row][column]=object;
        }
      }
      else{
        if(object.side==='LEFT'){
          if(lowerLeft[row]===undefined){
            lowerLeft[row]=[];
          }
          lowerLeft[row][column]=object;
        }
        else{
          if(lowerRight[row]===undefined){
            lowerRight[row]=[];
          }
          lowerRight[row][column]=object;
        }
      }
    });

    if(upperLeft.length===0 && upperRight.length===0){
      this.set('isUpper',false);
    }
    this.set('upperLeft',upperLeft);
    this.set('upperRight',upperRight);
    this.set('lowerLeft',lowerLeft);
    this.set('lowerRight',lowerRight);
  },
  actions:{
    bookSeat:function(data){
      //console.log(data);
      var selected=this.get('selected');
      var fare=this.get('totalFare');
      if(data.position==='UPPER'){
        if(data.side==='LEFT'){
          if(this.get('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected')){
            this.set('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',false);
            selected.splice(selected.indexOf(this.get('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.seatNo')),1);
            fare=fare-this.get('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.fare');
          }
          else{
            if(selected.length<6){
              this.set('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',true);
              selected.push(this.get('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.seatNo'));
              fare=fare+this.get('upperLeft.'+(data.row-1)+'.'+(data.column-1)+'.fare');
            }
            else{
              alert('Max of 6 seats can be selected');
            }
          }
        }
        else{
          if(this.get('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected')){
            this.set('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',false);
            selected.splice(selected.indexOf(this.get('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.seatNo')),1);
            fare=fare-this.get('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.fare');
          }
          else{
            if(selected.length<6){
              this.set('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',true);
              selected.push(this.get('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.seatNo'));
              fare=fare+this.get('upperRight.'+(data.row-1)+'.'+(data.column-1)+'.fare');
            }
            else{
              alert('Max of 6 seats can be selected');
            }

          }
        }
      }
      else{
        if(data.side==='LEFT'){
          if(this.get('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected')){
            this.set('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',false);
            selected.splice(selected.indexOf(this.get('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.seatNo')),1);
            fare=fare-this.get('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.fare');
          }
          else{
            if(selected.length<6){
              this.set('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',true);
              selected.push(this.get('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.seatNo'));
              fare=fare+this.get('lowerLeft.'+(data.row-1)+'.'+(data.column-1)+'.fare');
            }
            else{
              alert('Max of 6 seats can be selected');
            }
          }
        }
        else{
          if(this.get('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected')){
            this.set('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',false);
            selected.splice(selected.indexOf(this.get('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.seatNo')),1);
            fare=fare-this.get('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.fare');
          }
          else{
            if(selected.length<6){
              this.set('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.isSelected',true);
              selected.push(this.get('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.seatNo'));
              fare=fare+this.get('lowerRight.'+(data.row-1)+'.'+(data.column-1)+'.fare');
            }
            else{
              alert('Max of 6 seats can be selected');
            }
          }
        }
      }
      this.set('selected',selected);
      this.set('totalFare',fare);
      if(selected.length===0){
        this.set('canProceed',false);
        $('#selected-seats').html("");
        $('#fare').html("");
      }
      else{
        var content="Selected Seats:<ul>";
        $.each(selected,function(index,object){
          content=content+"<li>"+object+"</li>";
        });
        this.set('canProceed',true);
        content=content+"</ul>";
        $('#selected-seats').html(content);
        $('#fare').html("Total Fare:"+fare);
      }
    },
    book(){
      var selected=[];
      var upperLeft=this.get('upperLeft');
      var upperRight=this.get('upperRight');
      var lowerLeft=this.get('lowerLeft');
      var lowerRight=this.get('lowerRight');
      $.each(upperLeft,function(index){
        selected=selected.concat(upperLeft[index].filterBy('isSelected',true));
      });
      $.each(upperRight,function(index){
        selected=selected.concat(upperRight[index].filterBy('isSelected',true));
      });
      $.each(lowerLeft,function(index){
        selected=selected.concat(lowerLeft[index].filterBy('isSelected',true));
      });
      $.each(lowerRight,function(index){
        selected=selected.concat(lowerRight[index].filterBy('isSelected',true));
      });
      let select=this.get('selectPass');
      select(selected);

    }
  }
});
