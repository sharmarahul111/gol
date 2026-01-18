// patterns
function pattern(x, y, style) {
  let patterns = {
    // Oscillators
    blinker: [
      [x, y - 1],
      [x, y],
      [x, y + 1]
    ],

    toad: [
      [x - 1, y],
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1]
    ],

    beacon: [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 2],
      [x + 3, y + 2],
      [x + 2, y + 3],
      [x + 3, y + 3]
    ],

    // Still lifes
    block: [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1]
    ],

    beehive: [
      [x + 1, y],
      [x + 2, y],
      [x, y + 1],
      [x + 3, y + 1],
      [x + 1, y + 2],
      [x + 2, y + 2]
    ],

    // Spaceships
    glider: [
      [x + 1, y],
      [x + 2, y + 1],
      [x, y + 2],
      [x + 1, y + 2],
      [x + 2, y + 2]
    ],

    lwss: [ // Lightweight spaceship
      [x + 1, y],
      [x + 2, y],
      [x + 3, y],
      [x + 4, y],
      [x, y + 1],
      [x + 4, y + 1],
      [x + 4, y + 2],
      [x, y + 3],
      [x + 3, y + 3]
    ]
  };

  // return patterns[style]
  let p = patterns[style]
  // console.log(p)
  p.forEach(coord => {
    // console.log(coord)
    grid.data[coord[0]][coord[1]].alive = true
  })
}


