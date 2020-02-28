
var encodeObj = (function () {
  return{
    encode: function(message){
      return CryptoJS.AES.encrypt(message, "KSP");
   }
 }
})(encodeObj || {})
