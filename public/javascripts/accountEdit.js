$( document ).ready(function() {
  var photo = $('#photoDisplay')[0]
  var photoRecall = photo.src;
  var nameRecall = $('#aliasDisplay').text();
  var validated = false;


  $('#aliasInput').on('keyup', function(e){
     $('#aliasDisplay').text(`${e.target.value}`)
  })
  $('#reset').on('click', function(e){
    e.preventDefault();
    $('#aliasInput')[0].value = nameRecall;
    $('#photoInput')[0].value = photoRecall;
  })

  $('#accountUpdate').on('submit', function(e, verified){
    if (!validated){
      e.preventDefault();
      if ($('#passwordInput')[0].value.length < 6){
        alert("Your password must be 6 characters or more.")
      }
      else if ($('#aliasInput')[0].value === ""){
        setTimeout(function(){
            $('#submit').click();
            console.log('alias')
        }, 50);
        $('#aliasInput')[0].value = nameRecall;

      }
      else if ($('#photoInput')[0].value === ""){
        setTimeout(function(){
            $('#submit').click();
            console.log('photo')
        }, 50);
        $('#photoInput')[0].value = photoRecall;
      }
      else {
        validated = true;
        setTimeout(function(){
            $('#submit').click();
            console.log('photo')
        }, 50);

      }
    }
  })
});
