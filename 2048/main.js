$(window).ready(function(){
  var cw = $('.tile').width();
  console.log(cw);
  $('.tile').css({'height':cw+'px'});
});
