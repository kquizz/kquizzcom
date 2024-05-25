import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  connect() {
    this.myP5 = new window.p5((sketch) => {
      this.mySketch = new Sketch(sketch);
      sketch.setup = () => this.mySketch.setup();
      sketch.draw = () => this.mySketch.draw();
      sketch.windowResized = () => this.mySketch.windowResized();
      sketch.sketch = this.mySketch;
    }, this.element);
  }
  disconnect() {
    this.myP5.remove();
  }
}

class Sketch {
  constructor(sketch) {
    this.myText = null;
    this.x_max = 0;
    this.y_max = 0;
    this.sketch = sketch
  }

  setup() {
    this.x_max = this.sketch.windowWidth * .95;
    this.y_max = this.sketch.windowHeight * .7;

    this.sketch.createCanvas(this.x_max, this.y_max);

    let colorController = new ColorController(this.sketch,
      [[0, 19, 164],
      [0, 167, 142],
      [0, 100, 143],
      [46, 149, 114],
      [146, 102, 0],
      [143, 0, 29],
      [0, 167, 142]]);

    // Creates the text object, hich controls the location, phrase and color of text
    this.myText = new Text(this.sketch, 50, 50, 2, "kquizz", colorController);
  }

  windowResized() {
    this.sketch.resizeCanvas(this.x_max, this.y_max);
  }

  draw() {
    this.sketch.background(0);
    this.sketch.textSize(32);
    this.sketch.text(this.myText.text, this.myText.x, this.myText.y);

    this.myText.progress();
  }
}


class Text {
  constructor(sketch, x, y, vel, text, colorController) {
    this.sketch = sketch;
    this.x = x;
    this.y = y;
    this.x_vel = vel;
    this.y_vel = vel;
    this.text = text;
    this.colorController = colorController;
    this.colorController.setColor();
  }

  progress() {
    this.x = this.x + this.x_vel;
    this.y = this.y + this.y_vel;

    if (this.y >= this.sketch.height - 4 || this.y <= 24) {
      this.colorController.nextColor();
      this.y_vel = -1 * this.y_vel;
    }
    if (this.x >= this.sketch.width - 91 || this.x <= 0) {
      this.colorController.nextColor();
      this.x_vel = -1 * this.x_vel;
    }
  }
}

class ColorController {
  constructor(sketch, colorList) {
    this.functions = colorList.map(function (color) { return function () { sketch.fill(color[0], color[1], color[2]); } });
    this.counter = 0;
  }

  setColor() {
    this.functions[this.counter]();
  }
  nextColor() {
    this.incCounter();
    this.setColor();
  }

  incCounter() {
    this.counter = this.counter + 1
    if (this.counter >= this.functions.length) {
      this.counter = 0
    }
  }
}

// let myText;


// function setup() {

// }

// function draw() {

// }

// function windowResized() {
//   resizeCanvas(x_max, y_max);
// }