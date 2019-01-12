var transition = window.mt.transition;

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
				css3._init($elem, 'fadeOut');
			},
		show: function($elem){
				css3._show($elem, 'fadeOut');							
			},
		hide: function($elem){
				css3._hide($elem,'fadeOut'); 			
			}
	},
	slideUpDown: {
		init: function($elem){
				$elem.height($elem.height());
				css3._init($elem, 'slideUpDownCollapse');
			},
		show: function($elem){
				css3._show($elem, 'slideUpDownCollapse');				
			},
		hide: function($elem){
				css3._hide($elem,'slideUpDownCollapse'); 					
			}
	},
	slideLeftRight: {
		init: function($elem){
				$elem.width($elem.width());
				css3._init($elem, 'slideLeftRightCollapse');
			},
		show: function($elem){
				css3._show($elem, 'slideLeftRightCollapse');				
			},
		hide: function($elem){
				css3._hide($elem,'slideLeftRightCollapse'); 					
			}
	},
	fadeSlideUpDown: {
		init: function($elem){
				$elem.height($elem.height());
				css3._init($elem, 'fadeOut slideUpDownCollapse');
			},
		show: function($elem){
				css3._show($elem, 'fadeOut slideUpDownCollapse');				
			},
		hide: function($elem){
				css3._hide($elem,'fadeOut slideUpDownCollapse'); 					
			}
	},
	fadeSlideLeftRight: {
		init: function($elem){
				$elem.width($elem.width());
				css3._init($elem, 'fadeOut slideLeftRightCollapse');
			},
		show: function($elem){
				css3._show($elem, 'fadeOut slideLeftRightCollapse');				
			},
		hide: function($elem){
				css3._hide($elem,'fadeOut slideLeftRightCollapse'); 					
			}
	}
};

css3._init = function($elem, className){
	$elem.addClass('transition');
	init($elem, function(){
		$elem.addClass(className);
	});
};

css3._show = function($elem, className){
	show($elem, function(){
		$elem.off(transition.end).one(transition.end, function(){
			$elem.data('status', 'shown').trigger('shown');
		})
		$elem.show();
		setTimeout(function(){
			$elem.removeClass(className);
		},20);
	});	
};

css3._hide = function($elem, className){
	hide($elem, function(){
		$elem.off(transition.end).one(transition.end, function(){
			$elem.hide();
			$elem.data('status', 'hidden').trigger('hidden');
		})
		$elem.addClass(className);
	});	
};

var js = {};