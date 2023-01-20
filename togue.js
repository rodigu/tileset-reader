class Togue{
  constructor() {
    this.t
    this.sampleMap = [
      [0, 1, 1, 3],
      [16, 17, 20, 19],
      [16, 12, 17, 19],
      [32, 66, 67, 35]
    ]
  
    this.currentTile = 0;
  
    this.mapGenerated = new Array(10).fill(17).map(()=>new Array(10).fill(17));
    this.showFullTileset = false
  }

  setup() {
    let minDimension = Math.min(windowHeight, windowWidth)
    createCanvas(minDimension, minDimension)
    this.t = new Tileset(loadImage('assets/colored_tilemap_packed.png'), 8, 16, 10, 10)
    noSmooth()
  }

  updateMap() {
    let x = Math.floor((mouseX / width) * 10)
    let y = Math.floor((mouseY / width) * 10)
    this.mapGenerated[y][x] = this.currentTile
  }

  saveMap() {
    console.log(this.mapGenerated)
    download(JSON.stringify(this.mapGenerated), 'new_map.json', 'json')
  }

  /**
   * https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
   * @param {string} data - Data to be written to file
   * @param {string} filename - Name of the file
   * @param {string} type - File type
   */
  download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }

  keyPressed() {
    if (keyCode === LEFT_ARROW) {
      this.currentTile -= 1
    }
    else if (keyCode === RIGHT_ARROW) {
      this.currentTile += 1
    }
    if (keyCode === UP_ARROW) {
      this.currentTile -= 16
    }
    else if (keyCode === DOWN_ARROW) {
      this.currentTile += 16
    }
  }

  keyTyped() {
    if (key === 'a')
      this.showFullTileset = !this.showFullTileset
    else if (key === 's')
      this.download(JSON.stringify(this.mapGenerated), 'new_map.json', 'json')

  }

  selectTile() {
    
  }

  drawTileSelection() {
    let tWid = width / this.t.numWid
    let tHei = height / this.t.numHei
    let tileX = this.currentTile % this.t.numWid * tWid
    let tileY = Math.floor(this.currentTile / this.t.numWid) * tHei

    if (mouseIsPressed) {
      const tilesetX = Math.floor(mouseX / (width / this.t.numWid))
      const tilesetY = Math.floor(mouseY / (height / this.t.numHei))
      this.currentTile = tilesetY * this.t.numWid + tilesetX
    }
    push()
    image(this.t.source, 0, 0, width, height)
    fill(200,0,0,50)
    stroke('red')
    strokeWeight(5)
    rect(tileX, tileY, tWid, tHei)
    pop()
  }

  draw() {
    background(0)
    if (mouseIsPressed && !this.showFullTileset)
      this.updateMap()
      
    this.t.drawMap(this.mapGenerated)
    
    if (!this.showFullTileset)  
      this.t.drawTile(this.currentTile, mouseX, mouseY, 50)
    
    if (this.showFullTileset) {
      this.drawTileSelection()
    }

    
  }
}