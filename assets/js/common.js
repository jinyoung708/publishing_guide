$(function(){
    var $content = $("#content");

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


    /* code block */
    var $codeblock = $("pre > code").parent();
    $codeblock.before("<div class='codeBlock_stylish'></div>");

    var str = $codeblock.find("code").html();
    str = str.replace(/!/g,"&#33;");
    str = str.replace(/</g,"&lt;");
    str = str.replace(/>/g,"&gt;");
    $codeblock.find("code").html(str);

    hljs.highlightAll();
    hljs.initLineNumbersOnLoad();


    /* right menu */
    $('#realContent .container section').each(function (i) {
		var conH3 = $(this).find('h3').text();
		var rightMenuCon = '<li><a href="#">' + conH3 + '</a></li>';
		$('.right_menu').append(rightMenuCon)
		$('.right_menu li:first-child').addClass('active')
		$('section').eq(i).attr('data-navNum', i);
	});

	$(window).on('scroll resize', function () {
		$('#realContent .container section').each(function () {
			var viewTop = $(window).scrollTop() + ($(window).height() * 0.4);
			var elTop = $(this).offset().top;
			var elBot = elTop + $(this).height();
			var elNum = $(this).attr('data-navNUm');
			var target = $('.right_menu li');
			if ((elTop <= viewTop) && (elBot >= viewTop)) {
				target.removeClass('active')
				target.eq(elNum).addClass('active')
			}
		})
	});
	
	$('.right_menu li a').on('click focus', function () {
		var goTo = $(this).parent().index();
		var goPos = $('section[data-navNum=' + goTo + ']').offset().top - ($(window).height() * 0.01);
		$('html, body').stop().animate({
			scrollTop: goPos
		}, 300);
		return false;
	});
});

