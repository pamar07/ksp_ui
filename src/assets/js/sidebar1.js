$(document).ready(function() {
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event){
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
        var closed = $('.side-collapse').hasClass('in');
        if(closed == false) {
          $('#sidenav-overlay').addClass('dim');
        }
        else{
          $('#sidenav-overlay').removeClass('dim');
        }
    });

    $('#sidenav-overlay').bind('click', function(e) {
      if($(e.target).closest('.navbar').length == 0) {
          var closed = $('.side-collapse').hasClass('in');
          if(closed == false) {
            $('#sidenav-overlay').removeClass('dim');
            $('.side-collapse').addClass('in');
          }

          var hidden = $('.mobile-search').hasClass('hide');
          if(hidden == false) {
            $('#sidenav-overlay').removeClass('dim');
            $('.mobile-search').toggleClass('hide');
          }
      }
    });

    $('.navbar-nav>li>a').bind('click', function(e) {
          var closed = $('.side-collapse').hasClass('in');
          if(closed == false) {
            $('#sidenav-overlay').removeClass('dim');
            $('.side-collapse').addClass('in');
          }
    });

    $('.mobile-search-icon').bind('click', function(e) {
        $('#sidenav-overlay').addClass('dim');
        $('.mobile-search').toggleClass('hide');
        $('.mobile-search:first').focus();
    });

});
