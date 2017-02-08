jQuery(document).ready(function($) {

  $langToggle = $('.language-selector');
  var letterData = undefined;

  $.ajax({
    url: './letter.json',
    data: {
      format: 'json'
    }
  }).done(function(data) {
    window.letterData = letterData = data[0];
    initLanguageToggle();
  }).fail(function(err) {
    console.error('Failed to fetch letters ', err);
  });

  function setTitle(language) {
    var $title = $('.title h2');
    $title.text(letterData[language].title);
  }

  function setLetter(language) {
    var $letter = $('.letter');
    var $p;
    $letter.empty();
    letterData[language].text.forEach(function(paragraph) {
      $p = $('<p/>');
      $p.text(paragraph);
      $letter.append($p)
    });
  }

  function setContent(language) {
    if (!letterData) {
      return;
    }
    setTitle(language);
    setLetter(language);
  }


  function initLanguageToggle() {
    $langToggle.removeAttr('disabled');
    $langToggle.on('change', function(e) {
      e.preventDefault();
      var targetLanguage = $(this).children(':selected').attr('value');
      setContent(targetLanguage);
      console.log(targetLanguage);
    });
  }

});
