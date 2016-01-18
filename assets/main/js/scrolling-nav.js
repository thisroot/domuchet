//jQuery to collapse the navbar on scroll



$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
       
        
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

 
if ($('nav').outerHeight(true) <=  70) {
       
        $(".logo").attr("src","images/horizontal_logo.png");
        $(".logo").css('margin-top',5);
    }
    
    else {
       
         $(".logo").attr("src","images/logo_white.png");
   
    }

