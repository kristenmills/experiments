$(document).ready(function(){
  //grid width and height
  var bw = 1200;
  var bh = 600;
  //padding around grid
  var p = 10;
  //size of canvas
  var cw = bw + (p*2) + 1;
  var ch = bh + (p*2) + 1;

  var canvas = $('canvas').attr({width: cw, height: ch});

  var context = canvas.get(0).getContext("2d");
  for (var x = 0; x <= bw; x += 20) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }


  for (var x = 0; x <= bh; x += 20) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "#ccc";
  context.stroke();
});
