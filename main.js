jQuery(document).ready(function($) {

  var $langToggle = $('.language-selector');
  var $sign = $('.sign');
  var $window = $(window);

  var windowWidth = $window.width();
  var windowHeight = $window.height();
  var mobileBreakPoint = 768;
  var letterData;

  function isMobile() {
    return windowWidth < mobileBreakPoint;
  }

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
    $title.fadeOut(300, function() {
      $title.text(letterData[language].title);
      $title.fadeIn(300);
    })

  }

  function setLetter(language) {
    var $letter = $('.letter');
    var $p;
    $letter.fadeOut(300, function() {
      $letter.empty();
      letterData[language].text.forEach(function(paragraph) {
        $p = $('<p/>');
        $p.text(paragraph);
        $letter.append($p)
      });
      $letter.fadeIn(300);
    });
  }

  function setContent(language) {
    if (!letterData) {
      return;
    }
    $("html, body").animate({ scrollTop: "0px" }, function() {
      setTitle(language);
      setLetter(language);
    });
  }

  function initLanguageToggle() {
    $langToggle.removeAttr('disabled');
    // initially
    $langToggle.on('change', function(e) {
      e.preventDefault();
      var targetLanguage = $(this).children(':selected').attr('value');
      setContent(targetLanguage);
      console.log(targetLanguage);
    });
  }

  if(isMobile()) {
    $sign.attr('target', '_blank');
  } else {
    $sign.venobox({
      framewidth: (windowWidth - 100) + 'px',
      frameheight: (windowHeight - 100) + 'px'
    });
  }


});
