
function SpectrumNew()
{
	let hueShift = 0;
	let brightnessShift = 255;

	let strokeSpacing = 0;

	const FOURIER_SAMPLE_AMOUNT = 1024;
	let logarithmicSpacing = [];

	//Remap sample positions to be more accurate.
	for (var i = 0; i < FOURIER_SAMPLE_AMOUNT; i++)
	{
		logarithmicSpacing.push(Math.log2(i));
	}

	this.name = "EQ Spectrum";

	this.draw = function ()
	{
		//Initialise and reset modifier sliders to default value.
		if (sliderDefaultResetFlag == true)
		{
			util.setSliders("Outline Width", 0.2, true, "Outline Color ", 0.4, true, "Fill Color", 0.45, true);
			sliderDefaultResetFlag = false;
		}

		push();
		//smooth(1);
		var spectrum = fourier.analyze();

		noStroke();

		blendMode(BLEND);
		colorMode(HSB);

		//Draw 2 spectrums to create the outline effect
		for (let j = 0; j < 2; j++)
		{

			beginShape();

			//Loop through each spectrum sample.
			for (var i = 0; i < spectrum.length; i++)
			{

				//Get positional elements
				let x = map(logarithmicSpacing[i], 0, 10, 0, width);
				let y = map(spectrum[i], 0, 255, height, 0);

				strokeSpacing = map(util.getEnergyRangeAVG(spectrum, 25, 70), 0, 255, 0, 10 + 100 * modSlider01.value() / 100 * 4);

				//adapt height data for the 2nd spectrum.
				curveVertex(x, y + strokeSpacing * j);


				//Color values for first(outer) spectrum
				if (j == 0)
				{
					hueShift = map(modSlider02.value(), 0, 100, 0, 360);
					brightnessShift = 255;
					fill(hueShift, 255, brightnessShift);
				}
				//Color values for second (inner) spectrum
				else
				{
					hueShift = map(modSlider03.value(), 0, 100, 0, 360);
					brightnessShift = map(util.getEnergyRangeAVG(spectrum, 50, 12000), 100, 255, 0, 255);
					fill(360 - hueShift, 255, brightnessShift);
				}

				// MOUSE INTERACTIVITY
				// if (j == 0)
				// {
				// 	hueShift = map(mouseX, 0, width, 0, 360);
				// 	brightnessShift = map(mouseY, height - height / 4, 0, 0, 255);
				// 	fill(hueShift, 255, brightnessShift);
				// }
				// else
				// {
				// 	hueShift = map(mouseX, 0, width, 0, 360);
				// 	brightnessShift = map(mouseY, height, 0 + height / 4, 0, 255);
				// 	fill(360 - hueShift, 255, 255 - brightnessShift);
				// }

			}
			//Vertex to close up the shape
			curveVertex(width, height);
			curveVertex(width / 2, height * 2);
			curveVertex(0, height);
			curveVertex(0, height / 2);

			endShape();

		}
		pop();
	};


}


