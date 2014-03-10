var GOL = {
  rows: 30,
  columns: 60,
  cellsize: 20,

  canvas: null,
  context: null,
  cells: null,

  // The function that draws the grid
  drawGrid: function(){
    var width = this.columns*this.cellsize;
    var height = this.rows*this.cellsize
    for(var i = 0; i <= width; i += this.cellsize){
      this.context.moveTo(0.5 + i, 0);
      this.context.lineTo(0.5 + i, height);
    }

    for(var i = 0; i <= height; i += this.cellsize){
      this.context.moveTo(0, 0.5 + i);
      this.context.lineTo(width, 0.5 +i);
    }

    this.context.strokeStyle = "#ccc";
    this.context.stroke();
  },

  // Initially populate the cells
  populateCells: function(){
    this.cells = new Array();
    for(var i = 0; i < this.rows; i++){
      this.cells[i] = new Array();
      for(var j = 0; j < this.columns; j++){
        this.cells[i][j] = new Cell();
      }
    }
  },

  // Initialize a game
  init: function() {
    this.drawGrid();
    this.populateCells();
  }
}

function Cell(){
  this.age = 0;
  this.alive = false;
}

$(document).ready(function(){
  var width = GOL.columns*GOL.cellsize;
  var height = GOL.rows*GOL.cellsize
  GOL.canvas = $('canvas').attr({width: width + 1, height: height + 1});
  GOL.context = GOL.canvas.get(0).getContext("2d");
  GOL.init();
});
