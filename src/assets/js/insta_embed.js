
var instaEmbedObj = (function () {
  return{
    load: function(){
      $(document).ready(function() {
        try{          
          window.instgrm.Embeds.process();
        }
        catch(e){}
      });
    }
  }
})(instaEmbedObj || {})
