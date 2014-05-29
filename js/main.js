$(function () {
	var windowHeight = 0;
	
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
	
	$(window).scroll(function() {
		var distance = $(window).scrollTop();
		var articles = $("article");
				
		$("article").each(function(i) {
			var newTop = (windowHeight*(i+1))-distance;
			var topMargin = i*3 + "%";
			if ( newTop > windowHeight*(0.03*i)) {
				$(this).css({top:newTop});
				$(this).addClass("at-top");
			} else {
				$(this).css({top:topMargin, position:"fixed"});
				$(this).removeClass("at-top");
			}
		});
		
	});
	
	$("nav a").click(function(e) {
		e.preventDefault();
		var href = $(this).attr("href").substr(1);
		var target = $("a[name=" + href + "]").eq(0);
		console.log(target);
		$(window).scrollTo(target,1000);
	});
	
	$("nav li a").hover(function() {
		var target = $("article").eq($(this).parent().index());
		var targetColor = target.css("background-color");
		
		$(this).css({"background-color":targetColor});
		
		
	}, function() {
		$(this).css({"background-color":""});
	});
	
	
	
	$("article").click(function() {
		console.log(
			parseInt($(this).css("top")), 
			parseInt($(window).scrollTop())
		);
		var articleTop = 1;
		
		if($(this).hasClass("at-top")) {
			$(window).scrollTo($(this),300);
		} else {
			$("article").removeClass("animate")
		}
	});
	
	
	$(window).resize(resize);
	resize();
});