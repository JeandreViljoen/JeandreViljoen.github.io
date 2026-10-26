function CustomSlider(_defaultVal)
{
    this.title = "Untitled";
    let defaultVal = _defaultVal;
    this.currentValue = defaultVal;
    this.active = false;

    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    let foregroundColor = gui.color.focus;
    let backgroundColor = color(20, 50, 100, 255);

    this.draw = function (_x, _y, _w, _h)
    {
        //Assign positional and size values based on the parameters passed
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;

        //Draws the colors and shapes
        fill(gui.color.text);
        textAlign(LEFT, BOTTOM)
        textSize(18);
        text(this.title, this.x, this.y - (0.2 * this.h));

        rectMode(CORNER);
        noStroke();
        foregroundColor = gui.color.focus;
        backgroundColor = color(20, 50, 100, 255);

        this.mouseOver();
        fill(backgroundColor);
        rect(_x, _y, _w, _h);

        fill(foregroundColor);
        rect(_x, _y, _w * this.currentValue, _h);
    };

    //Event listener
    this.hitCheck = function ()
    {

        if (this.checkBounds())
        {
            //If within bounds, update value
            this.currentValue = map(mouseX, this.x, (this.x + this.w), 0, 1);

            return true;
        }
        return false;

    };

    //Returns true if mouse position is within the bounds of the slider
    this.checkBounds = function ()
    {
        if (mouseX > this.x
            && mouseX < this.x + this.w
            && mouseY > this.y
            && mouseY < this.y + this.h)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.mouseOver = function ()
    {
        if (mouseX > this.x
            && mouseX < this.x + this.w
            && mouseY > this.y
            && mouseY < this.y + this.h)
        {
            foregroundColor = color(180, 255, 180);
            backgroundColor = color(60, 90, 140, 255);
        }
    }

    //Returns the value of the current slider position as a percentage
    this.value = function ()
    {
        return this.currentValue * 100;
    };

    //Resets slider position to default.
    this.reset = function ()
    {
        this.currentValue = 0.5;
    };
}