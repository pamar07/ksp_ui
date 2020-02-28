
var twitterEmbedObj = (function () {
  return{
    load: function(){
      $(document).ready(function() {
        try{
          twttr.widgets.load();
        }
        catch(e){}
      });
    }
  }
})(twitterEmbedObj || {})
