var GOL = {
  width: 1200,
  height: 600,
  cellsize: 20,

  canvas: null,
  context: null,

  // The function that draws the grid
  drawGrid: function(){
    for(var x = 0; x <= this.width; x += this.cellsize){
      this.context.moveTo(0.5 + x, 0);
      this.context.lineTo(0.5 + x, this.height);
    }

    for(var x = 0; x <= this.height; x += this.cellsize){
      this.context.moveTo(0, 0.5 + x);
      this.context.lineTo(this.width, 0.5 +x);
    }

    this.context.strokeStyle = "#ccc";
    this.context.stroke();
  }

}

$(document).ready(function(){
  GOL.canvas = $('canvas').attr({width: GOL.width + 1, height: GOL.height + 1});
  GOL.context = GOL.canvas.get(0).getContext("2d");
  GOL.drawGrid();
});
