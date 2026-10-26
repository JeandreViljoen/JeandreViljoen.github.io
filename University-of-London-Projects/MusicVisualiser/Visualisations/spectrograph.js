function Spectrograph()
{
    this.name = "Spectrograph";

    let output = [];
    let endY;

    //Positional variables
    startX = width / 5;
    endY = height / 5;
    startY = height - endY;

    //Initialise color variables.
    let colorRed = 0;
    let colorBlue = 0;
    let colorGreen = 0;

    spectrumWidth = (width / 5) * 3;

    const FOURIER_SAMPLE_AMOUNT = 1024;
    let logarithmicSpacing = [];

    //Remap sample positions to be more accurate.
    for (var i = 0; i < FOURIER_SAMPLE_AMOUNT; i++)
    {
        logarithmicSpacing.push(Math.log2(i));
    }

    this.draw = function ()
    {
        //Initialise and reset modifier sliders to default value.
        if (sliderDefaultResetFlag == true)
        {
            util.setSliders("Resolution", 0.6, true, "Samples", 0.2, true);
            sliderDefaultResetFlag = false;
        }

        //Assign slider variables
        let resolution = 50 - modSlider01.value() / 100 * 50 + 1;
        let sampleAmount = modSlider02.value() / 100 * 100 + 1;

        //Analyse audio
        var spectrum = fourier.analyze();

        //Stores the spectrums in a 2D array to keep track of past spectrum content.
        output.push(spectrum);

        stroke(255);
        strokeWeight(2);

        //Sets resolution of the "pixel" samples
        let x = width / 2 - (resolution * output.length / 2);


        //Loops through history of spectrums
        for (let j = 0; j < output.length; j++)
        {

            //X position for each veritcal spectrum sample
            x = x + resolution;
            //low intensity 
            //fadeCoeff = map(j, 0, output.length, 0, 1);

            //Loops through each sample in a given spectrum
            for (var i = 0; i < spectrum.length; i++)
            {

                let y = map(logarithmicSpacing[i], 0, 10, height, 0); //logarithmicSpacing[i]

                //Make bass pixels thicker and high pixels smaller to fill up some empty space created by the positional remap.
                let thickness = map(logarithmicSpacing[i], 0, 9, 20, 1, true);

                //pixel opacity is directly related to its intensity
                let opacity = output[j][i];

                //Maps color based on sample intensity
                colorRed = map(output[j][i], 0, 255, 0, 255);
                colorBlue = map(colorRed, 0, 255, 150, 0);
                colorGreen = map(colorBlue, 255, 0, 0, 110)

                //Draw all the samples as "pixels"
                blendMode(LIGHTEST);
                fill(colorRed, colorGreen, colorBlue, opacity)
                noStroke();
                rect(x, y, resolution, thickness);
                blendMode(BLEND);

                //Erases spectrums outside of the range of the sample limit.
                if (output.length > sampleAmount)
                {
                    output.shift();
                }

            }
        }
    }
};