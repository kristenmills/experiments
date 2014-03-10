var GOL = {
  rows: 30,
  columns: 60,
  cellsize: 20,

  canvas: null,
  context: null,
  cells: null,

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

  register: function(){
    this.canvas.addEventListener('click', this.handlers.click, false);
  },

  init: function(){
    this.drawGrid();
    this.populateCells();
    this.register();
  },

  handlers: {
    click: function(event){
      var x = event.offsetX;
      var y = event.offsetY;
      var column = Math.floor(x/GOL.cellsize);
      var row = Math.floor(y/GOL.cellsize);
      if(GOL.cells[row][column].alive){
        GOL.cells[row][column].age = 0;
        GOL.cells[row][column].alive = false;
        GOL.context.fillStyle = "#fff";
        GOL.context.fillRect(column*GOL.cellsize + 1, row*GOL.cellsize +1 , GOL.cellsize- 1, GOL.cellsize -1)
      }else{
        GOL.cells[row][column].age = 1;
        GOL.cells[row][column].alive = true;
        GOL.context.fillStyle = "#000";
        GOL.context.fillRect(column*GOL.cellsize + 1, row*GOL.cellsize + 1, GOL.cellsize -1 , GOL.cellsize - 1)
      }
    }
  }
}

function Cell(){
  this.maxage = 0;
  this.age = 0;
  this.alive = false;

  this.die = function() {
    this.age = 0;
    this.alive = false;
  };

  this.live = function() {
    this.age += 1;
    if(this.age > this.maxage){
      this.maxage = this.age;
    }
    this.alive = true;
  }

  this.reset = function() {
    this.maxage = 0;
    this.age = 0;
    this.alive = false;
  }
}

$(document).ready(function(){
  var width = GOL.columns*GOL.cellsize;
  var height = GOL.rows*GOL.cellsize
  GOL.canvas = $('canvas').attr({width: width + 1, height: height + 1}).get(0);
  GOL.context = GOL.canvas.getContext("2d");
  GOL.init();
});
