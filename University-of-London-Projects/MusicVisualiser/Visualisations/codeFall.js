// NOTE: THE BASE OF THE FOLLOWING CODE IS NOT MINE
//"Jacker Deluxe, “Noisy-Bit patterns” 
//(Jacker Deluxe got the initial code from Jason Lubbe, ‘Bit patterns’, 5 Dec, 2017)

/*
    Original code by Jason Labbe.

    'Bit patterns'
    
    Author:
      Jason Labbe
    
    Site:
      jasonlabbe3d.com
    */

function CodeFall()
{


    this.name = "Code Fall";

    var speed = 0.01;
    var speedx = 0.00;
    var speedy = 0;
    var maxSize = 15;
    var falloff = 500;
    var steps = 40;
    var noiseValueAmplifier = 5;

    this.draw = function ()
    {

        //Initialise and reset modifier sliders to default value.
        if (sliderDefaultResetFlag == true)
        {
            util.setSliders("Scale (only for hi-res)", 0.0, true, "Character", 0.0, true, "Color", 0.92, true);
            sliderDefaultResetFlag = false;
        }

        //Set slider variables
        let customScaling = modSlider01.value() / 100 + 1;
        let codeSelect = floor(modSlider02.value() / 100 * 9.999999999999999999 + 1);
        let codeA = '1';
        let codeB = '0';

        colorMode(HSB);
        background((modSlider03.value() / 100 * 360 - 50) % 360, 100, 5);

        //Scaling Slider
        steps = 40 * customScaling;
        maxSize = 15 * customScaling;

        //Code selection Slider
        if (codeSelect == 1)
        {

            codeA = '1';
            codeB = '0';
        }
        else if (codeSelect == 2)
        {
            codeA = '0';
            codeB = '1';
        }
        else if (codeSelect == 3)
        {
            maxSize = 20 * customScaling;
            codeA = '-';
            codeB = '|';
        }
        else if (codeSelect == 4)
        {
            codeA = '|';
            codeB = ':';
        }
        else if (codeSelect == 5)
        {
            codeA = '/';
            codeB = '|';
        }
        else if (codeSelect == 6)
        {
            codeA = '|';
            codeB = '/';
        }
        else if (codeSelect == 7)
        {
            codeA = '^';
            codeB = '.';
        }
        else if (codeSelect == 8)
        {
            maxSize = 50 * customScaling;
            codeA = '.';
            codeB = '.';
        }
        else if (codeSelect == 9)
        {
            maxSize = 50 * customScaling;
            codeA = '•';
            codeB = '•';
        }
        else if (codeSelect == 10)
        {
            maxSize = 30 * customScaling;
            codeA = '»';
            codeB = '«';
        }

        var spectrum = fourier.analyze();

        //store average energy for the given frequencies.
        let bass = util.getEnergyRangeAVG(spectrum, 50, 92);
        let hi = util.getEnergyRangeAVG(spectrum, 5000, 8000);

        //Determines the size of the the ring in the middle of the visualisation.
        //Based on very high frequencies
        falloff = map(hi, 0, 200, 0, height);

        //Determines speed of the falling code based on the bass frequencies
        let speedOffset = map(bass, 0, 255, -9.5, -10, true);
        //let speedOffset = map(bass, 0, 255, -10.5, -10);
        speedy = speedOffset;

        //adapt y speed for high res displays using the scaling feaure
        //THis just makes the visuals look as expected.
        if (width > 3500)
        {
            speedy = speedOffset * customScaling;
        }


        //Copied code starts here
        let noiseOffsetX = frameCount * speedx;
        let noiseOffsetY = frameCount * speedy;

        for (let x = 0; x < width; x += steps)
        {
            for (let y = 0; y < height; y += steps)
            {
                let mult = 0.2;

                let d = dist(width / 2, height / 2, x, y);
                if (d < falloff)
                {
                    mult = map(d, 0, falloff, 1, 0.1);
                }
                let n = noise((x + noiseOffsetX) * speed, (y + noiseOffsetY) * speed);
                let sw = n * maxSize * mult;

                //Assign characters to print
                let c1 = codeA;
                let c2 = codeB;

                colorMode(HSB);

                //color select and size.
                textSize(sw * noiseValueAmplifier);
                if (n > 0.5)
                {
                    fill(modSlider03.value() / 100 * 360, 0, 100);
                    text(c1, x, y);
                } else
                {
                    fill(modSlider03.value() / 100 * 360, 100, 50);
                    text(c2, x, y);
                }

                colorMode(RGB);
            }
        }
    }
}