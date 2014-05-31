$(function () {
	var windowHeight = 0;
	var scrollCalls = 0;
	
	function resize() {
		// Reset the body height
		var body = $("body");
		body.css("height", "auto");
		
		// Resize all articles to match the body height.
		var articles = $("article");
		var paddingHeight = parseInt(articles.css("padding-top"));
		windowHeight = $(window).height() - paddingHeight*2;
		articles.css({ height: windowHeight});
		
		articles.each(function(i) {
			$(this).css({top: windowHeight*(i+1)})
		});
		
		// Resize the body to match the total articles height.
		body.height(windowHeight * (articles.length + 1 ) + paddingHeight * 2);
	}
	
	
	
	var scrollHandler = function() {
		var distance = $(window).scrollTop();
		var articles = $("article");
		scrollCalls ++;
				
		for(var i = 0; i < articles.length; i++) {
			article = articles.eq(i);
			var newTop = (windowHeight*(i+1));
			var topMargin = (i+1) * 36;
			
			
			if( distance + topMargin >= newTop) {
				var translate = "translateY("+ ( distance-newTop + topMargin ) + "px)";
				console.log(translate);
				article.css({"-webkit-transform" : translate});
			}
			
			article.find("p").text(distance + ", " + newTop + ", " + topMargin + ", "+article.css("-webkit-transform")) ;
			
		}
		return false;
		
	}
	
	$(window).scroll(scrollHandler);
	
	$("nav a").click(function(e) {
		e.preventDefault();
		var href = $(this).attr("href").substr(1);
		var target = $("a[name=" + href + "]").eq(0);
		console.log(target);
		scrollCalls = 0;
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
		$(window).scrollTo(0,1000);
	});	
	
	$("article").click(function() {
		console.log(
			parseInt($(this).css("top")), 
			parseInt($(window).scrollTop())
		);
		var articleTop = 1;
		var article = $(this);
		
		if($(this).hasClass("at-top")) {
			scrollCalls = 0;
			$(window).scrollTo(article, 1000);
		} else {
			scrollCalls = 0;
			$(window).scrollTo( article.index() * article.height(), 1000);
		}
	});
	
	
	$(window).resize(resize);
	resize();
});