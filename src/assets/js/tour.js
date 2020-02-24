var tourObj = (function (){
  return{
    takeTour: function(){
      // Instance the tour
      var tour = new Tour({
        storage: false,
        backdrop: true,
        template: "<div class='popover tour' style='min-width:400px;'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn-fresh text-capitalize btn-sm pink-button' data-role='prev'>« Prev</button><span data-role='separator'>&emsp;</span><button class='btn-fresh text-capitalize btn-sm pink-button' data-role='next'>Next »</button><button class='btn-fresh text-capitalize btn-sm pink-button' data-role='end'>End tour</button></div>",
        steps: [
        {
          duration:5000,
          placement: 'auto',
          element: "#banner",
          title: "Your Timeline",
          content: "This is your timeline"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#featured-articles",
          title: "KSP Featured Articles",
          content: "This is ksp featured article section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#handpicked-articles",
          title: "KSP Handpicked Articles",
          content: "This is ksp handpicked article section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#trending-articles",
          title: "KSP Trending Articles",
          content: "This is ksp trending article section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#groups",
          title: "KSP Groups",
          content: "This is ksp group section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#events",
          title: "KSP Events",
          content: "This is ksp event section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#store",
          title: "KSP Store",
          content: "This is ksp store section"
        },
        {
          duration:5000,
          placement: 'auto',
          element: "#ksp-points",
          title: "KSP Point",
          content: "This is ksp point section"
        }
      ]
      });

      // Initialize the tour
      tour.init();

      // Start the tour
      tour.start();
    }
  }
})(tourObj || {})
