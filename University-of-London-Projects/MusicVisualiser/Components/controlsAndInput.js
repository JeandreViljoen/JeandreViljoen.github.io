//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput()
{

	this.menuDisplayed = false;

	//Interface buttons initialisation
	this.playbackButton = new PlaybackButton();
	this.nextButton = new NextButton();
	this.scrub = new Scrub();
	this.stopButton = new StopButton();
	this.backButton = new BackButton();
	this.shuffleButton = new ShuffleButton();

	//Menu component initialisation and propert declaration (Visualisations and playlist)
	this.visualisationMenu = new MenuComponent();
	this.playlistMenu = new MenuComponent();

	this.visualisationMenu.menuTitle = "VISUALISATIONS";
	this.visualisationMenu.anchor = LEFT;

	this.playlistMenu.menuTitle = "PLAYLIST";
	this.playlistMenu.anchor = RIGHT;


	//Flag to display the loading message while song is loading.
	let loadMessage = false;

	//Flag to Stop the user from skipping songs too fast and breaking the loading system.
	let clickLimitFlag = true;

	//brings up menu and resets on time.
	this.resetMenu = function ()
	{
		menuTiming = 0;
		menuFade = 255;
		this.menuDisplayed = true;
	}

	let self = this;

	//--------------------------Callback functions for pre-loading song--------------------------
	this.soundLoaded = function ()
	{
		clickLimitFlag = true;
		sound.play();
		self.playbackButton.playing = true;
		console.log("sound loaded");
		loadMessage = false;
		return true;
	};
	this.soundFailed = function ()
	{
		//If an error occurs, song index will just go to the first song in the playlist
		sound.stop();
		self.playbackButton.playing = false;
		isInit = false;
		songIndex = 0;
		console.log("sound failed");
		clickLimitFlag = true;
	};
	this.soundLoading = function ()
	{
		console.log("sound waiting");
		loadMessage = true;
	};

	//--------------------------Interface buttons and event listeners for clicks.--------------------------
	this.mousePressed = function ()
	{
		this.resetMenu();

		//next / Skip Button actions
		if (this.nextButton.hitCheck())
		{
			util.goToNextTrack(shuffleToggle);
			isInit = true;
			this.scrub.isPlaying = true;
		}

		//Playback Button actions
		if (this.playbackButton.hitCheck())
		{
			if (sound.isPlaying())
			{
				sound.pause();
				this.scrub.isPlaying = false;

			} else
			{
				sound.play();
				isInit = true;
				this.scrub.isPlaying = true;
			}
			this.playbackButton.playing = !this.playbackButton.playing;
		}

		//Scrub actions and interactivity
		if (this.scrub.hitCheck())
		{
			if (!this.playbackButton.playing)
			{
				this.playbackButton.playing = true;
				this.scrub.isPlaying = true;
			}
		}

		//Stop Button actions
		if (this.stopButton.hitCheck())
		{
			sound.stop();
			this.playbackButton.playing = false;
			this.scrub.isPlaying = false;

		}

		//Back Button actions
		if (this.backButton.hitCheck())
		{
			if (songIndex != 0)
			{
				this.goToSongIndex(songIndex - 1);
			}
			else
			{
				this.goToSongIndex(songsArray.length - 1);
			}

			isInit = true;
			this.playbackButton.playing = true;

		}

		//Shuffle Button actions
		if (this.shuffleButton.hitCheck())
		{
			shuffleToggle = !shuffleToggle;
		}

		//visualisation menu actions
		if (this.visualisationMenu.hitCheck())
		{

		}

		//playlist menu actions
		if (this.playlistMenu.hitCheck())
		{

		}


		//Modifier sliders actions
		if (this.visualisationMenu.slider1.hitCheck())
		{

		}
		if (this.visualisationMenu.slider2.hitCheck())
		{

		}
		if (this.visualisationMenu.slider3.hitCheck())
		{

		}

	};

	//--------------------------Mouse hold/drag actions for scrub and modifier sliders.--------------------------
	this.mouseDragged = function ()
	{
		if (this.visualisationMenu.slider1.hitCheck())
		{

		}

		if (this.visualisationMenu.slider2.hitCheck())
		{

		}

		if (this.visualisationMenu.slider3.hitCheck())
		{

		}

		if (this.scrub.hitCheck())
		{
			if (!this.playbackButton.playing)
			{
				this.playbackButton.playing = true;
				this.scrub.isPlaying = true;
			}
		}
	};

	//--------------------------Keypress event listeners and actions--------------------------
	this.keyPressed = function (keycode)
	{

		//Pause
		if (keycode == 32) // 'Space'
		{
			if (sound.isPlaying()) 
			{
				sound.pause();
				this.playbackButton.playing = false;
				this.scrub.isPlaying = false;

			}
			else
			{
				sound.play();
				isInit = true;
				this.playbackButton.playing = true;
				this.scrub.isPlaying = true;
			}

		}

		//Visualiser Select
		if (keycode > 48 && keycode < 58) // 1, 2, 3 ... 0
		{
			sliderDefaultResetFlag = true;
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
			if (vis.selectedVisual.hasOwnProperty('onResize'))
			{
				vis.selectedVisual.onResize();
			}
		}

		//Fullscreen
		if (keycode == 70) // 'F'
		{
			let fs = fullscreen();
			fullscreen(!fs);
		}


		if (keycode == 72) // 'H'
		{
			//Toggle Menu hide
			hideTransportFlag = !hideTransportFlag;

			if (hideTransportFlag == true)
			{
				this.visualisationMenu.visible = false;
				this.playlistMenu.visible = false;
			}
			else
			{
				this.visualisationMenu.visible = true;
				this.playlistMenu.visible = true;
			}
		}

		if (keycode == 76) // 'L'
		{
			this.visualisationMenu.lockVisibility = !this.visualisationMenu.lockVisibility;
			this.playlistMenu.lockVisibility = !this.playlistMenu.lockVisibility;
		}
	};

	//--------------------------Draws interface and menus--------------------------
	this.draw = function ()
	{
		//Open menu when mouse hovers near the edges of the screen
		if (mouseX > 0 && mouseX < width / 32)
		{
			this.visualisationMenu.visible = true;
		}
		if (mouseX > width - width / 32 && mouseX < width)
		{
			this.playlistMenu.visible = true;
		}
		push();

		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//buttons
		this.scrub.draw();
		this.playbackButton.draw();
		this.nextButton.draw();
		this.stopButton.draw();
		this.backButton.draw();
		this.shuffleButton.draw();

		//Visualisation menu functions
		this.visualisationMenu.updatePosition(125, (height / 2), 250, 800);
		this.visualisationMenu.draw();
		this.visualisationMenu.listVisualisations();
		this.visualisationMenu.listModifiers();

		//Playlist menu functions
		this.playlistMenu.updatePosition(width - 125, (height / 2), 250, 800);
		this.playlistMenu.draw();
		this.playlistMenu.listPlaylist();

		// (TEMPORARY) Display current song above transport controls. (TEMPORARY)

		//Checks to see if Transport menu is hidden
		if (hideTransportFlag == false)
		{
			fill(gui.color.background);
			noStroke();
			textSize(20);
			textAlign(CENTER, CENTER)

			if (dragAndDropPlaylistFlag)
			{
				text(songsArray[songIndex].name, width / 2, height - height / 30 - 60);
			}
			else
			{
				text(songsArray[songIndex], width / 2, height - height / 30 - 60);
			}

		}


		//Draws message while song is loading
		if (loadMessage)
		{
			fill(gui.color.background);
			rectMode(CENTER);
			rect(width / 2, height / 2, 250, 50, 5);
			textAlign(CENTER, CENTER);
			textSize(30);
			fill(gui.color.text);
			text("LOADING TRACK", width / 2, height / 2 - 2);
		}
		pop();

	};

	//function to help navigate song selections.
	//any array issues will default the song back to index at 0;
	this.goToSongIndex = function (_songIndex)
	{
		if (_songIndex < songsArray.length && _songIndex >= 0)
		{
			if (clickLimitFlag == true)
			{
				clickLimitFlag = false;
				sound.stop();
				if (dragAndDropPlaylistFlag == false)
				{
					sound = loadSound('assets/' + songsArray[_songIndex], this.soundLoaded, this.soundFailed, this.soundLoading);
				}
				else
				{
					sound = loadSound(songsArray[_songIndex], this.soundLoaded, this.soundFailed, this.soundLoading);
					loadMessage = true;
				}

				songIndex = _songIndex;
			}
		}
		else
		{

			this.goToSongIndex(0);

		}
	};
}
