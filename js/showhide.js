function init($elem, hiddenCallback){
	if($elem.is(':hidden')){
		$elem.data('status', 'hidden');
		if(typeof hiddenCallback === 'function'){
			hiddenCallback();
		}
	}else{
		$elem.data('status', 'shown');
	}
}

function show($elem, callback){
	if($elem.data('status') === 'show' || $elem.data('status') === 'shown') return;
	$elem.data('status', 'show').trigger('show');
	callback();
}

function hide($elem, callback){
	if($elem.data('status') === 'hide' || $elem.data('status') === 'hidden') return;
	$elem.data('status', 'hide').trigger('hide');
	callback();				
}

var silent = {
	init: init,
	show: function($elem){
		show($elem, function(){
			$elem.show();
			$elem.data('status', 'shown').trigger('shown');
		})
	},
	hide: function($elem){
		hide($elem, function(){
			$elem.hide();
			$elem.data('status', 'hidden').trigger('hidden');
		});		
	}
};

var css3 = {
	fade: {
		init: function($elem){
				$elem.addClass('transition');
				init($elem, function(){
					$elem.addClass('fadeOut');
				});
			},
		show: function($elem){
				show($elem, function(){
					$elem.off('transitionend').one('transitionend', function(){
						$elem.data('status', 'shown').trigger('shown');
					})
					$elem.show();
					setTimeout(function(){
						$elem.removeClass('fadeOut');
					},20);
				});					
			},
		hide: function($elem){
			hide($elem, function(){
				$elem.off('transitionend').one('transitionend', function(){
					$elem.hide();
					$elem.data('status', 'hidden').trigger('hidden');
				})
				$elem.addClass('fadeOut');
			});			
		}
	},
	slideUpDown: {
		show: function(){},
		hide: function(){}
	},
	slideLeftRight: {
		show: function(){},
		hide: function(){}
	},
	fadeSlideUpDown: {
		show: function(){},
		hide: function(){}
	},
	fadeSlideLeftRight: {
		show: function(){},
		hide: function(){}
	}
};

var js = {};