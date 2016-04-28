$("#button").click(function() {
  $('html, body').animate({
      scrollTop: $("#secondCover").offset().top
  }, 1500);
});  

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 300) {
    $('.headshot').slideDown('slow');
  } else {
    $('.headshot').slideUp('slow');
  }
});