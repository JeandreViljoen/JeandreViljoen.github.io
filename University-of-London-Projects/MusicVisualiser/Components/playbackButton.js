//displays and handles clicks on the playback button.
function PlaybackButton()
{

	this.x = width / 2;
	this.y = height - height / 20;
	this.width = 20;
	this.height = 20;

	let fade = 255;
	let hitAnimationTrigger = false;

	let clickAnimate = function ()
	{
		hitAnimationTrigger = true;
		fade = 255;
	}

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function ()
	{
		if (hideTransportFlag == false)
		{
			rectMode(CORNER);
			this.x = width / 2;
			this.y = height - height / 30 - 25;
			stroke("black");

			//Draw Shape
			if (this.playing)
			{
				fill(100, 255, 100);
				rect(this.x, this.y, this.width / 2 - 2, this.height);
				rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
			}
			else
			{
				fill(255)
				triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);

			}


			//Creates animatede feedback on button press
			if (hitAnimationTrigger == true)
			{
				noStroke();
				if (this.playing)
				{
					fill(100, 255, 100, fade);
					rect(this.x, this.y, this.width / 2 - 2, this.height);
					rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
				}
				else
				{
					fill(255, 50, 50, fade);
					triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
				}

				fade -= 15;

				if (fade <= 0)
				{
					hitAnimationTrigger = false;
				}
			}
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function ()
	{
		if (hideTransportFlag == false)
		{

			if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
			{
				clickAnimate();
				return true;
			}
			return false;
		}

	};

}