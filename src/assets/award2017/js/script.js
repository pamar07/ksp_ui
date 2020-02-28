$(document).ready(function(){

	$('.jumbo-video-child').find('source').attr('src', 'videos/videoTwo.mp4');

	// $('.video-thumb').find('video').click(function(){
	// 	var thisFind = $(this).find('source').attr('src');
	// 	 console.log(thisFind);
	// 	$('.jumbo-video-child').find('source').attr('src', thisFind);
	// 	$('.jumbo-video-child video').load();
	// 	$('.jumbo-video-child video')[0].play();
	// });

	$('#swipebox-slider .slide').click(function(){
		alert('AAA');
		$(this).hide();
	});

	// /* Image Pop Window */

	//  var ud_active_img;
	//  var ud_img_url;   

	//   $('.screen-overlay').fadeOut();
	 
	//  $('.image-container img').click(function(){
	//  	   // $('#content-wrapper').after('<div class="screen-overlay" id="screen-overlay"> <div class="overlay-img-holder"><img src="img/gallery/img10.jpg"><span class="navigate-style navig-left"><i class="fas fa-chevron-left"></i></span><span class="navigate-style navig-right"><i class="fas fa-chevron-right"></i></span><span class=""><i class="fas fa-times"></i></span></div></div>');
	//        $('.screen-overlay').fadeIn();
	//        ud_img_url = $(this).attr('src');
	//        $('.screen-overlay .overlay-img-holder img').attr('src', ud_img_url);
	// 	   $('.screen-overlay').fadeIn(500);
		   
	// 	   ud_active_img = $(this);
	// 	   });
		   
		   
		 //   $('.screen-overlay').click(function(e){
		 //   		e.stopPropagation();
		 //   		console.log('screen-overlay clicked');
		 //        $(this).fadeOut(500);
		 //   });

		 //    $('.overlay-img-holder img').click(function(e){
		 //    	console.log('overlay-img-holder img clicked');
		 //    	e.stopPropagation();
		 //    })

	 
	 	// /* Next Image */
	 
	  //     $('.navig-right').click(function(event){
	  //     		event.stopPropagation();
	  //     		// var nextImgSrc = $('.image-container').next().find('img').attr('src');
	  //     		// console.log(nextImgSrc);
	  //     		ud_next_img(ud_active_img);
		 //  });
		  
		  
		 //  function ud_next_img(ud_objekt) {

		 //  		var nextImgSrc = $('.image-container').next().find('img').attr('src');

		 //        if($(ud_objekt).parent().next().is('.image-container')) {
		 //        	 // console.log('Next is Image Container');
			// 		 ud_active_img = $(ud_objekt).next(); 
			// 		 ud_img_url = $(ud_objekt).next().find('img').attr('src');
			// 		 console.log(ud_img_url);
			// 	     $('.screen-overlay .overlay-img-holder img').attr('src', ud_img_url); 
			// 	} else {
			// 		console.log('Next is Not Image Container');
			// 		console.log(ud_objekt);
			// 	     ud_active_img = $(ud_objekt).parent('.image-container').first();
			// 	     ud_img_url = $(ud_objekt).parent('.image-container').first().find().attr('src');
			// 		 $('.screen-overlay .overlay-img-holder img').attr('src', ud_img_url); 
			// 	}
		 //  }
		  
		 //  /* Prev Image */
		  
		 //  $('.navig-left').stop().click(function(event){
		 //  		 event.stopPropagation();	
		 //         ud_prev_img(ud_active_img);
		 //         console.log('Left clicked');
		 //  });
		  
		 //  function ud_prev_img(ud_objekt) {
		 //        if($(ud_objekt).prev().is('.image-container')) {
			// 		 ud_active_img = $(ud_objekt).prev(); 
			// 		 ud_img_url = $(ud_objekt).prev('img').attr('src');
			// 	     $('.screen-overlay .overlay-img-holder img').attr('src', ud_img_url); 
			// 	} else {
			// 	     ud_active_img = $(ud_objekt).parent().children('img').last();
			// 	     ud_img_url = $(ud_objekt).parent().children('img').last().attr('src');
			// 		 $('.screen-overlay .overlay-img-holder img').attr('src', ud_img_url); 
			// 	}
		 //  }


		 

});