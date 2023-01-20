export class Tileset {
  source: any
  tileSize: number
  numWid: number
  numTiles: number

  constructor(imageSource:any, tileSize:number, numTilesHorizontal:number, numCanvasTiles:number) {
    this.source = imageSource
    this.tileSize = tileSize
    this.numWid = numTilesHorizontal
  }

  drawTile(n:number, x:number, y:number, size:number, image:Function) {
    let tileX = (n % this.numWid) * this.tileSize
    let tileY = Math.floor(n / this.numWid) * this.tileSize
    image(this.source, x, y, size, size, tileX, tileY, this.tileSize, this.tileSize)
  }
}