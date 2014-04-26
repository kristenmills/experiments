var Fractal = Fractal || {width: 900, height: 700};

$(document).ready(function(){
  var elem = $('.two-container')[0];
  two = new Two({ width: Fractal.width, height: Fractal.height}).appendTo(elem);
  $( "#tree-form" ).submit(Fractal.tree.submit);
  $( "#koch-form" ).submit(Fractal.snowflake.submit);
  $('#tabs').on('toggled', function (event, tab) {
    $(document).foundation('reflow');
  });
});