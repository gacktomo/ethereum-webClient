$(function() {
	$(".tabset").each(function(){
	var set = $(this);
	var btn = set.find("ul.tabset_tab li a");
	var setpael = set.find("ul.tabset_tab li a.select");
	var panel = set.find(".tabset_panel div");
	var setpanelID = $(setpael).attr("href");
	
	//パネル初期設定
	$(panel).hide();
	$(".tabset_panel div"+setpanelID).show();
	
	  //アクション
		$(btn).click(function(){
		$(btn).removeClass("select");
		$(this).addClass("select");
		$(panel).hide();
		$($(this).attr("href")).show();
		return false;
		});
	});
});

$(window).load(function() {
  $('#leftBoard').nivoSlider({
    effect: 'sliceDownLeft',               // Specify sets like: 'fold,fade,sliceDown'
    slices: 15,                     // For slice animations
    boxCols: 8,                     // For box animations
    boxRows: 4,                     // For box animations
    animSpeed: 500,                 // Slide transition speed
    pauseTime: 10000,                // How long each slide will show
    startSlide: 0,                  // Set starting Slide (0 index)
    directionNav: true,             // Next & Prev navigation
    controlNav: true,               // 1,2,3... navigation
    controlNavThumbs: false,        // Use thumbnails for Control Nav
    pauseOnHover: true,             // Stop animation while hovering
    manualAdvance: false,           // Force manual transitions
    prevText: 'Prev',               // Prev directionNav text
    nextText: 'Next',               // Next directionNav text
    randomStart: false,             // Start on a random slide
    beforeChange: function(){},     // Triggers before a slide transition
    afterChange: function(){},      // Triggers after a slide transition
    slideshowEnd: function(){},     // Triggers after all slides have been shown
    lastSlide: function(){},        // Triggers when last slide is shown
    afterLoad: function(){}         // Triggers when slider has loaded
  });
});

$(document).ready(function(){
	$('.pickup').slick({
  arrows: true,
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipe: false,
  responsive: [
    {
      breakpoint: 740,
      settings: {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true
      }
    }
  ]
	});
});
