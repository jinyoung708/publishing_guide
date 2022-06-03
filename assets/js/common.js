$(function(){
    var $content = $("#content"),
        $leftMenu = $("#leftMenu");

    /* menu btn */
    $(".menu_btn").on("click", function(){
        if(!$(this).hasClass("close")){
            toggleLeft($(this), false);
        }
        else {
            toggleLeft($(this), true);
        }

        return  false;
    });

    $(window).on("resize", function(){
        windowW = window.innerWidth;
        if(windowW<1280){
            toggleLeft($(".menu_btn"), false);
        }
    });
    $(window).trigger("resize");

    function toggleLeft(btn, state){
        var icon = '<i class="fa-solid fa-angles-left"></i>';

        if(state) {
            btn.removeClass("close").html(icon);
            $content.removeClass("extend");
        }
        else {
            icon = '<i class="fa-solid fa-bars-staggered"></i>';
            btn.addClass("close").html(icon);
            $content.addClass("extend");
        }
    }


    /* page progress bar */
    var progressCurent =100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    $('body').prepend('<div class="page_progressbar_bg horizontal"><div class="page_progressbar"></div></div>');

    $(window).on("scroll", function(){
        pageProgressBar();
    });

    function pageProgressBar(){
        progressCurent =100 * $(window).scrollTop() / ($(document).height() - $(window).height());
        if($('.page_progressbar_bg').hasClass('horizontal')){
                $('.page_progressbar').css('width',progressCurent + "%")
        }else{
                $('.page_progressbar').css('height',progressCurent + "%")
        }
    }
});

