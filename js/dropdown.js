(function($){
	'use strict';

	function dropdown(elem){
		var $elem = $(elem),
			$layer = $elem.find('.dropdown-layer'),
			activeClass = $elem.data('active') + '-active';

		$layer.showHide();

		$elem.hover(function(){
			$elem.addClass(activeClass);
			$layer.showHide('show');
		},function(){
			$elem.removeClass(activeClass);
			$layer.showHide('hide');
		});

	}

	var defaults = {
		css3: false,
		js: false,
		animation: 'fade'
	};

	$.fn.extend({
		dropdown: function(option){
			return this.each(function(){
				var options = $.extend({},defaults,option);
				dropdown(this,options);
			})
		}
	});

	
})(jQuery);