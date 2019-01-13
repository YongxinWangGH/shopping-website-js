(function($){
	'use strict'

	var $search = $('.search'),
		$input = $search.find('.search-inputbox'),
		$btn = $search.find('.search-btn'),
		$layer = $search.find('.search-layer');

	$btn.on('click', function(){
		if($.trim($input.val()) === ''){
			return false;
		}
	})
})(jQuery);