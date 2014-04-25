
var Fractal = {
  size: 900,
  tree: {

    generateNext: function(tree, theta) {
      var side = tree.side/1.5;
      var posAngle = tree.angle + theta;
      var negAngle = tree.angle - theta;

      var rx = tree.x + side*Math.sin(posAngle);
      var ry = tree.y + side*Math.cos(posAngle);

      var lx = tree.x + side*Math.sin(negAngle);
      var ly = tree.y + side*Math.cos(negAngle);

      tree.left = {
        x: lx,
        y: ly,
        side: side,
        angle: negAngle,
        left: null,
        right: null
      };

      tree.right = {
        x: rx,
        y: ry,
        side: side,
        angle: posAngle,
        left: null,
        right: null
      }
    },

    buildTree: function(depth, theta, tree) {
      if(depth === 0){
        return tree;
      }
      this.generateNext(tree, theta);
      this.buildTree(depth-1, theta, tree.left);
      this.buildTree(depth-1, theta, tree.right);
      return tree;
    },

    drawTree: function(two, tree){
      
      if(tree.left === null){
        return;
      }
      var line1 = two.makeLine(Fractal.size - tree.x, Fractal.size - tree.y, Fractal.size - tree.left.x, Fractal.size - tree.left.y);
      var line2 = two.makeLine(Fractal.size - tree.x, Fractal.size - tree.y, Fractal.size - tree.right.x, Fractal.size - tree.right.y);
      console.log(Fractal.size - tree.x);
      console.log(line2);
      this.drawTree(two, tree.left);
      this.drawTree(two, tree.right);
    }
  }
};


$(document).ready(function(){
  var elem = document.getElementById('fractal-canvas').children[0];
  var two = new Two({ width: Fractal.size, height: Fractal.size, type: Two.Types.webgl}).appendTo(elem);
  var tree = Fractal.tree.buildTree(8, 65*Math.PI/180, {x: Fractal.size/2, y: 300, side:300, angle: 0, left: null, right: null} );

  var line = two.makeLine(Fractal.size/2, Fractal.size, Fractal.size/2, Fractal.size-300);
  Fractal.tree.drawTree(two, tree);
  two.update();

});