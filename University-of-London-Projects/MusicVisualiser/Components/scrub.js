function Scrub()
{
    this.songLength = sound.duration();
    this.currentTime = sound.currentTime();

    this.x = 0;
    this.y = height - height / 20 + 20;
    this.h = 10;
    this.w = width;

    this.isPlaying;

    this.draw = function ()
    {
        if (hideTransportFlag == false)
        {

            if (this.isPlaying)
            {
                this.songLength = sound.duration();
                this.currentTime = sound.currentTime();
            }

            //Draw Shape.
            strokeWeight(2);
            stroke(0);
            let seek = map(this.currentTime, 0, this.songLength, 0, width);
            fill(gui.color.base);
            rect(this.x, height - height / 40, width, this.h);
            fill(gui.color.focus);
            rect(this.x, height - height / 40, seek, this.h);

            this.drawTimeStamp(width - 100, height - height / 30);
        }

    };

    this.hitCheck = function ()
    {
        if (hideTransportFlag == false)
        {

            if (mouseX > this.x && mouseX < width && mouseY > height - height / 40 && mouseY < height)
            {
                //Skip to song section on scrub click
                let s = map(mouseX, 0, width, 0, this.songLength);

                sound.jump(s);

                return true;
            }
            return false;
        }

    };

    //Function to draw the timestamp at position, x, y.
    this.drawTimeStamp = function (_x, _y)
    {
        noStroke();
        rectMode(CENTER);
        textSize(20);
        fill(255, 255, 255, 100);
        rect(_x, _y - 13, 3, -20);
        strokeWeight(2);
        stroke(0);


        fill(gui.color.focus);
        text(util.toMinAndSec(this.currentTime), _x - 50, _y - 15);
        fill(gui.color.text);
        text(util.toMinAndSec(this.songLength), _x + 50, _y - 15);
    };

};

