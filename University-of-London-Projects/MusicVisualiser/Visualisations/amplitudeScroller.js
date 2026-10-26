function AmplitudeScroller()
{
    this.name = "Amplitude Surf";

    //Arrays to store amplitude averages over time for two seperate frequency ranges
    let bassArray = [];
    let midArray = [];

    this.draw = function ()
    {
        push();

        //Initialise and reset modifier sliders to default value.
        if (sliderDefaultResetFlag == true)
        {
            util.setSliders("Horizontal Zoom", 0.05, true, "Vertical Zoom", 0.5, true, "Color", 0.98, true);
            sliderDefaultResetFlag = false;
        }

        var spectrum = fourier.analyze();

        //Set slider variables
        let speed = modSlider01.value() + 1;
        let verticalZoom = modSlider02.value();

        //populate average-over-time arrays with specified frequency ranges.
        bassArray.push(util.getEnergyRangeAVG(spectrum, 80, 250));
        midArray.push(util.getEnergyRangeAVG(spectrum, 1000, 3000));

        colorMode(HSB);
        background((modSlider03.value() / 100 * 360 - 40) % 360, 100, 2);


        blendMode(SCREEN);

        //Draw Waveform 1 - back - bass
        //reset starting point to edge of the screen.
        let x = width + speed * 2
        beginShape();
        //Cycle through stored values
        for (let i = bassArray.length - 1; i >= 0; i--)
        {

            //x position for each sample (speed)
            x = x - speed;

            //y position for each sample (amplitude)
            let h = map(bassArray[i], verticalZoom, 255, 0, height);

            //Color select
            fill(modSlider03.value() / 100 * 360, 100, 50);

            //If waveform goes off screen it clears out the array to keep performance up
            if (bassArray.length > width)
            {
                bassArray.shift();
            }

            //Draw vertex for each sample in the array
            curveVertex(x, height - h);

        }
        //vertexes to close up the shape.
        vertex(x, height);
        vertex(x, height + 5);
        vertex(x, height + 10);
        vertex(width, height);
        vertex(width, height / 2);
        endShape();



        //Draw Waveform 2 - Front - Vocal
        //reset starting point to edge of the screen.
        x = width + speed * 2
        beginShape();
        //Cycle through stored values
        for (let i = midArray.length - 1; i >= 0; i--)
        {
            //x position for each sample (speed)
            x = x - speed;

            //y position for each sample (amplitude)
            let h = map(midArray[i], verticalZoom + 50, 220, 0, height);

            //Color select
            fill((modSlider03.value() / 100 * 360 - 20) % 360, 100, 75);

            //If waveform goes off screen it clears out the array to keep performance up
            if (midArray.length > width)
            {
                midArray.shift();
            }

            //Draw vertex for each sample in the array
            curveVertex(x, height - h);

        }
        //vertexes to close up the shape.
        vertex(x, height);
        vertex(x, height + 5);
        vertex(x, height + 10);
        vertex(width, height);
        vertex(width, height / 2);

        endShape();

        //Draw labels to show which waveform represents what.
        blendMode(DODGE);
        colorMode(RGB);
        textSize(50);
        fill(255, 255, 255, 50)
        text('Vocal', width / 20, height - height / 20);
        fill(255, 255, 255, 50)
        text('Bass', width / 20, height / 20);
        blendMode(BLEND);
        pop();
    }
}