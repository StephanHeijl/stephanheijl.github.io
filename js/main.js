$(function () {
	var windowHeight = 0;
	var scroll_ok = true;
	setInterval(function () {
		scroll_ok = true;
	}, 16);

	function resize() {
		// Reset the body height
		var body = $("body");
		body.css("height", "auto");
		var distance = $(window).scrollTop();

		// Resize all articles to match the body height.
		var articles = $("article");
		var paddingHeight = parseInt(articles.css("padding-top"));
		windowHeight = $(window).height() - paddingHeight*2;
		articles.css({ height: windowHeight});

		articles.each(function(i) {
			$(this).css({ top: windowHeight*(i+1) - distance })
		});

		// Resize the body to match the total articles height.
		body.height(windowHeight * (articles.length + 1 ) + paddingHeight * 2);
	}

	$(window).scroll(function () {
		if (scroll_ok === true) {
			scroll_ok = false;
			scrollHandler();
		}
	});

	var scrollHandler = function() {
		var distance = $(window).scrollTop();
		var articles = $("article");
		$("article").each(function(i) {			

			var newTop = (windowHeight*(i+1))-distance;
			var topMargin = (i+1) * (windowHeight*0.03);
			if ( newTop > windowHeight*(0.03*i)) {
				$(this).css({top:newTop});
				$(this).removeClass("at-top");
			} else {
				$(this).css({top:topMargin});
				$(this).addClass("at-top");

				var table = $(this).find("table");
				// Laat langzaam alle cells zien
				if (table.data("faded") != "true") {
					table.find("td").each(function(i) {
						var td = $(this);
						setTimeout(function() {
							td.fadeIn();
							td.find(".experience-meter").each(function() {
								var em = $(this);
								em.find(".meter-value").css({"width":0});

								setTimeout(function() {
									em.find(".meter-value").animate({"width": em.data("value") * 2 - 2}, 800);
								}, 100*i);
							});
						}, 100*i);
					});
				}
				table.data("faded", "true");


			}
		});
	}

	$(".article-inner").bind( "scroll DOMMouseScroll mousewheel", function(e) {
		console.log($(this).scrollTop(), $(this).height(), $(this).outerHeight());
		var article = $(this).parents("article");
		
		if ($(this).innerHeight()==$(this)[0].scrollHeight) {
			return true; // No scrolling is possible here.
		}
		
		if( $(this).scrollTop() == 0) {
			console.log("Scrolling up");
			$(window).scrollTo({top:'-=40px', left:'+=0'}, 0);
		} else if( $(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight ) {
			console.log("Scrolling down");
			$(window).scrollTo({top:'+=40px', left:'+=0'}, 0);
		} else {
			console.log("focussing");
			$(window).scrollTo( article.index() * article.height() -20, 200);			
		}
		
		
	});

	$("nav a").click(function(e) {
		e.preventDefault();
		var href = $(this).attr("href").substr(1);
		var target = $("a[name=" + href + "]").eq(0);
		$(window).scrollTo(target,1000);
		
	

	});

	$("nav li a").hover(function() {
		var target = $("article").eq($(this).parent().index());
		var targetColor = target.css("background-color");

		$(this).css({"background-color":targetColor});		
	}, function() {
		$(this).css({"background-color":""});
	});	

	$(".wrapper").not("nav *").click(function() {
		$(window).scrollTo(0,300);
	});	

	$("article").click(function() {
		var articleTop = 1;
		var article = $(this);

		if(!$(this).hasClass("at-top")) {
			$(window).scrollTo(article,300);
		} else {
			$(window).scrollTo( article.index() * article.height(), 400);
		}
	});

	var table = $("td").hide(0);

	$(".experience-meter").each(function() {
		var em = $(this);
		em.find(".meter-value").text( em.data("value") + "/100")
	});

	//$(window).resize(resize);
	resize();


	$("h1").fitText(1,{ minFontSize: '32pt', maxFontSize: '144pt' });
	$("h2").fitText(1,{ minFontSize: '32pt', maxFontSize: '72pt' });
	$("nav a").fitText();
	$("table").css("font-size", $("h2").css("font-size")*0.5);
	$(".article-inner").perfectScrollbar();
	$(".help").perfectScrollbar();

});