$(function(){
  $("#toggle").click(function(){
    $("#gNavi").slideToggle();
    return false;
  });
  
  var mode=0;
  $(window).resize(function(){
    if ($("#toggle").css("display") == "none") {
      $("#gNavi").show();
    } else {
      $("#gNavi").hide();
    }
    
	var winW = window.innerWidth;
	if(winW <= 740 && mode == 0){
		$('#fSitemap dd').hide();
		$('#fSitemap dt').removeClass("active");
		mode = 1;
	}else{
		$('#fSitemap dd').show();
		$('#fSitemap dt').removeClass("active");
		mode = 0;
	}
  });

  $(".second_contents li a[href],.sub_menu li a[href],#main:not(:has('table')) a[href]").not(":has('img')").each(function(){
      var href = $(this).attr('href');
      var uri = location.host;
      if (href != null ) {
          href = href.replace(/#/g,'');
          if (href.match(/.pdf$/i) ) {
              $(this).append('<img src="/images/common/icon_pdf.gif" class="fileicon" width="16px" height="16px" alt="pdfファイル" />');
	    }else if(href.match(/.docx?$/i)){
              $(this).append('<img src="/images/common/icon_doc.gif" class="fileicon" width="16px" height="16px" alt="wordファイル" />');
	    }else if(href.match(/.xlsx?$/i)){
              $(this).append('<img src="/images/common/icon_xls.gif" class="fileicon" width="16px" height="16px" alt="Excelファイル" />');
	    }else if(href.match(/.zip$/i)){
              $(this).append('<img src="/images/common/icon_archive.gif" class="fileicon" width="16px" height="16px" alt="ZIPファイル" />');
	    }else if(href.match(/(http|https)/) && !href.match(uri)){
              $(this).attr("target", "_blank");
              $(this).append('<img src="/images/common/icon_popup.gif" class="fileicon" width="16px" height="16px" alt="外部リンク" />');
          }
	}
  });

  submenu();

  $('.sub_menu li').each(function(){
    if( location.href == $("a", this).attr("href")){
      $(this).addClass('active');
      $(this).parent().parent().prev("dt").click();
      return false;
      
    }
  });

  $(".second_contents ul li").hover(
	function(){
		$(this).css("background-color", "#D2EBEB");
	},
	function(){
		 $(this).css("background-color", "#ffffff");
	}
  );

  topmenuMove();

});

function submenu() {
	$('.sub_menu dd').hide();
	$('.sub_menu dt').click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next("dd").slideUp();
		}else{
			$('.sub_menu dt.active').next("dd").slideUp();
			$(this).next("dd").slideToggle();
			$(this).siblings("dt").removeClass("active");
			$(this).addClass("active");
		}
	});

	var winW = window.innerWidth;
	if(winW <= 740){
		$('#fSitemap dd').hide();
	}
	$('#fSitemap dt').click(function(){
		var winW = window.innerWidth;
		if(winW <= 740){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$(this).next("dd").slideUp();
			}else{
				$('#fSitemap dt.active').next("dd").slideUp();
				$(this).next("dd").slideToggle();
				$('#fSitemap dt.active').removeClass("active");
				$(this).addClass("active");
			}
		}
	});	
};

function topmenuMove(){
	var winW = window.innerWidth;
	if(winW <= 740){
		$("#visitorMenu").after($("#topmenu"));
	}else{
		$("#topFooter").after($("#topmenu"));
	}
}
topmenuMove();
