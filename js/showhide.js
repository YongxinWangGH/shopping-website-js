var silent = {
	init: function($elem){
		if($elem.is(':hidden')){
			$elem.data('status', 'hidden');
		}else{
			$elem.data('status', 'shown');
		}
	},
			show: function($elem){
				if($elem.data('status') === 'show' || $elem.data('status') === 'shown') return;
				$elem.data('status', 'show').trigger('show');
				$elem.show();
				$elem.data('status', 'shown').trigger('shown');
			
				
			},
			hide: function($elem){
				if($elem.data('status') === 'hide' || $elem.data('status') === 'hidden') return;
				$elem.data('status', 'hide').trigger('hide');
				$elem.hide();
				$elem.data('status', 'hidden').trigger('hidden');
			}
		};
var css3 = {
	fade: {
		show: function(){},
		hide: function(){}
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