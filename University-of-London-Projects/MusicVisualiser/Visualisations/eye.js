function Eye()
{
    this.name = "Eyes";
    let xNoise = 0.0;
    let yNoise = 0.0;
    let xOff = 0;
    let yOff = 0;
    let eyes = [];
    let eyesAmount = 0;
    let eyeAmountFlag = true;


    this.draw = function ()
    {

        //Initialise and reset modifier sliders to default value.
        if (sliderDefaultResetFlag == true)
        {
            util.setSliders("Layer Complexity", 0.5, true, "Size", 0.6, true, "Amount", 0.2, true);
            sliderDefaultResetFlag = false;

            //Resets amount of generated eyes if this flag is true
            eyeAmountFlag = true;

        }

        //If the amount slider changed, this code will run and update the flag.
        if (eyesAmount != floor(modSlider03.value() / 2))
        {
            eyesAmount = floor(modSlider03.value() / 2);

            eyeAmountFlag = true;
        }


        //This will only run if the flag is set to true and will update the arrays that store the randomly generated eyes.
        if (eyeAmountFlag == true)
        {
            //As long as the array is not empty, eyes will re-generate as normal
            if (eyesAmount != 0)
                for (let i = 0; i < eyesAmount; i++)
                {
                    //Makes sure there are same amount of eye objects in the eye array that the amount specifies
                    while (eyes.length >= eyesAmount)
                    {
                        eyes.shift();
                    }

                    //eye properties. Randomly generated
                    let eye = {
                        x: random(0, width),
                        y: random(0, height),
                        xOffSeed: random(210, 300),
                        yOffSeed: random(310, 400),
                        size: random(0.1, 2),
                        color: floor(random(0, 2.99999999999999))
                    }
                    eyes.push(eye);
                }
            //If the slider was set to 0, the whole array will clear out.
            else
            {
                while (eyes.length > 0)
                {
                    eyes.shift();
                }
            }
            //Set flag to false, so the eyes do not regenerate on the next frame.
            eyeAmountFlag = false;
        }

        push();

        //start of drawing
        var spectrum = fourier.analyze();

        //Get the frequency ranges to animate the iris.
        let bassEnergy = util.getEnergyRangeAVG(spectrum, 20, 41);
        let midEnergy = util.getEnergyRangeAVG(spectrum, 100, 200);
        let highEnergy = util.getEnergyRangeAVG(spectrum, 3000, 5000);

        //variable to store value that will influence the eye movement based on bass drum beats
        let beatInfluence = map(midEnergy, 190, 230, 1, 15, true);

        //Code for big center eye, always displays
        function generateMainEye()
        {

            //uses random movement based on a noise seed to move on the x and y axis.
            //THis value is also affected by the beatInfluence variable and wll make the eyes pulse with movement on the beat of the music.

            //x
            noiseSeed(10);
            xNoise = xNoise + (0.0005 + 0.01 * beatInfluence * 0.1);
            xOff = map(noise(xNoise), 0, 1, -100, 100);

            //y
            noiseSeed(5);
            yNoise = yNoise - (0.0005 + 0.01 * beatInfluence * 0.1);
            yOff = map(noise(yNoise), 0, 1, 100, -100);

            blendMode(BLEND);

            //Slider value affects the resolution of the faux 3D effect to draw the "shading" rings of the eye. Allows for lower resolutions to improve performance.
            let eyeLayers = 20 + modSlider01.value() * 0.8;


            //Code to draw the white faux 3D part of the eye.
            for (let i = eyeLayers; i >= 0; i--)
            {

                //calculate amount of layers and shading to generate based on the slider for eye resolution.
                let incr = 500 / eyeLayers;

                //Calculate the offset required to generate positions
                let offset = map(eyeLayers - i, 0, eyeLayers, 0.1 * (modSlider02.value() / 100 + 1), 2 + (modSlider02.value() / 200));

                //calculate shading for each ring
                fill(255, 255, 255, 255 - (200 / eyeLayers * i));

                //Lowest layer is not see through
                if (i == eyeLayers)
                {
                    fill(100, 100, 100, 255);
                }

                //Draw all the circles to create the faux 3D effect. 'offset' generates the circle position based on its layer number. This creates the effect. then yOff and xOff moves the ball around randomly.
                ellipse(width / 2 + offset * xOff * (modSlider02.value() / 100 + 1), height / 2 + offset * yOff * (modSlider02.value() / 100 + 1), i * incr * (modSlider02.value() / 100 + 1));
            }


            //Draw the 3 red Iris parts, all animated with different frequencies.
            blendMode(MULTIPLY);
            fill(bassEnergy, 0, 0, 255);
            //Same idea as mentioned above in the white ball section, but just tweaked for the irises
            let size = map(bassEnergy, 0, 255, 100, 300);
            ellipse(width / 2 + (xOff * 2), height / 2 + (yOff * 2), size * (modSlider02.value() / 100 + 1));

            fill(0, 0, midEnergy, 50);
            size = map(midEnergy, 0, 255, 0, 300);
            //Same idea as mentioned above in the white ball section, but just tweaked for the irises
            ellipse(width / 2 + (xOff * 2) * 1.15, height / 2 + (yOff * 2) * 1.15, size * (modSlider02.value() / 100 + 1));

            fill(0, highEnergy, 0, 255);
            size = map(highEnergy, 0, 255, 0, 250);
            //Same idea as mentioned above in the white ball section, but just tweaked for the irises
            ellipse(width / 2 + (xOff * 2) * 1.3, height / 2 + (yOff * 2) * 1.3, size * (modSlider02.value() / 100 + 1));

        }



        //Function to draw an eye based on given parameters.
        function generateEye(_x, _y, _noiseSeedXoffset, _noiseSeedYoffset, _size, _color)
        {
            //x and y positions
            let xPos = _x;
            let yPos = _y;

            //Size multiplier
            let sizeDivision = _size;

            //Noise seed for uniue movement (both X and Y)
            noiseSeed(_noiseSeedXoffset);
            xOff = map(noise(xNoise), 0, 1, -100, 100);

            noiseSeed(_noiseSeedYoffset);
            yOff = map(noise(yNoise), 0, 1, 100, -100);



            //Rest is exactly the same as the main eye.
            blendMode(BLEND);
            let eyeLayers = eyelayers = 20 + modSlider01.value() * 0.8;

            for (let i = eyeLayers; i >= 0; i--)
            {
                let incr = 500 / eyeLayers;

                let offset = map(eyeLayers - i, 0, eyeLayers, 0.1 * (modSlider02.value() / 100 + 1), 2 + (modSlider02.value() / 200));

                fill(255, 255, 255, 255 - (200 / eyeLayers * i));
                if (i == eyeLayers)
                {
                    fill(100, 100, 100, 255);
                }
                ellipse(xPos + offset / 2 * sizeDivision * xOff * (modSlider02.value() / 100 + 1),
                    yPos + offset / 2 * sizeDivision * yOff * (modSlider02.value() / 100 + 1),
                    i * sizeDivision * incr / 2 * (modSlider02.value() / 100 + 1));
            }

            //changes color of the iris based on the geven parameter
            blendMode(MULTIPLY);
            if (_color == 0)
            {
                fill(bassEnergy, 0, 0, 255);
            }
            else if (_color == 1)
            {
                fill(0, bassEnergy / 2, 0, 255);
            }
            else if (_color == 2)
            {
                fill(0, 0, bassEnergy / 2, 255);
            }

            //Draw outer Iris
            let size = map(bassEnergy, 0, 255, 100, 300);
            ellipse(xPos + (xOff * sizeDivision), yPos + (yOff * sizeDivision), size / 2 * sizeDivision * (modSlider02.value() / 100 + 1));



            //changes color of the iris based on the geven parameter
            if (_color == 0)
            {
                fill(0, 0, midEnergy, 50);
            }
            else if (_color == 1)
            {
                fill(midEnergy / 2, 0, 0, 50);
            }
            else if (_color == 2)
            {
                fill(0, midEnergy / 2, 0, 50);
            }

            // Draw middle Irirs
            size = map(midEnergy, 0, 255, 0, 300);
            ellipse(xPos + (xOff * sizeDivision) * 1.15, yPos + (yOff * sizeDivision) * 1.15, size / 2 * sizeDivision * (modSlider02.value() / 100 + 1));



            //changes color of the iris based on the geven parameter
            if (_color == 0)
            {
                fill(0, highEnergy, 0, 255);
            }
            else if (_color == 1)
            {
                fill(0, 0, highEnergy / 2, 255);
            }
            else if (_color == 2)
            {
                fill(highEnergy / 2, 0, 0, 255);
            }

            //Draw inner Iris
            size = map(highEnergy, 0, 255, 0, 250);
            ellipse(xPos + (xOff * sizeDivision) * 1.3, yPos + (yOff * sizeDivision) * 1.3, size / 2 * sizeDivision * (modSlider02.value() / 100 + 1));

        }

        //Generates two huge eyes in the back to fill up the black space.
        generateEye(width / 2, height / 2, 44, 27, 15, 0);
        fill(0, 0, 0, 230);
        rect(0, 0, width, height);
        generateEye(width / 2, height / 2, 22, 76, 7, 0);
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);

        //Draws all the eyes stored in the array
        for (let i = 0; i < eyes.length; i++)
        {
            generateEye(eyes[i].x, eyes[i].y, eyes[i].xOffSeed, eyes[i].yOffSeed, eyes[i].size, eyes[i].color);

            //Shades eyes that are further back to create depth
            fill(0, 0, 0, 255 / eyes.length);
            rect(0, 0, width, height);
        }

        generateMainEye();

        pop();
    };
}
