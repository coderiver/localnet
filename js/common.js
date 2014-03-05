ymaps.ready(function () {
  var myMap = new ymaps.Map('map-el', {
    center: [50.554031,30.400078],
    zoom: 12,
    behaviors: ['default', 'scrollZoom']
  });

  // Можно создать выборку из запроса к геокодеру.
  var myGeocode = ymaps.geoQuery()
  // Также в выборку можно добавлять несколько запросов к геокодеру.
  // Они выполнятся по цепочке.
    .add(ymaps.geocode('Киев, ул. Автозаводская, 5'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 7'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 7-а'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 7-б'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 11'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 15-а'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 17'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 25'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 25-а'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 25-б'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 25-в'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 27'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 27-б'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 27-в'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 39'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 41'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 43'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 61'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 63'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 67'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 71'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 87'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 87-а'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 89'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 89-а'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 93'))
    .add(ymaps.geocode('Киев, ул. Автозаводская, 97/5'));
  // После того, как все запросы обработаются, они будут добавлены на карту.
  // Обратите внимание, что все операции асинхронные, поэтому для продолжения
  // работы с выборкой следует дождаться готовности данных.
  myGeocode.then(function () {
    // Этот код выполнится после того, как все запросы к геокодеру
    // вернут ответ и объекты будут добавлены на карту.
    //objects.get(0).balloon.open();
    clusterer = ymaps.geoQuery(myGeocode).clusterize({
    	preset: 'twirl#darkgreenClusterIcons',
    	clusterDisableClickZoom: false
    });
    myMap.geoObjects.options.set({'preset': 'twirl#darkgreenDotIcon'});
    myMap.geoObjects.add(clusterer);
    //myMap.geoObjects.events.add('click', function (e) {
      //alert('Дошло до коллекции объектов карты');
      // Получение ссылки на дочерний объект, на котором произошло событие
      //var object = e.get('target');
      //alert(object.properties.get('id'));
    //});
  });



  //autocomplete
  $('.js-typeahead').typeahead({
    prefetch: '../data/street.json',
    template: [
      '<p class="street">{{name}}</p>'
    ].join(''),
    engine: Hogan
  });
  $('.js-typeahead').on('typeahead:selected', function (object, datum) {
    $('.js-street').addClass('is-active');
    $('.js-street-title').html(datum.name);
    var numbers = datum.numbers;
    var street = datum.name;
    var numbers_el = $('.js-street-numbers');
    numbers_el.html('');
    for (var i = 0; i < numbers.length; i++) {
      numbers_el.append('<span>'+numbers[i]+'</span>');
    }
    numbers_el.find('span').on('click', function(){
    	if (!$(this).hasClass('is-active')) {
  			var number = $(this).html();
  			$(this).addClass('is-active');
  		  ymaps.geocode('Киев '+ street + number, {
  		    results: 1
  		  }).then(function (res) {
  		    var firstGeoObject = res.geoObjects.get(0),
  		      coords = firstGeoObject.geometry.getCoordinates(),
  		      bounds = firstGeoObject.properties.get('boundedBy');
  		    myMap.geoObjects.add(firstGeoObject);
  		    myMap.setBounds(bounds, {
  		      checkZoomRange: true
  		    });
  		    //var myPlacemark = new ymaps.Placemark(coords, {
  		    //	iconContent: street +' '+ number
  		    //}, {
  		   	//	preset: 'twirl#violetStretchyIcon'
  		    //});
  		    //myMap.geoObjects.add(myPlacemark);
  			});
    	};
    })
  });
  //


});



$(document).ready(function() {


//tabs
function tabs() {
  $(".js-tabs").each(function(){
    var tabs_btn = $(this).find('.m-tariff__type a');
    var tabs_container = $(this).find('.m-tafiff__list');
    var tabs_item = $(this).find('.m-tariff__list-tab');
    tabs_item.hide();
    tabs_item.first().show();
    tabs_btn.on('click', function() {
	    if (!$(this).parent('li').hasClass('is-active')) {
	    	var id = $(this).attr('href');
		    tabs_btn.parent('li').removeClass("is-active");
		    $(this).parent('li').addClass("is-active");
		    tabs_item.hide();
		    $('#'+id).show();
	    };
	    return false;
    });
  });
}
tabs();


//main action sliders
function m_slider_action() {
	var el = $('.js-m-slider-action');
	el.each(function(){
		el_next = $(this).find('.m-action__next');
		el_prev = $(this).find('.m-action__prev');
		el_pager = $(this).find('.m-action__pager-in');
		el_item = $(this).find('.m-action__content');
		el_in = $(this).find('.m-action__slider');
		el_in.cycle({
			fx: 'fade',
		  timeout: 0,
		  prev: el_prev,
		  next: el_next,
		  pager: el_pager,
		  slides: el_item,
		  pagerActiveClass: 'is-active'
		});
	});
}
m_slider_action();

//banner slider
function slider_action() {
	$('.js-sl-action').each(function(){
		el_next = $('.sl-action__next');
		el_prev = $('.sl-action__prev');
		el_item = $('.sl-action__item');
		el_in = $('.sl-action__in');
		el_in.cycle({
			fx: 'fade',
		  timeout: 0,
		  prev: el_prev,
		  next: el_next,
		  slides: el_item,
		  autoHeight: 'container'
		});
	});
}
slider_action();


//action masonry
function action_masonry() {
	var el = $('.js-action');
	var item = el
	if (el.length > 0) {
		el.masonry({
			itemSelector: '.action__item',
			gutter: 20
		})
	};
}
action_masonry();

//select
function select() {
	var el = $('.js-select');
	el.find('.select__value').bind('click', function(){
		if ($(this).parent().hasClass('is-open')) {
			$(this).parent().removeClass('is-open');
			$(this).next().hide();
		}
		else {
			el.removeClass('is-open');
			el.find('.select__options').hide();
			$(this).parent().addClass('is-open');
			$(this).next().slideDown();
		}
	})
	el.find('.select__options li').bind('click', function(){
		var val = $(this).text();
		$(this).parent().prev().html(val);
		$(this).parent().next().val(val);
		$(this).parent().hide();
		$(this).parent().parent().removeClass('is-open');
	})
	el.click(function(event){
		event.stopPropagation();
	});
	$(document).click(function() {
		el.find('.select__options').hide();
		el.removeClass('is-open');
	});
}
select();

//phone order
function phone_order() {
	var el = $('.js-phone-order');
	var form = el.find('.phone-order__form');
	var btn = el.find('.phone-order__btn');
	var close = el.find('.phone-order__close');
	btn.bind('click', function(){
		form.fadeIn();
	});
	close.bind('click', function(){
		form.fadeOut();
	});
}
phone_order();


//nav
function nav() {
	var el = $('.js-nav');
	link = el.find('span');
	link.bind('click', function(){
		//el.find('li').removeClass('is-active');
		//$(this).parent().addClass('is-active');
		var item = $(this).attr('data-item');
		var top = $(item).offset().top;
		var nav_height = el.height();
		$('body').animate({scrollTop: top}, 500, function(){
			window.location.hash = item;
		});
	});
}
nav();

function nav_scroll() {
	var offset_top = $(window).scrollTop();
	var item_scroll = $('.scroll-nav');
	item_scroll.each(function(){
		var item_scroll_top = $(this).offset().top;
		if (offset_top >= item_scroll_top) {
			var item_el = $(this).attr('id');
			var link_el = $('.js-nav span');
			link_el.each(function(){
				var link_item = $(this).attr('data-item');
				if ('#'+item_el == link_item) {
					link_el.parent().removeClass('is-active');
					$(this).parent().addClass('is-active');
				};
			});
		};
	});
}
nav_scroll();


//popup
function popup() {
	var el = $('.js-popup');
	var btn_open = $('.js-popup-open');
	var btn_close = $('.js-popup-close');
	var btn_order = $('.js-tariff-order');
	btn_open.click(function(){
		el.fadeIn();
		return false;
	});
	btn_order.click(function(){
		var tariff = $(this).attr('href');
		el.fadeIn();
		$('#order-tariff-value').html(tariff);
		return false;
	});
	btn_close.click(function(){
		el.fadeOut();
		return false;
	});
}
popup();


//go top
$('.js-go-top').on('click', function(){
	$('body, html').animate({scrollTop: 0}, 800);
});

//service more
$('.js-serice-more').on('click', function(){
	$('.service').toggleClass('is-open');
	$(this).toggleClass('is-active');
});

$('.js-map-streets').find('.m-map__streets-item span').on('click', function(){
	$(this).next().slideToggle();
});

$('.js-tariff-info').on('click', function(){
	$(this).next().slideToggle();
	return false;
});

var out = $('.js-out');

//window scroll
$(window).scroll(function(){
	var offset_top = $(window).scrollTop();
	if (offset_top > 140) {out.addClass('out_nav_fixed');}
	else{out.removeClass('out_nav_fixed');};
	nav_scroll();
});



});

