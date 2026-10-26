function MirrorSpectrum()
{
    this.name = "Mirror Spectrum";

    const FOURIER_SAMPLE_AMOUNT = 1024;
    let logarithmicSpacing = [];

    //Remap sample positions to be more accurate.
    for (var i = 0; i < FOURIER_SAMPLE_AMOUNT; i++)
    {
        logarithmicSpacing.push(Math.log2(i));
    }

    //Array that will store a select amount of the last few spectrums over time.
    let spectrumMemory = [];

    this.draw = function ()
    {
        //Initialise and reset modifier sliders to default value.
        if (sliderDefaultResetFlag == true)
        {
            util.setSliders("Width", 0.05, true, "Resolution", 0.6, true, "Color", 0.5, true);
            sliderDefaultResetFlag = false;
        }

        //Set slider variables
        let lineThickness = modSlider01.value() / 100 * 19 + 1;
        let gradientResolution = modSlider02.value() / 100 * 14 + 2;
        let hueColor = modSlider03.value() / 100 * 360;

        var spectrum = fourier.analyze();

        //Saves a new spectrum each fourier sample.
        spectrumMemory.push(spectrum);


        //Sets background and floor colors.
        colorMode(HSB);
        fill(hueColor, 255, 4);
        rect(0, 0, width, height / 3 * 2);

        fill(hueColor - 5, 255, 2);
        rect(0, height / 3 * 2, width, height / 2);


        //loops through all the stored spectrums
        for (var k = spectrumMemory.length - 1; k >= 0; k--)
        {
            //loops through each and every sample for a given spectrum
            for (var i = 0; i < spectrum.length; i++)
            {

                //Seet positional and size data for each sample
                let x = map(logarithmicSpacing[i], 0, 10, width * 0.1, width * 0.9);
                let y = height / 3 * 2;

                let amplitude = map(spectrumMemory[k][i], 0, 255, 0, height / 2 * 0.8);


                //Draw the same spectrum on the back and on the floor.
                colorMode(HSB);
                noStroke();

                fill(hueColor - 2 * k, 200, (5 * gradientResolution) - (5 * k) + 1);
                rect(x, y, lineThickness, (amplitude / gradientResolution * k) / 2);

                fill(hueColor - 3 * k, 255, 50 + (5 * gradientResolution) - (5 * k) + 1);
                rect(x, y, lineThickness, -amplitude / gradientResolution * k);

                colorMode(RGB);
            }
            //If the spectrum memory is full, start erasing the oldest spectrums.
            if (spectrumMemory.length > gradientResolution)
            {
                spectrumMemory.shift();

            }
        }
    }
};