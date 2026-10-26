function ShuffleButton()
{

    this.w = 20;
    this.h = 20;
    this.x = width / 2 + 7 * this.w;
    this.y = height - height / 30 - 25;

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

            if (shuffleToggle)
            {
                fill(gui.color.focus);
            }
            else
            {
                fill(gui.color.text);
            }

            //to resize with window resize
            this.x = width / 2 + 7 * this.w;
            this.y = height - height / 30 - 25;


            //Draw Shape
            strokeWeight(2);
            stroke(0);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
            noStroke();
            textFont(customFontBold);
            textSize(16);
            text('S', this.x + this.w / 2, this.y + this.h / 2 - 1);
            textFont(customFontRegular);

            //Creates animatede feedback on button press
            if (hitAnimationTrigger == true)
            {
                noStroke();
                if (shuffleToggle)
                {
                    fill(100, 255, 100, fade);
                }
                else
                {
                    fill(255, 50, 50, fade);
                }

                rect(this.x, this.y, this.w, this.h);
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

            if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h)
            {
                clickAnimate();
                return true;
            }
            return false;
        }

    };
}