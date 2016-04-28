$("#button").click(function() {
  $('html, body').animate({
      scrollTop: $("#thirdCover").offset().top
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

// $(document).scroll(function() {
//   var y = $(this).scrollTop();
//   if (y > 500) {
//     $('.logo').slideDown('slow');
//   } else {
//     $('.logo').slideUp('slow');
//   }
// });
