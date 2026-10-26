function MenuComponent()
{

    //Initialise and declare all menu component properties.
    this.backgroundOpacity = 80;
    this.backgroundColor = new color(gui.color.base);

    this.menuTitle = "";
    this.textHighlightColor = gui.color.textHighlightColor;
    this.textHighlighted = false;
    this.anchor = LEFT;
    this.visible = true;
    this.lockVisibility = true;

    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    let lockSize = 15;

    let titlePosXOffset = 0;
    let titlePosYOffset = -1 * (this.h / 2) * 0.85;

    let listPosXOffset = -1 * this.w / 2 * 0.6;
    let listPosYOffset = -1 * (this.h / 2) * 0.8;

    let modifiersPosXOffset = 0;
    let modifiersPosYOffset = (this.h / 2 * 0.33);

    let animationTimer = 300;

    this.slider1 = new CustomSlider(0.5);
    this.slider2 = new CustomSlider(0.5);
    this.slider3 = new CustomSlider(0.5);

    let trackData = [];


    //Refresh The playlist when changes are made.
    this.refreshPlaylistTitles = function ()
    {
        //Clear existing array data
        trackData.splice(0, songsArray.length);

        //Loop through playlist
        for (let i = 0; i < songsArray.length; i++)
        {
            //Check if drag and drop has been used
            //push track title to TrackData object
            if (dragAndDropPlaylistFlag)
            {
                trackData.push(new TrackData(songsArray[i].name));
            }
            else
            {
                trackData.push(new TrackData(songsArray[i]));
            }
        }
    }

    this.refreshPlaylistTitles();

    this.draw = function ()
    {

        this.backgroundColor.setAlpha(this.backgroundOpacity);
        noStroke();
        fill(this.backgroundColor);
        rectMode(CENTER);

        //x, y, w, h
        if (this.anchor == LEFT)
        {
            rect(this.x, this.y, this.w, this.h, 0.0, 10.0, 10.0, 0.0);
        }
        else if (this.anchor == RIGHT)
        {
            rect(this.x, this.y, this.w, this.h, 10, 0, 0, 10);
        }

        if (this.lockVisibility == true)
        {
            fill(gui.color.focus)
        }
        else
        {
            fill(255, 255, 255, 100)
        }

        lockSize = 15;

        this.highlightLockButton();
        textAlign(CENTER, CENTER);
        textSize(lockSize);
        text("LOCK MENU", this.x, this.y + this.h / 2 * 0.92);


        this.mouseOver();

    };



    //Event listener for the menu
    this.hitCheck = function ()
    {
        //Checks menu bounds
        if (mouseX > this.x - this.w / 2
            && mouseX < this.x + this.w / 2
            && mouseY < this.y + this.h / 2
            && mouseY > this.y - this.h / 2)
        {
            //Menu lock button
            if (mouseY > this.y + this.h / 2 * 0.9 && mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2)
            {
                this.lockVisibility = !this.lockVisibility;
            }
            //Playlist Menu controls
            if (this.menuTitle == "PLAYLIST")
            {
                let playlistLimit = songsArray.length;

                if (playlistLimit >= 21)
                {
                    playlistLimit = 21;
                }

                for (let i = 0; i < playlistLimit; i++)
                {
                    if (mouseY > this.y + listPosYOffset + ((i + 1) * 30) - 10 && mouseY < this.y + listPosYOffset + ((i + 1) * 30) + 30 - 10)
                    {

                        controls.goToSongIndex(i);
                        isInit = true;
                        controls.scrub.isPlaying = true;

                    }
                }
            }
            //Visualisation menu controls
            if (this.menuTitle == "VISUALISATIONS")
            {
                for (let i = 0; i < vis.visuals.length; i++)
                {
                    if (mouseY > this.y + listPosYOffset + ((i + 1) * 30) - 10 && mouseY < this.y + listPosYOffset + ((i + 1) * 30) + 30 - 10)
                    {
                        controls.keyPressed(i + 48 + 1);
                    }
                }
            }

        }
        //Hides menu if lock is off and user clicks outside of menu
        else
        {
            this.visible = false;
        }

    };

    //Highlights menu options if mouse hovers over
    this.mouseOver = function ()
    {
        //Checks menu bounds
        if (mouseX > this.x - this.w / 2
            && mouseX < this.x + this.w / 2
            && mouseY < this.y + this.h / 2
            && mouseY > this.y - this.h / 2)
        {

            //Check whether the menu is titled 'playlist'
            if (this.menuTitle == "PLAYLIST")
            {
                //Menu only allows 21 tracks at a time
                //Make sure the highlited options can only cover 21 positions
                let playlistLimit = songsArray.length;

                if (playlistLimit >= 21)
                {
                    playlistLimit = 21;
                }

                //Iterate through the menu options and checks if the mouse is hovering over
                for (let i = 0; i < playlistLimit; i++)
                {
                    //If it is, draw a highlight rectangle
                    if (mouseY > this.y + listPosYOffset + ((i + 1) * 30) - 10 && mouseY < this.y + listPosYOffset + ((i + 1) * 30) + 30 - 10)
                    {
                        fill(255, 255, 255, 50);
                        rectMode(CORNER);
                        rect(this.x - this.w / 2, this.y + listPosYOffset + ((i + 1) * 30) - 15, this.w, 30);

                    }
                }
            }
            //Check whether the menu is titled 'visualisations'
            else if (this.menuTitle == "VISUALISATIONS")
            {
                //Iterate through the menu options and checks if the mouse is hovering over
                for (let i = 0; i < vis.visuals.length; i++)
                {
                    //If it is, draw a highlight rectangle
                    if (mouseY > this.y + listPosYOffset + ((i + 1) * 30) - 10 && mouseY < this.y + listPosYOffset + ((i + 1) * 30) + 30 - 10)
                    {

                        fill(255, 255, 255, 50);
                        rectMode(CORNER);
                        rect(this.x - this.w / 2, this.y + listPosYOffset + ((i + 1) * 30) - 15, this.w, 30);

                    }
                }
            }

        }


    }

    //Checks if Lock button is being hovered over, if it is Highlight it
    this.highlightLockButton = function ()
    {
        //Check menu bounds
        if (mouseX > this.x - this.w / 2
            && mouseX < this.x + this.w / 2
            && mouseY < this.y + this.h / 2
            && mouseY > this.y - this.h / 2)
        {

            //Check realtive position bounds
            if (mouseY > this.y + this.h / 2 * 0.9 && mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2)
            {
                //Highlight settings
                lockSize = 20;

                if (this.lockVisibility == true)
                {
                    fill(180, 255, 180)
                }
                else
                {
                    fill(255, 255, 255, 100)
                }

            }
        }
    }

    //Function to update menu position based on calling function parameters.
    //Menu will animate to hide
    this.updatePosition = function (_x, _y, _w, _h)
    {

        if (this.visible == true || this.lockVisibility == true)
        {
            //Reset animation timer
            animationTimer = 300;

            //update new properties
            this.x = _x;
            this.y = _y;
            this.w = _w;
            this.h = _h;

            titlePosYOffset = -1 * (this.h / 2) * 0.85;

            listPosXOffset = -1 * (this.w / 2) * 0.6;
            listPosYOffset = -1 * (this.h / 2) * 0.8;

            modifiersPosYOffset = (this.h / 2 * 0.33
            );
        }
        else if (this.visible == false)
        {
            //Animates in a direction based on menu anchor
            if (animationTimer > 0)
            {
                if (this.anchor == LEFT)
                {
                    this.x = this.x - 20;
                }
                else if (this.anchor == RIGHT)
                {
                    this.x = this.x + 20;
                }
                else if (this.anchor == TOP)
                {
                    this.y = this.y - 20;
                }
                else if (this.anchor == BOTTOM)
                {
                    this.y = this.y + 20;
                }

                //Count down animation timer/frames
                animationTimer--;
            }


        }

        //Function to write out the visualisations
        this.listVisualisations = function ()
        {
            this.drawHeading(this.menuTitle);

            for (let i = 0; i < vis.visuals.length; i++)
            {

                textSize(20);
                textAlign(LEFT);

                //Highlights selected visualisation color
                if (vis.selectedVisual.name == vis.visuals[i].name)
                {
                    fill(gui.color.focus);
                }
                else
                {
                    fill(gui.color.text);
                }
                text((i + 1) + " : " + vis.visuals[i].name, this.x + listPosXOffset, this.y + listPosYOffset + ((i + 1) * 30));
            }
        }

        //Draws title and line
        this.drawHeading = function (_heading)
        {
            fill(255);
            rectMode(CENTER);
            rect(this.x + titlePosXOffset, this.y + titlePosYOffset * 1.075, this.w / 3, this.h / 100);

            textAlign(CENTER, CENTER);
            textSize(30);
            text(_heading, this.x + titlePosXOffset, this.y + titlePosYOffset);
        };


        //Draws modifier sliders
        this.listModifiers = function ()
        {
            fill(255);
            rectMode(CENTER);
            rect(this.x + modifiersPosXOffset, this.y + modifiersPosYOffset * 0.8, this.w / 3, this.h / 100);

            textAlign(CENTER, CENTER);
            textSize(30);
            text("MODIFIERS", this.x + modifiersPosXOffset, this.y + modifiersPosYOffset);

            if (this.slider1.active)
                this.slider1.draw(this.x - (this.w / 2) * 0.8, this.y + (this.h / 4), this.w * 0.8, 20);

            if (this.slider2.active)
                this.slider2.draw(this.x - (this.w / 2) * 0.8, this.y + (this.h / 4) + 60, this.w * 0.8, 20);

            if (this.slider3.active)
                this.slider3.draw(this.x - (this.w / 2) * 0.8, this.y + (this.h / 4) + 120, this.w * 0.8, 20);
        };

        //Draws song titles on playlist menu
        this.listPlaylist = function ()
        {

            this.drawHeading(this.menuTitle);

            let playlistLimit = songsArray.length;

            if (playlistLimit >= 21)
            {
                playlistLimit = 21;
                text("...", this.x, this.y + 330);
            }

            for (let i = 0; i < playlistLimit; i++)
            {
                fill(255);
                textSize(20);
                textAlign(LEFT);

                //Makes currently playing song Title green.
                if (songIndex == i)
                {
                    fill(100, 255, 100);
                }
                else
                {
                    fill(255, 255, 255);
                }

                //Display track titles 
                text((i + 1) + " : " + trackData[i].returnSubString(), this.x + (listPosXOffset * 1.4), this.y + listPosYOffset + ((i + 1) * 30));
            }

        };
    }
}

//Object to handle track title information and clipping
function TrackData(_title)
{
    //Start character index
    this.start = 0;
    //end character index
    this.end = 18;
    //Track title
    this.title = _title;

    //Returns the title clipped to 18 caracters only
    //Will shift / scroll characters once per second
    this.returnSubString = function ()
    {
        //Shorted title if above 18 characters
        if (this.title.length > 18)
        {
            //Once per 60 frames
            if (frameCount % 60 == 0)
            {
                //Shift characters up once
                if (this.end < this.title.length)
                {
                    this.start++;
                    this.end++;
                }
                //Reset position if the end index reached the end of the string
                else
                {
                    this.start = 0;
                    this.end = 18;
                }

            }

            return this.title.substr(this.start, this.end);// + "...";
        }
        //Return full title if title is under 18 characters
        else
        {
            return this.title;
        }
    }
}

