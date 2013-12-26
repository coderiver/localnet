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

//phone order
var btn_order_phone = $('.js-phone-order');
btn_order_phone.bind('click', function() {
	$(this).next().fadeToggle(200);
});


//go top
$('.js-go-top').bind('click', function(){
	$('body').animate({scrollTop: 0}, 800);
});

//window click
$(window).click(function(){

});

});