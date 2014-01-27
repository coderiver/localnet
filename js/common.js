$(document).ready(function() {

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

// //banner slider
// function slider_banner() {
// 	$('.js-banner-slider').each(function(){
// 		el_next = $('.popup__banner-next');
// 		el_prev = $('.popup__banner-prev');
// 		el_item = $('.popup__slider-item');
// 		el_in = $('.popup__slider');
// 		el_in.cycle({
// 			fx: 'fade',
// 		  timeout: 0,
// 		  delay: 0,
// 		  prev: el_prev,
// 		  next: el_next,
// 		  slides: el_item,
// 		  autoHeight: 'container'
// 		});
// 	});
// }
// slider_banner();

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
	btn_open.click(function(){
		el.fadeIn();
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
	$('body').animate({scrollTop: 0}, 800);
});

//service more
$('.js-serice-more').on('click', function(){
	$('.service').toggleClass('is-open');
	$(this).toggleClass('is-active');
});

var out = $('.js-out');

//window scroll
$(window).scroll(function(){
	var offset_top = $(window).scrollTop();
	if (offset_top > 140) {out.addClass('out_nav_fixed');}
	else{out.removeClass('out_nav_fixed');};
	nav_scroll();
});


//autocomplete
$('.autocomplete').typeahead({                                                                                      
  prefetch: '../data/street.json',
  template: [
    '<p class="street">{{name}}</p>'
  ].join(''),
  engine: Hogan                                                            
}).on('autocomplete:selected', function (object, datum) {
    alert('sdf');
});;






});