// NOTE: THE BASE OF THE FOLLOWING CODE IS NOT MINE

// By Roni Kaufman
// https://openprocessing.org/sketch/839385

function BlobVis()
{
  this.name = "Blob";


  let kMax;
  let step;
  let n = 80; // number of blobs
  let radius = 0; // diameter of the circle
  let inter = 0.1; // difference between the sizes of two blobs
  //let maxNoise = 500;
  let currentSens = modSlider01.value();


  let noiseProg = (x) => (x);

  this.setup = function ()
  {

    //colorMode(HSB, 1);
    angleMode(DEGREES);
    noFill();
    kMax = random(0.6, 1.0);
    step = 0.01;
    noStroke();
  }

  this.setup();

  this.draw = function ()
  {
    if (sliderDefaultResetFlag == true)
    {
      util.setSliders("Complexity", 0.01, true, "Blob Size", 0.5, true);
      sliderDefaultResetFlag = false;
    }


    if (currentSens != modSlider01.value())
    {
      kMax = 0.6 + modSlider01.value() / 50;
      currentSens = modSlider01.value();
    }
    //kMax = random(0.6, 1 + sensitivitySlider.value() * 5);
    //added code
    let sensCoeff = 1.5 + modSlider01.value() / 100 / 2;
    let spectrum = fourier.analyze();
    let bassEnergy = fourier.getEnergy("bass") * sensCoeff * 5 * (modSlider02.value() / 200 + 0.5);

    let midEnergy = fourier.getEnergy("lowMid") * sensCoeff * 5 * (modSlider02.value() / 200 + 0.5);
    let highEnergy = fourier.getEnergy("highMid") * sensCoeff * 7 * (modSlider02.value() / 200 + 0.5);


    //their code
    angleMode(DEGREES);
    push();
    blendMode(BLEND);
    background(0);
    blendMode(ADD);
    let t = frameCount / 100;
    for (let i = n; i > 0; i--)
    {
      let alpha = pow(1 - noiseProg(i / n), 3);
      let size = radius + i * inter;
      let k = kMax * sqrt(i / n);
      //let noisiness = maxNoise * noiseProg(i / n);


      let bassNoise = (bassEnergy * noiseProg(i / n));
      let midNoise = (midEnergy * noiseProg(i / n));
      let highNoise = (highEnergy * noiseProg(i / n));


      fill(255, 0, 0, alpha * 255);
      blob(size, width / 2, height / 2, k, t - i * step, bassNoise);

      fill(0, 255, 0, alpha * 255);
      blob(size, width / 2, height / 2, k, t - i * step + 1, midNoise);

      fill(0, 0, 255, alpha * 255);
      blob(size, width / 2, height / 2, k, t - i * step + 2, highNoise);
    }

    pop();
  }

  function blob(size, xCenter, yCenter, k, t, noisiness)
  {
    angleMode(DEGREES);
    beginShape();
    let angleStep = 360 / 12;
    for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep)
    {
      let r1, r2;

      r1 = cos(theta) + 1;
      r2 = sin(theta) + 1;
      let r = size + noise(k * r1, k * r2, t) * noisiness;
      let x = xCenter + r * cos(theta);
      let y = yCenter + r * sin(theta);
      curveVertex(x, y);
    }
    endShape();
  }


}