(function($){
	'use strict'

	var dropdownDom = $('.dropdown');

		dropdownDom.on('dropdown-show', function(){
			var $this = $(this),
				dataLoad = $this.data('load');

			if(!dataLoad) return;			

			if(!$this.data('loaded')){
				var $layer = $(this).find('.dropdown-layer'),
					html = '';
				// console.log($this.find('.dropdown-layer').data('height'));
				$.getJSON(dataLoad, function(data){
					setTimeout(function(){
						for (var i=0; i<data.length; i++ ){
							html += '<li><a href="' + data[i].url + '" target="_blank" class="menu-item">'+ data[i].name +'</a></li>'
						}
						$layer.html(html);
						$this.data('loaded', true);
						$this.find('.dropdown-layer').data('height',true);
						// console.log($this.find('.dropdown-layer').data('height'));
					},1000);
					
				})
			}
			
		})

	$('.dropdown').dropdown({
		css3: true,
		js: false,
		animation: 'slideUpDown',
		delay:0
	});
})(jQuery)

