var Fractal = Fractal || {width: 900, height: 700};

Fractal.tree =  {

  generate: function(tree, theta) {
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
      angle: negAngle
    };

    tree.right = {
      x: rx,
      y: ry,
      side: side,
      angle: posAngle
    }
  },

  buildTree: function(depth, theta, tree) {
    if(depth === 0){
      return;
    }
    this.generate(tree, theta);
    this.drawTree(two, tree);
    this.buildTree(depth-1, theta, tree.left);
    this.buildTree(depth-1, theta, tree.right);
  },

  drawTree: function(two, tree){
    two.makeLine(tree.x, Fractal.height - tree.y, tree.left.x, Fractal.height - tree.left.y);
    two.makeLine(tree.x, Fractal.height - tree.y, tree.right.x, Fractal.height - tree.right.y);
  },

  submit: function(event){
    event.preventDefault();
    two.clear();
    var theta = parseInt($('#tree-theta').attr('data-slider'));
    var depth = parseInt($('#tree-depth').attr('data-slider'));
    var side = parseInt($('#tree-side').attr('data-slider'));
    two.makeLine(Fractal.width/2, Fractal.height, Fractal.width/2, Fractal.height-side);
    Fractal.tree.buildTree(depth, theta*Math.PI/180, {x: Fractal.width/2, y: side, side:side, angle: 0, left: null, right: null} );
    two.play();
  }

}