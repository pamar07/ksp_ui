
var decodeObj = (function () {
  return{
    decode: function(message){
      console.log(message);
      var decryptedBytes = CryptoJS.AES.decrypt(message, "KSP");
      console.log(decryptedBytes);
      console.log(decryptedBytes.toString(CryptoJS.enc.Utf8));
      return decryptedBytes.toString(CryptoJS.enc.Utf8);
   }
 }
})(decodeObj || {})
