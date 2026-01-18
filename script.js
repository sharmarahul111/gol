// Author: Pramendra Sharma
//
// Notes for the readers:
// 1. I bellieve the x,y is actually y,x due to rows, cols order
// 2. The neighbour count function is very bad, needs an update I know
//
//
// TODO: Grid size control
// TODO: Mousedown and tap and hold support
// TODO: Add more controls and info panel (generation, population, etc)
// TODO: Polish the UI a bit more
// TODO: Add a way to add presets like oscillator, glider, etc
// TODO: Modularize the code more
// TODO: Refactor the code
// TODO: Add code comments in places where needed
//
// FIXME: Canvas alignment
// FIXME: Canvas resize

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight - 120;

// Game control variables
let ON = false
let GRID = true
let DEBUG = false
let SPEED = 1

let currentSpeed = 0

let size = 30
let cols = Math.floor(canvas.height / size)
let rows = Math.floor(canvas.width / size)
let grid = new Grid(rows, cols, size)

function animate() {
  // the > condition is for edge cases where currentSpeed becomes greater when changing speed
  if (currentSpeed >= SPEED) {
    c.fillStyle = "rgba(40,40,40,1)"
    c.fillRect(0, 0, innerWidth, innerHeight)

    grid.draw(c)
    grid.updateCheck()
    grid.update()
    currentSpeed = 0

  } else {
    currentSpeed++
  }

  if (ON) requestAnimationFrame(animate)
  // requestAnimationFrame(animate)
}

// addEventListener('resize', () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

// helper functions

function alive(x, y) {
  grid.data[x][y].alive = true
}
function randInt(x) {
  return Math.floor(Math.random() * x)
}
function randomAlive() {
  alive(randInt(grid.rows), randInt(grid.cols))
}
function update() {
  grid.updateCheck()
  grid.update()
}

function getAlive() {
  let cells = []
  grid.data.forEach(row => {
    row.forEach(col => {
      if (col.alive) cells.push(col)
    })
  })
  return cells
}


canvas.addEventListener('click', e => {
  let box = canvas.getBoundingClientRect()
  let x = Math.floor((e.clientX - box.top) / size)
  let y = Math.floor((e.clientY - box.left) / size)
  if (grid.data[x] && grid.data[x][y]) {
    grid.data[x][y].alive = !grid.data[x][y].alive
  }
  grid.draw(c)
})
let playPauseBtn = document.querySelector("button#playPause")
let clearBtn = document.querySelector("button#clear")
let speedSlider = document.querySelector("input#speed")
playPauseBtn.addEventListener("click", () => {
  if (ON) {
    ON = false
    playPauseBtn.innerHTML = "RESUME"
  } else {
    ON = true
    playPauseBtn.innerHTML = "PAUSE"
    animate()
  }
})
clearBtn.addEventListener("click", () => {
  grid.data.forEach(row => {
    row.forEach(col => {
      col.alive = false
    })
  })
  grid.draw(c)

})
speedSlider.addEventListener("change", () => {
  if (speedSlider.value >= 1 && speedSlider.value <= 20) {
    SPEED = speedSlider.value
    document.querySelector("span.speed>label").innerHTML = "SPEED: " + SPEED.toString().padStart(2, "0")
  }
})

// starting the Game
c.fillStyle = "rgba(40,40,40,1)"
c.fillRect(0, 0, innerWidth, innerHeight)
grid.draw(c)

