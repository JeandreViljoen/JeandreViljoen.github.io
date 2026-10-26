function StopButton()
{
    this.w = 20;
    this.h = 20;
    this.x = width / 2 - 2 * this.w;
    this.y = height - height / 30 - 25;

    this.playing = false;

    let fade = 255;
    let hitAnimationTrigger = false;

    let clickAnimate = function ()
    {
        hitAnimationTrigger = true;
        fade = 255;
    }

    this.draw = function ()
    {
        if (hideTransportFlag == false)
        {
            rectMode(CORNER);
            fill(gui.color.text);
            stroke("black");

            //to resize with window resize
            this.x = width / 2 - 2 * this.w;
            this.y = height - height / 30 - 25;

            //Draw Shape
            fill(gui.color.text);
            rect(this.x, this.y, this.w, this.h);

            //Creates animatede feedback on button press
            if (hitAnimationTrigger == true)
            {
                noStroke();
                fill(255, 50, 50, fade);
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

};
