//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for utility / static functions
var util = null;
//variable for any GUI related attributes
let gui = null;
//Flag to tell the program to hide transport menu, false means do not hide
var hideTransportFlag = false;
//Flag to tell the program whether shuffle toggle is active or not (true = active)
let shuffleToggle = true;
//Flag to check if app is initialised
var isInit;
//Flag to reset sliders to defaults when switching to new visualisation
let sliderDefaultResetFlag = true;

//App volume slider
let volumeSlider;

//Modifier sliders
let modSlider01;
let modSlider02;
let modSlider03;

//Font variables
let customFontRegular;
let customFontBold;

//global access to playlist
let songIndex = 0;

//Flag to tell the program whether to play defualt demo songs or switch to user defined songs
//(code is different so this is required)
let dragAndDropPlaylistFlag = false;

//Arrays to store playlist
let dropArray = [];
let songsArray = ['Dark Experimental Hip-Hop.mp3'];

//Counter to define which tutorial screen to display
let initScreenNum = 0;

function preload()
{
	//Load custom fonts
	customFontRegular = loadFont('assets/Gobold Regular.otf');
	customFontBold = loadFont('assets/Gobold Bold.otf');


	//Randomises starting track on first play (For my sanity)
	songIndex = floor(random(0, songsArray.length - 0.001));
	sound = loadSound('assets/' + songsArray[songIndex]);

	//Drag-and-Drop functionality
	initDragAndDropCode();

}

function setup()
{
	//Initialise classes and tools
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	cnv.background(0);
	textFont(customFontRegular);
	gui = new GUI();
	controls = new ControlsAndInput();
	modSlider01 = controls.visualisationMenu.slider1;
	modSlider02 = controls.visualisationMenu.slider2;
	modSlider03 = controls.visualisationMenu.slider3;
	util = new Utilities();

	//Initialise various sliders, THESE ARE TEMPORARY, they will move to menus after
	//implementation.
	volumeSlider = createSlider(0, 100, 100);
	volumeSlider.position(width / 2 - 300, height - height / 30 - 25);


	this.currentVolume = 1;
	isInit = false;

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();

	vis.add(new MirrorSpectrum());
	vis.add(new SpectrumNew());
	vis.add(new AmplitudeScroller());
	vis.add(new Spectrograph());
	vis.add(new Eye());
	vis.add(new CodeFall());
	vis.add(new BlobVis());

}



function draw()
{
	background(0);

	//Checks to see if Transport menu is hidden
	if (hideTransportFlag == false)
	{
		//slider positions updated in draw loop to accomodate resizing
		volumeSlider.position(width / 2 - 300, height - height / 30 - 25);
	}
	else
	{
		//To Hide slider, just move it out the way
		volumeSlider.position(-width, -height);
	}

	//draw the selected visualisation if app is initialised
	if (isInit)
	{
		vis.selectedVisual.draw();
	}


	//draw the controls on top.
	controls.draw();

	//Initialises music player on first action
	if (!isInit)
	{
		//Tutorial screen
		drawInitScreen(initScreenNum);
		textAlign(CENTER, CENTER);
	}

	//volume Slider functionality
	if (this.currentVolume != volumeSlider.value() / 100)
	{
		this.currentVolume = volumeSlider.value() / 100;
		sound.setVolume(this.currentVolume);
	}

	//If song ends, go to next track if applicable.
	if (util.toMinAndSec(sound.currentTime()) == util.toMinAndSec(sound.duration()) && sound.currentTime() != 0)
	{
		util.goToNextTrack(shuffleToggle);
	}

}


//Click listener
function mouseClicked()
{
	//Checks if user exists tutorial by clicking in top left corner of screen
	if (mouseX > width - 300 && mouseX < width && mouseY > 0 && mouseY < 100)
	{
		initScreenNum = 8;
	}

	//If app has not yet been initialised, show tutorial
	if (!isInit)
	{
		//Increment tutorial screen
		initScreenNum++;

		//If tutorial is finished
		if (initScreenNum >= 7)
		{
			//initialise app
			isInit = true;
			sound.setVolume(currentVolume);
			sound.play();
			controls.playbackButton.playing = !controls.playbackButton.playing;
			controls.scrub.isPlaying = true;
		}
	}

	//If app is initialised, lets mouse pressed input through to the control section of the app
	if (isInit)
	{
		controls.mousePressed();
	}
}

//Mouse drag listener
function mouseDragged()
{
	//If app is initialised, lets mouse drag input through to the control section of the app
	if (isInit)
	{
		controls.mouseDragged();
	}

}

//Key listener
function keyPressed()
{
	//If app has not yet been initialised, show tutorial
	if (!isInit)
	{
		//Checks if user pressed escape key, if so, exit tutorial and initialise app
		if (keyCode == 27)
		{
			initScreenNum = 8;
			sound.setVolume(currentVolume);
			sound.play();
			controls.scrub.isPlaying = true;
			controls.playbackButton.playing = true;
		}

		//Increment tutorial screen
		initScreenNum++;

		//When tutorial is done, initialise app
		if (initScreenNum >= 7)
		{
			isInit = true;
		}
	}

	//If app is initialised, lets key pressed input through to the control section of the app
	if (isInit)
	{
		controls.keyPressed(keyCode);
	}
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize'))
	{
		vis.selectedVisual.onResize();
	}
};

//Draw tutorial screens based on input number ( 0 - 6)
function drawInitScreen(_num)
{
	push();


	//Draw tutorial screen number
	fill(255, 255, 255, 255);
	textSize(30);
	text("(" + (_num + 1) + " / 7)", width / 2, 50);


	//If mouse is hovering over 'exit tutorial' button, highlight text
	if (mouseX > width - 300 && mouseX < width && mouseY > 0 && mouseY < 100)
	{
		textSize(40);
		textAlign(RIGHT);
		fill(255, 100, 100);
		text("(ESC) exit tutorial", width - 100, 50)

		2
		textSize(50);
		text("X", width - 50, 50)
	}
	//Show 'exit tutorial' text
	else
	{
		textAlign(RIGHT);
		text("(ESC) exit tutorial", width - 100, 50)

		fill(255, 100, 100);
		textSize(50);
		text("X", width - 50, 50)
	}

	//Tutorial (1/7) - Visualisations
	if (_num == 0)
	{

		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(125, height / 2, 250, 800);

		//line showing category
		fill(255, 255, 255, 255);
		noStroke();
		rect(275, height / 2 - 200, 10, 250);

		//Explanatory text
		textSize(30);
		textAlign(LEFT);
		text("Navigate different visualisations by clicking on the option\nor pressing the numeric key. (1 - 7)", 300, height / 2 - 250);

	}

	//Tutorial (2/7) - Modifiers
	else if (_num == 1)
	{
		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(125, height / 2, 250, 800);

		//line showing category
		fill(255, 255, 255, 255);
		noStroke();
		rect(275, height / 2 + 250, 10, 200);

		//Explanatory text
		textSize(30);
		textAlign(LEFT);
		text("Use sliders to modify or optimise visualisations", 300, height / 2 + 200);
	}

	//Tutorial (3/7) - Lock Menu
	else if (_num == 2)
	{
		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(125, height / 2, 250, 800);

		//line showing category
		fill(255, 255, 255, 255);
		noStroke();
		rect(275, height / 2 + 375, 10, 50);

		//Explanatory text
		textSize(30);
		textAlign(LEFT);
		text("Click to toggle Menu Visibility (or press 'L') ", 300, height / 2 + 370);
	}

	//Tutorial (4/7) - Playlist
	if (_num == 3)
	{

		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(width - 125, height / 2, 250, 800);

		//line showing category
		fill(255, 255, 255, 255);
		noStroke();
		rect(width - 275, height / 2, 10, 600);

		//Explanatory text
		textSize(30);
		textAlign(RIGHT);
		text("Drag-and-Drop songs to make your own playlist.\nClick on any track to play.", width - 300, height / 2 - 250);
		textSize(20);
		fill(200, 200, 200)
		text("(Playlist has a 21 track limit,\nadding more tracks will simply replace the earliest entries)\nTo clear playlist, Simply refresh the app", width - 300, height / 2 - 150);

	}

	//Tutorial (5/7) - Transport
	if (_num == 4)
	{

		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(width / 2, height - 50, width, 100);

		//line showing category
		fill(255, 255, 255, 255);
		noStroke();

		//Explanatory text
		textSize(30);
		textAlign(CENTER);
		text("Control Music Playback", width / 2, height - 300);

		textSize(20);
		text("Use the 'seek bar' to skip to any point in a track", width / 2, height - 250);
		text("Volume", width / 2 - 250, height - 150);

		text("Play / Pause / Skip", width / 2 - 20, height - 150);

		text("Toggle Shuffle", width / 2 + 200, height - 150);

	}

	//Tutorial (6/7) - Hide and lock menus
	if (_num == 5)
	{

		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(width - 125, height / 2, 250, 800);

		//Highlight menu
		fill(255, 255, 255, 50);
		stroke(255, 255, 255, 255);
		rectMode(CENTER);
		rect(125, height / 2, 250, 800);


		//Explanatory text
		fill(255, 255, 255, 255);
		noStroke();
		textSize(30);
		textAlign(CENTER);
		text("If menus are hidden, move the mouse to the edge of the screen to make them visible.\nPress 'L' to toggle menu 'LOCK'\nPress 'H' to 'HIDE' unlocked menus", width / 2, height / 2);

	}

	//Tutorial (7/7) - play / pause / fullscreen
	if (_num == 6)
	{

		//Explanatory text
		fill(255, 255, 255, 255);
		noStroke();
		textSize(30);
		textAlign(CENTER);
		text("Press 'SPACE' to play / pause music.\nPress 'F' for 'FULLSCREEN'", width / 2, height / 2);

	}

	pop();
}



/*Code refactored from

YouTube Channel: dcode
Video Title: “Simple Drag and Drop File Upload Tutorial – HTML, CSS & JavaScript” 
Upload Date: 5 May 2020.

‘dcode’, “Simple Drag and Drop File Upload Tutorial – HTML, CSS & JavaScript”, Video uploaded 5 May 2020.

https://youtu.be/Wtrin7C4b7w*/

//Sets up drag-and-drop functionality
function initDragAndDropCode()
{
	//select dropzone div
	document.querySelectorAll(".drop-zone-input").forEach(inputElement =>
	{
		const dropZoneElement = inputElement.closest(".drop-zone");

		//Add eventlistener for dragging over
		dropZoneElement.addEventListener("dragover", e =>
		{
			e.preventDefault();
			//Highlights screen when ready to accept files
			dropZoneElement.classList.add("drop-zone-highlight");
		});

		//Add eventlistener for dragging over stopped
		["dragleave", "dragend"].forEach(type =>
		{
			dropZoneElement.addEventListener(type, e =>
			{
				//Removes screen highlight when dragging stops
				dropZoneElement.classList.remove("drop-zone-highlight");
			})
		});

		//Add event listener for files dropped
		dropZoneElement.addEventListener("drop", e =>
		{
			e.preventDefault();

			//If files arent empty
			if (e.dataTransfer.files.length)
			{
				inputElement.files = e.dataTransfer.files;

				//For each File, write file to temporary array
				for (i = 0; i < e.dataTransfer.files.length; i++)
				{
					dropArray.push(e.dataTransfer.files[i]);

					while (dropArray.length > 21)
					{
						dropArray.shift();
					}
				}

				//Remove screen highlight
				dropZoneElement.classList.remove("drop-zone-highlight");

				//Initialise app
				dragAndDropPlaylistFlag = true;
				songsArray = dropArray;
				controls.goToSongIndex(songsArray.length - 1);
				isInit = true;
				controls.scrub.isPlaying = true;
				controls.playlistMenu.refreshPlaylistTitles();
			}

		});

	});
}