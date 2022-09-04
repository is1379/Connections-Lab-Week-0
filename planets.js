//sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune

let setupPlanets = true
let firstLoad = true

let w,h, minDimension, oldW, oldH //canvas size variables
let sunDiameter //diameter for the sun
let space //space between planets

let earthDaysRotation //keeps track of one "earth day" to peg the rotations of all of the other planets

let rotations = {
  "mercury": 0,
  "venus": 0,
  "earth": 0,
  "mars": 0,
  "jupiter": 0,
  "saturn": 0,
  "uranus": 0,
  "neptune":0
} //an object to keep track of the planet's rotations (position on the screen)

let diameters = {
  "sun": 0,
  "mercury": 0,
  "venus": 0,
  "earth": 0,
  "mars": 0,
  "jupiter": 0,
  "saturn": 0,
  "uranus": 0,
  "neptune":0
} //an object to keep track of the planet's diameters (size)

let xDists = {
  "mercury": 0,
  "venus": 0,
  "earth": 0,
  "mars": 0,
  "jupiter": 0,
  "saturn": 0,
  "uranus": 0,
  "neptune":0
} //an object to keep track of the start point for mapping the planets

let miniPlanets = [] //an array to hold the information about the sub planets

function setup() {
  //This all gets run inside the draw() function to resize as the window size scales.
  w = windowWidth //sets width variable
  h = windowHeight //sets height variable
  
  if (firstLoad) {
    oldW = w
    oldH = h
    firstLoad = false
  }
  
  earthDaysRotation = 2*PI/365 //sets 1 earth day (365)
  
  minDimension = Math.min(w,h) //gets the minimum dimension so the drawing will always fit to the screen without going off the canvas.
  if (minDimension < 300) {
    minDimension = 300
    //makes sure the max size of the drawing is 300x300
  }
  
  space = minDimension/55//sets the space between orbits
  
  let earth = minDimension/31 //earth's size
  
  diameters.sun = earth*4 //sun's size
  diameters.mercury = earth*0.4 //mercury's size
  diameters.venus = earth*0.95 //venus's size
  diameters.earth = earth //earth's size
  diameters.mars = earth*0.5 //mars's size
  diameters.jupiter = earth * 2 //jupiter's size
  diameters.saturn = earth * 1.9 //saturn's size
  diameters.uranus = diameters.jupiter * 0.4 //uranus's size
  diameters.neptune = diameters.jupiter * 0.4 //neptune's size
  
  xDists.mercury = diameters.sun/2 + diameters.mercury/2 + space //mercury x value
  xDists.venus = xDists.mercury + diameters.mercury/2 + diameters.venus/2 + space //venus x value
  xDists.earth = xDists.venus + diameters.venus/2 + diameters.earth/2 + space //earth x value
  xDists.mars = xDists.earth + diameters.earth/2 + diameters.mars/2 + space //mars x value
  xDists.jupiter = xDists.mars + diameters.mars/2 + diameters.jupiter/2 + space //jupiter x value
  xDists.saturn = xDists.jupiter + diameters.jupiter/2 + diameters.saturn/2 + space //saturn x value
  xDists.uranus = xDists.saturn + diameters.saturn/2 + diameters.uranus/2 + space //uranus x value
  xDists.neptune = xDists.uranus + diameters.uranus/2 + diameters.neptune/2 + space //neptune x value
  
  if (oldH !== h || oldW !== w) {
    //sees if the canvas has changed size to remap the planets
    setupPlanets = true
    oldH = h
    oldW = w
  }
  
  if (setupPlanets) { //makes sure this only runs once
    miniPlanets = []
    generateMiniPlanets() //makes the extra floating planets
  }
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  setup()
  background(0); //sets background to black
  noStroke() //removes borders
  translate(windowWidth/2, windowHeight/2) //moves center to center of the canvas
  buildPlanets() //creates the planets
  buildRings() //creates the orbits
  addMiniPlanets() //creates the mini planets
}

function getValue (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) //gets a random integer between a min and max (including the min and max value)
}

function getSpeed () {
  return Math.random() / 100
  //sets a random speed for the mini planets
}

function buildPlanets () { //adds all the main planets
  buildSun()
  buildMercury()
  buildVenus()
  buildEarth()
  buildMars()
  buildJupiter()
  buildSaturn()
  buildUranus()
  buildNeptune()
}

function buildSun () {
  fill("#FFC62D")
  circle(0,0, diameters.sun)
}

//all the build[PlanetName] functions work the same so I'll only write up this one. Basically push to isolate the planet so it can have its own rotation. Rotate to the current position. Draws using the values set in setup(). Then the rotation increases by the planet's speed relative to earth.

function buildMercury () {
  push()
    rotate(rotations.mercury)
    fill("#E5CE9B")
    circle(xDists.mercury,0, diameters.mercury)
  pop()
  rotations.mercury+=earthDaysRotation*365/88
}

function buildVenus () {
  push()
    rotate(rotations.venus)
    fill("#FFB8A6")
    circle(xDists.venus,0, diameters.venus)
  pop()
  rotations.venus+=earthDaysRotation*365/225
}

function buildEarth () {
  push()
    rotate(rotations.earth)
    fill("#74BFD2")
    circle(xDists.earth,0, diameters.earth)
  pop()
  rotations.earth+=earthDaysRotation
}

function buildMars () {
  push()
    rotate(rotations.mars)
    fill("#FF7D4A")
    circle(xDists.mars,0, diameters.mars)
  pop()
  rotations.mars+=earthDaysRotation*365/687
}

function buildJupiter () {
  push()
    rotate(rotations.jupiter)
    fill("#FFA99E")
    circle(xDists.jupiter,0, diameters.jupiter)
  pop()
  rotations.jupiter+=earthDaysRotation*1/12
}

function buildSaturn () {
  push()
    rotate(rotations.saturn)
    fill("#FAD483")
    circle(xDists.saturn,0, diameters.saturn)
  pop()
  rotations.saturn+=earthDaysRotation*1/29
}

function buildUranus () {
  push()
    rotate(rotations.uranus)
    fill("#92E8F3")
    circle(xDists.uranus,0, diameters.uranus)
  pop()
  rotations.uranus+=earthDaysRotation*1/84
}

function buildNeptune () {
  push()
    rotate(rotations.neptune)
    fill("#84BBD9")
    circle(xDists.neptune,0, diameters.neptune)
  pop()
  rotations.neptune+=earthDaysRotation*1/165
}

function buildRings () { //builds the orbit rings
  buildMercuryRing()
  buildVenusRing()
  buildEarthRing()
  buildMarsRing()
  buildJupiterRing()
  buildSaturnRing()
  buildUranusRing()
  buildNeptuneRing()
}

//like the build[PlanetName] functions, all of the build[PlanetRing] functions work the same. The main difference is the ring itself is a stroke (border) not a fill. They are set so the outside of the circle intersects with the middle of the planet, then the stroke weight is the same as the planet diameter.

function buildMercuryRing () {
  noFill()
  stroke(229,206,155,45);
  strokeWeight(diameters.mercury)
  circle(0, 0, 2 * xDists.mercury);
}

function buildVenusRing () {
  noFill()
  stroke(255,184,166,45);
  strokeWeight(diameters.venus)
  circle(0, 0, 2 * xDists.venus);
}

function buildEarthRing () {
  noFill()
  stroke(116,191,210,45);
  strokeWeight(diameters.earth)
  circle(0, 0, 2 * xDists.earth);
}

function buildMarsRing () {
  noFill()
  stroke(255, 125, 74,45);
  strokeWeight(diameters.mars)
  circle(0, 0, 2 * xDists.mars);
}

function buildJupiterRing () {
  noFill()
  stroke(255, 169, 158,45);
  strokeWeight(diameters.jupiter)
  circle(0, 0, 2 * xDists.jupiter);
}

function buildSaturnRing () {
  noFill()
  stroke(250, 212, 131,45);
  strokeWeight(diameters.saturn)
  circle(0, 0, 2 * xDists.saturn);
}

function buildUranusRing () {
  noFill()
  stroke(146, 232, 243,45);
  strokeWeight(diameters.uranus)
  circle(0, 0, 2 * xDists.uranus);
}

function buildNeptuneRing () {
  noFill()
  stroke(132, 187, 217,45);
  strokeWeight(diameters.neptune)
  circle(0, 0, 2 * xDists.neptune);
}

//using a loop to make 720 mini planets. They are set in order. 

function generateMiniPlanets () {
  setupPlanets = false
  var i
  for (i = 0; i < 720; i++) {
    let minX
    let maxX
    let rotation
    let size
    let speed
    let color1
    let color2
    let color3
    let y = 0
    if (i < 20) {
      minX = xDists.mercury - diameters.mercury/8 //sets the minimum extra planet size
      maxX = xDists.mercury + diameters.mercury/4 //sets the max extra planet size
      size = getValue(diameters.mercury/6*0.6,diameters.mercury/6 * 2.5) //use out getValue() function to get an integer value for the planet size between our min value and our max
      rotation = random(2*PI)
      //sets a random starting point for each planet
      speed = getSpeed()
      //uses the getSpeed() function to set a random speed for the planet
      color1 = 229
      color2 = 206
      color3 = 155
      //same color values as the planet
    } else if (i < 60) {
      minX = xDists.venus - diameters.venus/4
      maxX = xDists.venus + diameters.venus/4
      size = getValue(diameters.venus/6*0.6,diameters.venus/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 255
      color2 = 184
      color3 = 166
    } else if (i < 120) {
      minX = xDists.earth - diameters.earth/4
      maxX = xDists.earth + diameters.earth/4
      size = getValue(diameters.earth/6*0.6,diameters.earth/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 116
      color2 = 191
      color3 = 210
    } else if (i < 200) {
      minX = xDists.mars - diameters.mars/4
      maxX = xDists.mars + diameters.mars/4
      size = getValue(diameters.mars/6*0.6,diameters.mars/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 255
      color2 = 125
      color3 = 74
    } else if (i < 320) {
      minX = xDists.jupiter - diameters.jupiter/4
      maxX = xDists.jupiter + diameters.jupiter/4
      size = getValue(diameters.jupiter/6*0.6,diameters.jupiter/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 255
      color2 = 169
      color3 = 158
    } else if (i < 460) {
      minX = xDists.saturn - diameters.saturn/4
      maxX = xDists.saturn + diameters.saturn/4
      size = getValue(diameters.saturn/6*0.6,diameters.saturn/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 250
      color2 = 212
      color3 = 131
    } else if (i < 600) {
      minX = xDists.uranus - diameters.uranus/4
      maxX = xDists.uranus + diameters.uranus/4
      size = getValue(diameters.uranus/6*0.6,diameters.uranus/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 146 
      color2 = 232
      color3 = 243
    } else {
      minX = xDists.neptune - diameters.neptune/4
      maxX = xDists.neptune + diameters.neptune/4
      size = getValue(diameters.neptune/6*0.6,diameters.neptune/6 * 2.5)
      rotation = random(2*PI)
      speed = getSpeed()
      color1 = 132
      color2 = 187
      color3 = 217
    }
    
    //builds an object with all of the values and pushes them into the miniPlanets array
    miniPlanets.push({
      "color1": color1,
      "color2": color2,
      "color3": color3,
      "x": getValue(minX, maxX),
      "y": y,
      "size": size,
      "rotation": rotation,
      "speed": speed
    })
  }
}

function addMiniPlanets () {
  //uses a loop to draw all of the planets
  var i
  for (i = 0; i < miniPlanets.length; i++) {
    //selects the current planet
    let planet = miniPlanets[i]
    //uses push() pop() to isolate the rotation for each planet
    push()
      noStroke()
      //uses the planet data to build the planet
      fill(planet.color1, planet.color2, planet.color3, 100)
      rotate(planet.rotation)
      circle(planet.x,planet.y,planet.size)
    pop()
    //increases the planets rotation by the rotation speed
    planet.rotation+=planet.speed
  }
}





