// Main script file

const FOOD_SIZE_DEFAULT_IN_PX = 5;
const START_SNAKE_SIZE = 3;
let start;
class Snake {
  constructor(canvas) {
    this.snakeSize = START_SNAKE_SIZE;
    // this.snake = Arrays.fill();
    this.food = {
      new: true
    };
    this.direction = "L";
    this.foodSize = FOOD_SIZE_DEFAULT_IN_PX;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width || 500;
    this.height = this.canvas.height || 500;
    this.startGame();
  }

  placeFoodHelper() {
    this.food["position"] = {
      x: Math.trunc(Math.random() * this.width),
      y: Math.trunc(Math.random() * this.height)
    };
    this.food["eaten"] = false;
  }

  placeFoodInView() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.rect(
      this.food.position.x,
      this.food.position.y,
      this.foodSize,
      this.foodSize
    );
    this.context.fill();
  }

  placeSnakeInView() {}

  placeFoodIfNotAlready() {
    if (this.food.eaten || this.food.new) {
      this.placeFoodHelper();
    }
    this.food.new = false;
    this.placeFoodInView();
  }

  placeSnakeIfNotAlready() {
    this.placeSnakeInView();
  }

  progressGame() {
    this.placeFoodIfNotAlready();
    this.placeSnakeIfNotAlready();
  }

  startGame() {
    window.requestAnimationFrame(this.runEvery.bind(this, 500));
  }

  runEvery = (ms = 500, timestamp) => {
    // alert("A:" + timestamp, "B:" + ms);

    if (start === undefined) {
      start = timestamp;
    }

    let elapsed = timestamp - start;

    if (elapsed >= ms) {
      start = undefined;

      console.log(timestamp, ms, elapsed);
      this.progressGame();
    }

    // window.requestAnimationFrame(this.runEvery.bind(this, ms));
  };
}

class Arena {
  constructor(game) {
    new game(document.getElementById("snake-area"));
  }
}

new Arena(Snake);
