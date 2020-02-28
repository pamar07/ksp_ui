var signupModalObj = (function () {
  return{
    display: function(){
      window.onload = function () {
        setTimeout(function() {
          var audio = new Audio('assets/audio/Sound_Effect_Pop_Up.mp3');
          audio.play();
          $('#SignupModal').modal('show');
        }, 5000);
      }
   }
 }
})(signupModalObj || {})
