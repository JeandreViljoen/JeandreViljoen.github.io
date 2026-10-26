function Utilities()
{

    //Standard seconds, to 'minutes and seconds' conversion
    //Returns a string in the form of "XX : XX"
    this.toMinAndSec = function (_seconds)
    {
        let mPrefix = '';
        let sPrefix = '';
        let min = floor(_seconds / 60);
        let sec = floor(_seconds % 60);

        // adds '0' to single digits
        if (min < 10)
        {
            mPrefix = '0';
        }
        // adds '0' to single digits
        if (sec < 10)
        {
            sPrefix = '0';
        }

        return mPrefix + min + " : " + sPrefix + sec;
    };

    //takes an array of samples from the fourier.analyze() method
    //Returns the average value between any two given frequency ranges
    //ASSUMES a range greater than one index and positive values. Requires more data validation.
    this.getEnergyRangeAVG = function (_spectrumArray, _startRange, _endRange)
    {
        //set up frequency increments per array index
        const HEARING_RANGE = 20000 - 20;
        const FREQUENCY_INCREMENT = HEARING_RANGE / _spectrumArray.length;

        //find index range
        let startRangeIndex = floor(_startRange / FREQUENCY_INCREMENT);
        let endRangeIndex = floor(_endRange / FREQUENCY_INCREMENT);

        //standard median function
        let medianTotal = 0;

        for (let i = startRangeIndex; i < endRangeIndex; i++)
        {
            medianTotal += _spectrumArray[i];
        }

        let median = medianTotal / (endRangeIndex - startRangeIndex);
        //If any issues arise from the floor() function and the median function
        //Any values above 255 will be remapped to 255.
        let medianSafetyMapping = map(median, 0, 255, 0, 255, true);

        return medianSafetyMapping;

    };

    //Goes to next track in the songs Array
    //Depending on whether shuffle is toggled or not.
    this.goToNextTrack = function (_shuffleToggle)
    {
        let nextTrack = 0;
        if (_shuffleToggle)
        {
            do
            {
                //choose new random index
                nextTrack = floor(random(0, songsArray.length - 0.001));
            } while (nextTrack == songIndex) // so that same track cannot repeat

            controls.goToSongIndex(nextTrack);
        }
        else
        {
            controls.goToSongIndex(songIndex + 1);
        }
    };

    //Set slider properties based on given parameters
    this.setSliders = function (
        _sliderName1 = "Untitled",
        _sliderDefault1 = 0.5,
        _sliderActive1 = false,

        _sliderName2 = "Untitled",
        _sliderDefault2 = 0.5,
        _sliderActive2 = false,

        _sliderName3 = "Untitled",
        _sliderDefault3 = 0.5,
        _sliderActive3 = false)
    {

        //Updates slider titles
        modSlider01.title = _sliderName1;
        modSlider02.title = _sliderName2;
        modSlider03.title = _sliderName3;

        //Sets them to active or inactive
        modSlider01.active = _sliderActive1;
        modSlider02.active = _sliderActive2;
        modSlider03.active = _sliderActive3;

        //Assigns default value.
        if (_sliderActive1 == true)
        {
            modSlider01.currentValue = _sliderDefault1;
        }
        if (_sliderActive2 == true)
        {
            modSlider02.currentValue = _sliderDefault2;
        }
        if (_sliderActive3 == true)
        {
            modSlider03.currentValue = _sliderDefault3;
        }

    };

    //Returns a weighted average based on 5 frequency ranges.
    this.getAverage = function (_val1, _val2, _val3, _val4, _val5)
    {

        let sum = _val1 * 0.1 + _val2 * 0.1 + _val3 * 0.3 + _val4 * 0.3 + _val5 * 0.2;
        return sum;
    }

    //returns 5 avergaes of given frequency ranges and returns a weighted average.
    //This is to generate an overall and responsive energy reading of the song.
    this.getWeightedTotalEnergy = function (_spectrumArray)
    {
        let bandAVGsub = this.getEnergyRangeAVG(_spectrumArray, 20, 50);
        let bandAVGlow = this.getEnergyRangeAVG(_spectrumArray, 60, 110);
        let bandAVGmid = this.getEnergyRangeAVG(_spectrumArray, 150, 400);
        let bandAVGhigh = this.getEnergyRangeAVG(_spectrumArray, 1000, 5000);
        let bandAVGair = this.getEnergyRangeAVG(_spectrumArray, 7000, 11000);

        return this.getAverage(bandAVGsub, bandAVGlow, bandAVGmid, bandAVGhigh, bandAVGair);
    }


}