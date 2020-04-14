(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

var body = document.getElementsByTagName('body')[0],
    sidebar = document.getElementById('sidebar');

// sidebar overflow hide
sidebar.onmouseover = function() { 
    body.style.overflow = 'hidden';
}

sidebar.onmouseout = function() { 
    body.style.overflow = 'auto';
}
