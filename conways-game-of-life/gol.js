function createMatrix(rows, cols, val) {
  var m = new Array();
  for(var i = 0; i < rows; i++){
    m[i] = new Array();
    for(var j = 0; j < cols; j++){
      m[i][j] = val;
    }
  }
  return m;
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

function mod(m, n) {
  return ((m % n) + n) % n;
}

var GOL = {
  rows: 30,
  cols: 60,
  cellsize: 20,

  canvas: null,
  context: null,
  cells: null,

  oldest: {
    row: 0,
    column: 0,
    age: 0
  },

  gen: 1,

  drawGrid: function(){
    var width = this.cols*this.cellsize;
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

  populateCells: function(){
    this.cells = new Array();
    for(var i = 0; i < this.rows; i++){
      this.cells[i] = new Array();
      for(var j = 0; j < this.cols; j++){
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

  updateState: function() {
    var state = createMatrix(this.rows, this.cols, false);
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        var aliveNeighbors = this.neighbors(i,j);
        if(this.cells[i][j].alive){
          aliveNeighbors--;
          if(aliveNeighbors == 2 || aliveNeighbors == 3){
            state[i][j] = true;
          }
        } else {
          if(aliveNeighbors == 3){
            state[i][j] = true;
          }
        }
      }
    }

    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        if(state[i][j]){
          this.live(i,j);
        }else {
          this.die(i,j);
        }
      }
    }
  },

  live: function(row, col){
    this.cells[row][col].live();
    this.context.fillStyle = "#000";
    this.context.fillRect(col*this.cellsize + 1, row*this.cellsize + 1, this.cellsize -1 , this.cellsize - 1);
  },

  die: function(row, col){
    this.cells[row][col].die();
    this.context.fillStyle = "#fff";
    this.context.fillRect(col*this.cellsize + 1, row*this.cellsize +1 , this.cellsize- 1, this.cellsize -1);
  },

  neighbors: function(row, col) {
    var rows = [mod(row-1, this.rows), row, mod(row+1, this.rows)];
    var cols = [mod(col-1, this.cols), col, mod(col+1, this.cols)];
    var n = 0;
    for(var i = 0; i < 3; i++){
      var r = rows[i];
      for(var j = 0; j < 3; j++){
        var c = cols[j];
        if(this.cells[r][c].alive){
          n += 1;
        }
      }
    }
    return n;
  },

  handlers: {
    click: function(event){
      var x = event.offsetX;
      var y = event.offsetY;
      var col = Math.floor(x/GOL.cellsize);
      var row = Math.floor(y/GOL.cellsize);
      if(GOL.cells[row][col].alive){
        GOL.die(row, col);
      }else{
        GOL.live(row, col);
      }
    }
  }
}

$(document).ready(function(){
  var width = GOL.cols*GOL.cellsize;
  var height = GOL.rows*GOL.cellsize
  GOL.canvas = $('canvas').attr({width: width + 1, height: height + 1}).get(0);
  GOL.context = GOL.canvas.getContext("2d");
  GOL.init();
});
