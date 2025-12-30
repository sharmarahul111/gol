class Cell {
  constructor(x, y, data) {
    this.x = x
    this.y = y
    this.alive = false
    this.data = data

  }
  get count() {
    let x = this.x
    let y = this.y

    let h = this.data.length
    let w = this.data[0].length
    let count = 0
    if (x > 0 && this.data[x - 1][y].alive) count++
    if (y > 0 && this.data[x][y - 1].alive) count++
    if (x < h - 1 && this.data[x + 1][y].alive) count++
    if (y < w - 1 && this.data[x][y + 1].alive) count++
    if (x > 0 && y > 0 && this.data[x - 1][y - 1].alive) count++
    if (x < h - 1 && y < w - 1 && this.data[x + 1][y + 1].alive) count++
    if (x > 0 && y < w - 1 && this.data[x - 1][y + 1].alive) count++
    if (x < h - 1 && y > 0 && this.data[x + 1][y - 1].alive) count++
    return count
  }

}

class Grid {
  //size is in pixels
  constructor(rows, cols, size) {
    this.data = []
    this.rows = rows
    this.cols = cols
    this.size = size
    // updateList is needed because altering alive status mid loop, alters the game of life rules
    this.updateList = []

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.data[i].push(new Cell(i, j, this.data))
      }
    }
  }
  updateCheck() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Rules for Conway's game of life
        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        let cell = this.data[i][j]
        if (cell.alive && (cell.count < 2 || cell.count > 3)) this.updateList.push(cell)
        else if (!cell.alive && (cell.count == 3)) this.updateList.push(cell)
      }
    }

  }

  update() {
    this.updateList.forEach(cell => cell.alive = !cell.alive)
    this.updateList = []
  }

  draw(c) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.data[i][j]

        c.beginPath()
        c.fillStyle = cell.alive ? "white" : "black"
        c.fillRect(cell.x * this.size, cell.y * this.size, this.size, this.size)
        if (GRID) {
          c.lineWidth = 1
          c.strokeStyle = "white"
          c.strokeRect(cell.x * this.size, cell.y * this.size, this.size, this.size)
        }
        if (DEBUG) {
          c.font = "9px Arial"
          c.fillStyle = "red"
          c.fillText(`${cell.x},${cell.y}`, cell.x * this.size, cell.y * this.size + this.size / 2)
        }
      }
    }

  }
}
