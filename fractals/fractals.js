var Fractal = {
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

    buildTree: function(depth, theta, tree){
      if(depth === 0){
        return tree;
      }
      generateNext(tree, theta);
      buildTree(depth-1, theta, tree->left);
      buildTree(depth-1, theta, tree->right);
      return tree;
    }
  }
};