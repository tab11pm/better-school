//! all
const mainTitle = document.querySelector('.title');
const container = document.querySelector('.container');
const anim = document.querySelectorAll('._anim-item');
const dataLesson = document.querySelectorAll('[data-lesson]');
const dataUniver = document.querySelectorAll('[data-univer]');
const dataHome = document.querySelectorAll('[data-home]');
const toTop = document.querySelector('.top');

//! menu
const menu = document.querySelector('.header__menu span');
const header = document.querySelector('.header');
const title = document.querySelectorAll('.item');
const modalBtn = document.querySelector('.modal-btn');
const dataAccordeon = document.querySelectorAll('[data-accordeon]');

toTop.addEventListener('click', (e) => {
	// e.preventDefault();
	header.scrollIntoView({ behavior: 'smooth' });
});

//* Deligation
document.addEventListener('click', (e) => {
	switch (e.target) {
		case menu:
			// e.stopPropagation();
			document.body.classList.toggle('lock');
			header.classList.toggle('_active');
			break;
	}
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		document.body.classList.remove('lock');
		header.classList.remove('_active');
		modal.classList.remove('_active');
	}
});

//* swiper option
if (document.querySelector('.swiper')) {
	document.addEventListener('DOMContentLoaded', function () {
		let showSlider = new Swiper('.swiper', {
			// loop: true,
			slidesPerView: 2,
			spaceBetween: 15,
			speed: 1000,
			// centeredSlides: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				// type: 'progressbar',
				// dynamicBullets: true,
			},
			// simulateTouch: false,
			// grabCursor: true, // меняет курсор
			slideToClickedSlide: true,
			keyboard: {
				enabled: true,

				onlyInViewport: true,
				pageUpDown: true,
			},
			breakpoints: {
				// when window width is >= 320px

				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},

				640: {
					slidesPerView: 2,
					spaceBetween: 30,
				},

				992: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
		});
	});
}

dataLesson.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		const getData = item.dataset.lesson;
		localStorage.setItem('subject', getData);
		const url = item.getAttribute('href');
		window.location = url;
	});
});

dataUniver.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		const getData = item.dataset.univer;
		localStorage.setItem('univer', getData);
		const url = item.getAttribute('href');
		window.location = url;
	});
});
