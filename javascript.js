contentElement = $("#content")
canvasContainerElement = $("#canvas-container")
titleElement = $("#title")
titleHeight = titleElement.height()
contentPadding = parseInt(contentElement.css("padding-bottom"))
titleElement.width(contentElement.width()-contentPadding*2)

revealedSkills = false
distanceSkills = $(".relevantekennis").offset().top

$(window).on("resize", function() {
	titleElement.width(contentElement.width()-contentPadding*2)
})


$(window).on("scroll", function() {
	distance = window.scrollY

	if( distance < 700 ) {
		canvasContainerElement.height(300 - (distance/4))
		console.log(distance, 300 - (distance/4))
	}
	if( distance > 100 ) {
		titleElement.css({"position": "fixed", "margin-top": titleHeight*-1, "padding-top":contentPadding+20 })
		contentElement.css({"padding-top": titleHeight})
	} else {
		titleElement.css({"position":"relative", "margin-top": "0", "padding-top": 20})
		contentElement.css({"padding": contentPadding })
	}

	if( !revealedSkills && distanceSkills < distance + window.outerHeight - 100) {
		revealedSkills = true
		delay = 150
		$(".meter-value").css("width","0")
		$(".meter-value").each(function(i) {
			setTimeout(function(i) {
				mv = $(".meter-value").eq(i)
				mv.animate({"width":mv.parent().data("value") + "%"},500)
			},i*delay, i)
		})
	}

});
