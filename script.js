let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Cell {
  constructor(x, y, data) {
    this.x = x
    this.y = y
    this.alive = false
    this.data = data

  }
  get count() {
    let edgeCount = this.data[i][j - 1].alive + this.data[i][j + 1].alive + this.data[i - 1][j].alive + this.data[i + 1][j].alive
    let cornerCount = this.data[i - 1][j - 1].alive + this.data[i - 1][j + 1].alive + this.data[i + 1][j - 1] + this.data[i + 1][j + 1].alive
    return edgeCount + cornerCount
  }
}

class Grid {
  //size is in pixels
  constructor(rows, cols, size) {
    this.data = []
    this.rows = rows
    this.cols = cols
    this.size = size

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i].push(new Cell(i, j, this.data))
      }
    }
  }
}

let grid = new Grid(20, 20, 20)

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
