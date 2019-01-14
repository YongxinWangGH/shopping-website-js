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
    $headerSearch.on('search-getData', function(e,data){
    	var $this = $(this);
    	html = createHeaderSearchLayer(data, maxNum);
    	// $layer.html(html);
    	$this.search('appendLayer',html);

    	if(html){
    		$this.search('showLayer');
    	}else{
    		$this.search('hideLayer');
    	}
    }).on('search-noData', function(e){
    	$(this).search('hideLayer').search('appendLayer','');
    	// $layer.html('');
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

    // shopping cart
    $('#cart').on('dropdown-show', function() {
        loadOnce($(this), function($elem, data) {
            buildCartItem($elem, data);
            updateCart($elem, data);
        });
    }).dropdown({

        css3: true,
        js: false


    });

    $('#cart').dropdown({

        css3: true,
        js: false


    });
    function loadOnce($elem, success) {
        var dataLoad = $elem.data('load');

        if (!dataLoad) return;

        if (!$elem.data('loaded')) {
            $elem.data('loaded', true);
            $.getJSON(dataLoad).done(function(data) {
                if (typeof success === 'function') success($elem, data);
            }).fail(function() {
                $elem.data('loaded', false);
            });
        }
    }

    function buildMenuItem($elem, data) {

        var html = "";
        if (data.length === 0) return;
        for (var i = 0; i < data.length; i++) {
            html += '<li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
        }
        $elem.find('.dropdown-layer').html(html);

    }


    function buildCartItem($elem, data) {

        var html = "";
        if (data.length === 0) { // no goods
            html += '<div class="cart-nogoods"><i class="icon cart-nogoods-icon fl">&#xe600;</i><div class="cart-nogoods-text fl">No items selected yet<br />continue shopping</div></div>';
            $elem.find('.dropdown-layer').html(html);
            return;
        }

        html += '<h4 class="cart-title">Products details</h4><ul class="cart-list">';
        var subtotal = 0;
        for (var i = 0; i < data.length; i++) {       	
            html += '<li class="cart-item"><a href="###" target="_blank" class="cart-item-pic fl"><img src="' + data[i].pic + '" alt="" /></a><div class="fl"><p class="cart-item-name text-ellipsis"><a href="###" target="_blank" class="link">' + data[i].name + '</a></p><p class="cart-item-price"><strong>$' + data[i].price + ' x ' + data[i].num + '</strong></p></div><a href="javascript:;" title="remove" class="cart-item-delete link fr">X</a></li>';
        	subtotal +=(data[i].price*data[i].num);
        }

        html += '</ul><div class="cart-info"><span class="fl">Subtotal: <strong class="cart-total-price">$'+subtotal+'</strong></span><a href="###" target="_blank" class="cart-info-btn btn fr">Check Out</a></div>';

        setTimeout(function(){
            $elem.find('.dropdown-layer').html(html);
        },1000);
    }

    function updateCart($elem, data) {
        var $cartNum = $elem.find('.cart-num'),
            $cartTotalNum = $elem.find('.cart-total-num'),
            $cartTotalPrice = $elem.find('.cart-total-price'),
            dataNum = data.length,
            totalNum = 0,
            totalPrice = 0;

        if (dataNum === 0) { // no goods
            return;
        }

        for (var i = 0; i < dataNum; i++) {
            totalNum += +data[i].num;
            totalPrice += +data[i].num * +data[i].price;
        }

        $cartNum.html(totalNum);
        $cartTotalNum.html(totalNum);
        $cartTotalPrice.html('￥' + totalPrice);
    };
})(jQuery)

