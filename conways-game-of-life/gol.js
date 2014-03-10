var GOL = {
  rows: 30,
  columns: 60,
  cellsize: 20,

  canvas: null,
  context: null,
  cells: null,

  init: {
    drawGrid: function(){
      var width = GOL.columns*GOL.cellsize;
      var height = GOL.rows*GOL.cellsize
      for(var i = 0; i <= width; i += GOL.cellsize){
        GOL.context.moveTo(0.5 + i, 0);
        GOL.context.lineTo(0.5 + i, height);
      }

      for(var i = 0; i <= height; i += GOL.cellsize){
        GOL.context.moveTo(0, 0.5 + i);
        GOL.context.lineTo(width, 0.5 +i);
      }

      GOL.context.strokeStyle = "#ccc";
      GOL.context.stroke();
    },

    // Initially populate the cells
    populateCells: function(){
      GOL.cells = new Array();
      for(var i = 0; i < GOL.rows; i++){
        GOL.cells[i] = new Array();
        for(var j = 0; j < GOL.columns; j++){
          GOL.cells[i][j] = new Cell();
        }
      }
    },

    register: function(){
      GOL.canvas.addEventListener('click', GOL.handlers.click, false);
    },

    setup: function(){
      this.drawGrid();
      this.populateCells();
      this.register();
    }
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
  this.age = 0;
  this.alive = false;
}

$(document).ready(function(){
  var width = GOL.columns*GOL.cellsize;
  var height = GOL.rows*GOL.cellsize
  GOL.canvas = $('canvas').attr({width: width + 1, height: height + 1}).get(0);
  GOL.context = GOL.canvas.getContext("2d");
  GOL.init.setup();
});
