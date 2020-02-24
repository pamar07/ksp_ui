var scObj = (function () {
  return{
    load: function(url,id){
      var forEach = Array.prototype.forEach;

        function addEvent(element, eventName, callback) {
          if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
          } else {
            element.attachEvent(eventName, callback, false);
          }
        }

        function updateConsole(value) {
         console.log(value);
        }

        var iName= '.iframe-mobile'+id;
        var widget = SC.Widget(document.querySelector(iName));

        var eventKey, eventName;
        //console.log("SC Events", SC.Widget.Events);
        for (eventKey in SC.Widget.Events) {
          (function(eventName, eventKey) {
            eventName = SC.Widget.Events[eventKey];
            widget.bind(eventName, function(eventData) {
              //updateConsole("SC.Widget.Events." + eventKey +  " " + JSON.stringify(eventData || {}));
            });
          }(eventName, eventKey))
        }

        var cName= '.toggle'+id;
        var actionButtons = document.querySelectorAll(cName);
        forEach.call(actionButtons, function(button) {
          widget['toggle']();
        });

        // var getterButtons = document.querySelectorAll('.getterButtons button');
        // forEach.call(getterButtons, function(button){
        //   addEvent(button, 'click', function(e) {
        //     widget[this.className](function(value){
        //       updateConsole(button.getAttribute('caption') + " " + JSON.stringify(value));
        //     });
        //   });
        // });

      }
    }
  })(scObj || {})
