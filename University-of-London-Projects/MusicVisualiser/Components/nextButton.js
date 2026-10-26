function NextButton()
{
    this.w = 20;
    this.h = 20;
    this.x = width / 2 + 2 * this.w;
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

            fill(255);
            stroke("black");

            //to resize with window resize
            this.x = width / 2 + 2 * this.w;
            this.y = height - height / 30 - 25;

            //Draw Shape
            triangle(this.x, this.y, this.x + this.w, this.y + this.h / 2, this.x, this.y + this.h);
            triangle(this.x + 10, this.y, this.x + this.w + 10, this.y + this.h / 2, this.x + 10, this.y + this.h);

            //Creates animatede feedback on button press
            if (hitAnimationTrigger == true)
            {
                noStroke();
                fill(100, 255, 100, fade);
                triangle(this.x, this.y, this.x + this.w, this.y + this.h / 2, this.x, this.y + this.h);
                triangle(this.x + 10, this.y, this.x + this.w + 10, this.y + this.h / 2, this.x + 10, this.y + this.h);
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

            if (mouseX > this.x && mouseX < this.x + this.w + 10 && mouseY > this.y && mouseY < this.y + this.h)
            {
                clickAnimate();
                return true;
            }
            return false;
        }

    };



}