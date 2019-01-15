(function($){
	'use strict'

	function Slider($elem, options){
		this.$elem = $elem;
		this.options = options;
		this.$items = this.$elem.find('.slider-item');
        this.$indicators = this.$elem.find('.slider-indicator');
        // this.$controlLeft=this.$elem.find('.slider-control-left');
        // this.$controlRight=this.$elem.find('.slider-control-right');
        this.$controls = this.$elem.find('.slider-control');
        this.curIndex = this._getCorrectIndex(this.options.activeIndex);
        this.itemNum = this.$items.length;
        this._init();
	}

	Slider.DEFAULTS={
        css3: false,
        js: false,
        animation: 'fade', // slide
        activeIndex: 0,
        interval: 0
    };

	Slider.prototype._init = function(){
		var self = this;

		this.$indicators.removeClass('slider-indicator-active');
		this.$indicators.eq(this.curIndex).addClass('slider-indicator-active');

		if(this.options.animation === 'slide'){
			this.$elem.addClass('slider-slide'); 
            this.to=this._slide;
		}else{
            this.$elem.addClass('slider-fade');  
            this.$items.eq(this.curIndex).show();
            this.to=this._fade;
        }
        // showhide init
        this.$items.showHide(this.options);

		this.$elem.hover(function(){
			self.$controls.show();
		},function(){
			self.$controls.hide();
		})
		.on('click', 'slider-control-left',function(){
			self.to(self._getCorrectIndex(self.curIndex-1));
		})
		.on('click', 'slider-control-right',function(){
			self.to(self._getCorrectIndex(self.curIndex+1));
		}).on('click', '.slider-indicator',function(){
			self.to(self._getCorrectIndex(self.$indicators.index(this)));
		});
	};

	Slider.prototype._fade = function(index){
		if(this.curIndex === index) return;
		this.$items.eq(this.curIndex).showHide('hide');
		this.$items.eq(index).showHide('show');
		this.$indicators.eq(this.curIndex).removeClass('slider-indicator-active');
		this.$indicators.eq(index).addClass('slider-indicator-active');
		this.curIndex = index;

	};

	Slider.prototype._slide = function(){

	};

	Slider.prototype._getCorrectIndex = function(index){
		if(isNaN(Number(index))) return 0;
		if(index < 0) return this.itemNum -1;
		if(index > this.itemNum - 1) return 0;
		return index;
	};

	Slider.prototype.auto = function(){};
	// Slider.prototype._init = function(){};
	// Slider.prototype._init = function(){};

	$.fn.extend({
		slider: function(option){
			return this.each(function(){
				var $this = $(this),
					slider = $this.data('slider'),
					options = $.extend({}, Slider.DEFAULTS, $this.data(), typeof option === 'object' && option);

				if(!slider){
					$this.data('slider', slider = new Slider($this, options));
				}

				if(typeof slider[option] === 'function'){
					slider[option]();
				}
			});
		}
	});
})(jQuery);