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

//banner slider
function slider_banner() {
	$('.js-banner-slider').each(function(){
		el_next = $('.popup__banner-next');
		el_prev = $('.popup__banner-prev');
		el_item = $('.popup__slider-item');
		el_in = $('.popup__slider');
		el_in.cycle({
			fx: 'fade',
		  timeout: 0,
		  delay: 0,
		  prev: el_prev,
		  next: el_next,
		  slides: el_item,
		  autoHeight: 'container'
		});
	});
}
slider_banner();

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
var btn_order_phone = $('.js-phone-order');
btn_order_phone.bind('click', function() {
	$(this).next().fadeToggle(200);
});

//go top
$('.js-go-top').bind('click', function(){
	$('body').animate({scrollTop: 0}, 800);
});

//service more
$('.js-serice-more').bind('click', function(){
	$('.service').toggleClass('is-open');
	$(this).toggleClass('is-active');
});

//window click
$(window).click(function(){

});

});