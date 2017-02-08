jQuery(document).ready(function($) {



  $.ajax({
    url: './letter.json',
    data: {
      format: 'json'
    }
  }).done(function(data) {
    console.log('done ', data)
  }).fail(function(err) {
    console.error('Failed to fetch letters ', err);
  });

});
