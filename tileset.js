class Tileset {
  constructor(
    imageSource,
    tileSize,
    tilesetColumns,
    tilesetRows,
    numTilesCanvas,
    canvasTileSize = width / numTilesCanvas,
    xZero = 0,
    yZero = 0
  ) {
    this.source = imageSource;
    this.originalTileSize = tileSize;
    this.numWid = tilesetColumns;
    this.numHei = tilesetRows;
    this.numTiles = numTilesCanvas;
    this.tileSize = canvasTileSize;
    this.xZero = xZero;
    this.yZero = yZero;
  }

  drawTile(n, x, y, size) {
    let { tileX, tileY } = this.tileNumToPos(n);
    image(
      this.source,
      x,
      y,
      size,
      size,
      tileX,
      tileY,
      this.originalTileSize,
      this.originalTileSize
    );
  }

  tileNumToPos(n) {
    return {
      tileX: (n % this.numWid) * this.originalTileSize,
      tileY: Math.floor(n / this.numWid) * this.originalTileSize,
    };
  }

  drawMap(tileMap) {
    for (let y = 0; y < tileMap.length; y++) {
      for (let x = 0; x < tileMap[y].length; x++) {
        this.drawTile(
          tileMap[y][x],
          x * this.tileSize + this.xZero,
          y * this.tileSize + this.yZero,
          this.tileSize
        );
      }
    }
  }
}
