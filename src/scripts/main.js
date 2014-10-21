(function($) {
  
  $(function() {
    $('#nav-link').click(function() {
      $(this).toggleClass('active');
      $('ul').toggleClass('active');
    })
  });
})(window.jQuery);