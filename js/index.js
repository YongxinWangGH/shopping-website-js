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

	//header search
    var $headerSearch = $('#header-search');
    var html = '',
    	maxNum = 10;
    $headerSearch.on('search-getData', function(e,data,$layer){
    	var $this = $(this);
    	html = createHeaderSearchLayer(data, maxNum);
    	$layer.html(html);

    	if(html){
    		$this.search('showLayer');
    	}else{
    		$this.search('hideLayer');
    	}
    }).on('search-noData', function(e,$layer){
    	$(this).search('hideLayer');
    	$layer.html('');
    }).on('click', '.search-layer-item', function(){
 		$headerSearch.search('setInputVal', $(this).html());
 		$headerSearch.search('submit');
 	});
    
    $headerSearch.search({
        autocomplete: true,
        css3: false,
        js: false,
        animation: 'fade'
    });

    function createHeaderSearchLayer(data, maxNum){
    	var html = '',
    		dataNum = data['res']['sug'].length;

    	if(dataNum === 0){
    		return '';
    	}

     	for(var i = 0; i < dataNum; i++){
			if(i >= maxNum) break;
			html += '<li class="search-layer-item text-ellipsis">' + data['res']['sug'][i] + '</li>'
		}

		return html;
    }
})(jQuery)

