var Fractal = Fractal || {width: 900, height: 700};

Fractal.snowflake = {
  makeSnowflake: function(side, depth) {
    var head = {};
    var first = {};
    var second = {};
    head.x = (Fractal.width - side)/2.0;
    first.x = Fractal.width/2.0;
    second.x = (Fractal.width + side)/2.0;
    if(depth == 0){
      head.y = (Fractal.height - side * Math.sqrt(3) + side)/2.0;
      first.y = (Fractal.height + side)/2.0;
      second.y = (Fractal.height - side * Math.sqrt(3) + side)/2.0;
    }else {
      head.y = Fractal.height/2.0 + side*Math.sqrt(3)/3 - side*Math.sqrt(3)/2;
      first.y = Fractal.height/2.0 + side*Math.sqrt(3)/3;
      second.y = Fractal.height/2.0 + side*Math.sqrt(3)/3 - side*Math.sqrt(3)/2;
    }
    second.next = head;
    first.next = second;
    head.next = first;
    return head;
  },

	generate: function(line){
    var store = line.next;
    var l1 = {
      x: line.x + (store.x - line.x)/3,
      y: line.y + (store.y - line.y)/3,
    };

    var l3 = {
      x: line.x + 2*(store.x - line.x)/3,
      y: line.y + 2*(store.y - line.y)/3
    };

    var l2 = {
      x: 0.5 * (l3.x - l1.x) - Math.sqrt(3)/2 * (l3.y - l1.y) + l1.x,
      y: Math.sqrt(3)/2 * (l3.x-l1.x) + 0.5 * (l3.y-l1.y) + l1.y
    };

    l1.next = l2;
    l2.next = l3;
    l3.next = store;
    line.next = l1;
    return l3;
  },

  buildSnowflake: function( head, depth ){
    if(depth === 0){
      return;
    }
    var cur = head;
    do {
      cur = this.generate(cur);
      cur = cur.next;
    }while(cur !== head);

    head = cur;
    this.buildSnowflake(head, depth-1);
  },

  drawSnowflake: function(two, line){
    cur = line;
    do {
      two.makeLine(cur.x, Fractal.height - cur.y, cur.next.x, Fractal.height - cur.next.y);
      cur = cur.next;
    }while(cur !== line);
  },

  submit: function(event){
    event.preventDefault();
    two.clear();
    var depth = parseInt($('#koch-depth').attr('data-slider'));
    var side = parseInt($('#koch-side').attr('data-slider'));
    var snowflake = Fractal.snowflake.makeSnowflake(side, depth);
    Fractal.snowflake.buildSnowflake(snowflake, depth);
    Fractal.snowflake.drawSnowflake(two, snowflake);
    two.play();
  }
}