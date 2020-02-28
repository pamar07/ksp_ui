var mapObj = (function() {
    return {
        // loadMap: function(lat, lng) {
        //     var mapOptions = {
        //         center: new google.maps.LatLng(lat, lng),
        //         zoom: 12,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };
        //     var map = new google.maps.Map(document.getElementById("sample"), mapOptions);
        //     var marker = new google.maps.Marker({
        //         position: new google.maps.LatLng(lat, lng),
        //         map: map
        //     });
        // }

        loadMapMultiMarker: function(latArr,lngArr) {
            var mapOptions = {
                center: new google.maps.LatLng(latArr[0],lngArr[0]),
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("sample"), mapOptions);
            for(var i=0; i<latArr.length; i++){
              new google.maps.Marker({
                  position: new google.maps.LatLng(latArr[i], lngArr[i]),
                  map: map
              });
            }
        }
    }
})(mapObj || {})
