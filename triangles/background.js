var element = document.getElementById("background"),
	canvas = this.__canvas = new fabric.StaticCanvas("background");

canvas.setHeight(window.innerHeight);
canvas.setWidth(window.innerWidth);
canvas.renderOnAddRemove=false;
canvas.stateful=false;

var tWidth = 320,
	tHeight = 256,
	flip = true;

triangles = [];

targetHue = 1

function drawTriangles() {
	canvas.clear().renderAll();
	triangles = [];
	for(y=(tHeight/2)*-1; y <= element.height+tHeight; y = y+tHeight) {
		flip = !flip;
		for(x=(tWidth/2)*-1; x < element.width+tWidth; x = x+tWidth) {
			// Add first triangle

			if(flip) {
				x = x + (tWidth/2)
			}

			t = new fabric.Triangle({
				width: tWidth+4,
				height: tHeight+4,
				top: y-2,
				left: x-2,
				fill: 'hsl('+parseInt(targetHue+Math.random())+',70%,50%)'
			})
			triangles.push(t)
			canvas.add(t);

			// Add interlocking triangle

			t = new fabric.Triangle({
				width: tWidth,
				height: tHeight,
				top: y,
				left: x,
				fill: 'hsl('+parseInt(targetHue+Math.random())+',70%,50%)',
				angle: 180
			});
			triangles.push(t)
			canvas.add(t);

			if(flip) {
				x = x - (tWidth/2)
			}
		}
	}
	canvas.renderAll()
}

drawTriangles()
fps = 30
lastLoop = new Date;
frames = 0
title = document.getElementById("title")

function animateStep() {
	averageH = 0
	var thisLoop = new Date;
	for( t in triangles ) {
		hue = parseInt(triangles[t].get("fill").split(",")[0].substr(4))
		distanceFromTarget = (hue-parseInt(targetHue))/parseInt(targetHue)
		h = (Math.random()*0.75)+(0.5-(1*distanceFromTarget))
		ncol = hue+h

		triangles[t].set("fill", 'hsl('+ncol+',70%,50%)' )
		triangles[t].set("fill", 'hsl('+ncol+',70%,50%)' )
	}
	title.style.color = 'hsl('+targetHue+',70%,50%)';

	targetHue = targetHue + 0.335
	lastLoop = thisLoop
	canvas.renderAll()
	frames++
}

function testFPS() {
	startFrames = frames
	drawTriangles()

	testAnimate = setInterval(animateStep,1000/fps)
	
	setTimeout(function() {
		clearInterval(testAnimate)
		runFps = (frames - startFrames)/4
		console.log((frames - startFrames), (triangles.length), runFps);
		
		if(runFps > fps*0.75) {
			tWidth = tWidth*0.9
			tHeight = tHeight*0.9
			testFPS()
		} else {
			tWidth = tWidth/0.9
			tHeight = tHeight/0.9
			drawTriangles()
			console.log("Can sustain "+(triangles.length)+" triangles." )
			setInterval(animateStep,1000/fps)
		}
		
	}, 4000);
}

testFPS()
