var active = false;
var enable = true;

var gifs_array = [];
var video_array;
var animation_array = [];
//set timeout in document
var timeout;

//getting all gif images from the document
var images = document.querySelectorAll('img[src$=".gif"]');
for (var i = 0; i < images.length; i++) {
	images[i].setAttribute("rel:auto_play", "0");
	var gif_temp = new SuperGif({ gif: images[i] } );
	gif_temp.load();
	gifs_array.push(gif_temp);
}
//getting all videos from the document
video_array = $(".video-stream");
for (var i = 0; i < video_array.length; i++)
{
	video_array[i].pause();
}
//getting all animation from the doucment
var anim_temp = $("*");
for (var i = 0; i < anim_temp.length; i++)
{
	if (hasCssAnimation(anim_temp[i])) 
	{
		animation_array.push($(anim_temp[i]));
	}
}

document.onmousemove = function() {
	console.log("mousemove");
	timeMove();
}

document.onscroll = function() {
	timeMove();
}

function timeMove()
{
	if (enable)
	{
		if (!active)
		{
			allRun();
			active = true;
			clearTimeout(timeout);
			timeout = setTimeout(function() 
				{ 
					active = false;
					allStop(); 
				}, 1);
		}
	}	
}

var playState = '-webkit-animation-play-state';

function allRun()
{
	console.log("timemove");
	for (var i = 0; i < gifs_array.length; i++)
	{
		gifs_array[i].play();
	}

	for (var i = 0; i < video_array.length; i++)
	{
		video_array[i].play();
	}
	for (var i = 0; i < animation_array.length; i++)
	{
		animation_array[i].css(playState, function(i, v) {
			return v === 'running';
		});
	}
}

function allStop()
{
	for (var i = 0; i < gifs_array.length; i++)
	{
		gifs_array[i].pause();
	}

	for (var i = 0; i < video_array.length; i++)
	{
		video_array[i].pause();
	}
	for (var i = 0; i < animation_array.length; i++)
	{
		animation_array[i].css(playState, function(i, v) {
			return v === 'paused';
		});
	}
}

//helping function for getting css animation
function hasCssAnimation(el)
{
	var items = [el].concat(Array.prototype.slice.call(el.getElementsByTagName("*")));

	for (var i = items.length; i--;)
	{
		var style = window.getComputedStyle(items[i], null);
		var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
		var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');

		if (animDuration > 0 || transDuration > 0) return true;
	}
	return false;
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.action_message == "trigger")
	{ 
		enable = !enable

		if (!enable)
		{
			allRun();
			clearTimeout(timeout);
		}

		sendResponse({enable: enable});
	}	
});
