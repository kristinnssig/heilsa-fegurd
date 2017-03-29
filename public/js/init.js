(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.parallaxV').parallaxVid();
    $('.scrollspy').scrollSpy();

    $('#main').pushpin({
      top: $('#main').offset().top,
      bottom: $('#hof').offset().top + $('#hof').outerHeight() - $('#main').height(),
      offset: 0
    });

    $('select').material_select();
    $('#modal1').modal();

  }); // end of document ready
})(jQuery); // end of jQuery name space