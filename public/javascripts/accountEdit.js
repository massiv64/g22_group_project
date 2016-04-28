$( document ).ready(function() {
  var photo = $('#photoDisplay')[0]
  var validated = false;


  $('#aliasInput').on('keyup', function(e){
     $('#aliasDisplay').text(`${e.target.value}`)
  })


  $('#reset').on('click', function(e){
    e.preventDefault();
    $('#aliasInput')[0].value = '';
    $('#aliasDisplay').text('');
    $('#photoInput')[0].value = '';
  })

});
