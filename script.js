let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y

  }
}

class Grid {
  constructor(rows, cols, size) {
    this.data = []

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,1)"
  c.fillRect(0, 0, innerWidth, innerHeight);

}
animate();

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
