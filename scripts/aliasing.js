var sliderSamplingFrequency;

const timeRangeMax = 10;
const timeRangeMin = 0;
const dt = 0.001;

const signalFrequency = 1;

function setup() {
    createCanvas(400, 400);
    frameRate(1);

    sliderSamplingFrequency = createSlider(0.1, 10, 1, 0);
}

function draw() {
    background(255);

    stroke(0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var t = timeRangeMin; t <= timeRangeMax; t += dt) {
        var val = cos(t * signalFrequency * TWO_PI);

        const x = map(t, timeRangeMin, timeRangeMax, 0, width);
        const y = height/2 + map(val, -1, 1, height/4, -height/4);
        vertex(x, y);
    }
    endShape();

    var dtSampling = 1 / sliderSamplingFrequency.value();
    var sampledSignal = [];
    stroke(255, 0, 0);
    strokeWeight(8);
    noFill();
    beginShape(POINTS);
    for (var t = timeRangeMin; t <= timeRangeMax; t += dtSampling) {
        var val = cos(t * signalFrequency * TWO_PI);
        sampledSignal.push(val);

        const x = map(t, timeRangeMin, timeRangeMax, 0, width);
        const y = height/2 + map(val, -1, 1, height/4, -height/4);
        vertex(x, y);
    }
    endShape();

    [realDFT, imagDFT] = fourier.dft(sampledSignal, Array(sampledSignal.length).fill(0));
    console.log(realDFT);
}