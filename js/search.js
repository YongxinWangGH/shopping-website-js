(function($){
	'use strict'

	var $search = $('.search'),
		$input = $search.find('.search-inputbox'),
		$form = $search.find('.search-form'),
		$btn = $search.find('.search-btn'),
		$layer = $search.find('.search-layer');

	// validation for null or space
	$form.on('submit',function(){
		if($.trim($input.val()) === ''){
			return false;
		}
	})

	// auto complete
	$input.on('input',function(){
		var url = 'https://autosug.ebaystatic.com/autosug?jgr=1&sId=15&_ch=0&callback=nil&kwd=' + $.trim($input.val());
		$.ajax({
			url:url,
			dataType: 'jsonp',
			jsonpCallback: 'nil'	
		}).done(function(data){
			console.log(data.res.sug)
				var html = '',
					dataNum = data['res']['sug'].length,
					maxNum = 10;
				if(dataNum === 0){
					$layer.hide().html('');
					return;
				}
				// console.log(data);
				for(var i = 0; i < data['res']['sug'].length; i++){
					if(i >= maxNum) break;
					html += '<li class="search-layer-item text-ellipsis">' + data['res']['sug'][i] + '</li>'
				}
				// console.log(html);
				$layer.html(html).show();
		}).fail(function(){
			$layer.hide().html('');
			console.log(1);
		}).always(function(){
			console.log(2);
		});
	})

	// event bubble
	$layer.on('click', '.search-layer-item', function(){
		$input.val($(this).html());
		$form.submit();
	})

	// to remove the html tags in search items 
	function removeHtmlTags(str) {
        return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
    }

    $input.on('focus',function(){
    	$layer.show();
    }).on('click', function(){
    	return false;
    });

    $(document).on('click', function(){
    	$layer.hide();
    })
})(jQuery);