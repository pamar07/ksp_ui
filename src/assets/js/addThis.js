
var addThisObj = (function () {
  return{
    refresh: function(){
      $(document).ready(function() {
        try{
          addthis.layers.refresh();
        }
        catch(e){
          // console.log(e);
        }
      });
   }
 }
})(addThisObj || {})
