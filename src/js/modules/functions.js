export {
	setContent,
	setLesson,
	setModal,
	showModal,
	setTeachers,
	setList,
	setTests,
	showAnswer,
	setAnswer,
	getData,
	spoller,
};

let count = 0;

export class funcs {
	getData(obj, arg) {
		return obj.filter((item) => item.id === arg).find((i) => i);
	}
}

function setContent({ title, introdaction, literatures }, items) {
	items.insertAdjacentHTML(
		'beforeend',
		`
		<div class="accordeon__introdaction">
		<h1 class="title">${title}</h1>
	
		<button data-accordeon class="accordeon__btn arrow"> Маълумот </button>
		<div class="accordeon__content">
			<p class="accordeon__text"> ${introdaction} </p>
	
			<div class="accordeon__e-book">
			<h2 data-accordeon class="accordeon__sub-title arrow">
				китобҳои электрони
			</h2>
			<div class="accordeon__content">
				<p class="accordeon__text">
					Дар телеграм ман барои ту китобҳоро омода кардам ба тугма пахш карда ба
					он гузар, дар онҷо ман маълумотҳои навро омода месозам ва агар телеграм
					надошта боши ба сомонаи навбати гузар то китобхоро тарики сомона дарёфт куни
				</p>
				<a target="_blank" href="https://t.me/betterLesson" class="start">телеграм</a>
				<a target="_blank" href="https://tab11pm.github.io/schoolBooks/" class="start">сомона</a>
			</div>
		</div>
	
		<div class="accordeon__literature">
			<h2 data-accordeon class="accordeon__sub-title arrow">
				адабиётҳо барои фан
			</h2>
			<div class="accordeon__content">
				<ul class="accordeon__list"> </ul>
			</div>
		</div>
	</div>
		</div>
	`
	);

	return literatures;
}

function setLesson({ lessons }, items) {
	lessons.forEach((item, index) => {
		items.insertAdjacentHTML(
			'beforeend',
			`
			<div class="accordeon__item">
				<button data-accordeon class="accordeon__btn arrow">
				${item.title}
				</button>
				<div class="accordeon__content">
		
				<p class="accordeon__text">
					${item.theory}
				</p>
		
				<div class="accordeon__video">
					<h2 data-accordeon data-video=${index} class="accordeon__sub-title arrow">
						дарси водеои
					</h2>
					<div class="accordeon__content">
						<div class="subject__video swiper">
							<div class="swiper-wrapper"></div>
							<div class="swiper-button-next"></div>
							<div class="swiper-button-prev"></div>
						</div>
					</div>
				</div>
				<div  class="accordeon__test">
					<h2 data-accordeon data-test='${index}' class="accordeon__sub-title arrow">
						тестҳо
					</h2>
					<div class="accordeon__content">
						<form action="#" class="accordeon__form form__body">
							<button type="submit" class="form__submit">
								Ба пеш
							</button>
							
							</div>
						</form>
				</div>
				<div class="accordeon__exercise">
					<h2 data-accordeon class="accordeon__sub-title arrow">
						Машқ
					</h2>
					<div class="accordeon__content">
						<p class="accordeon__text">
						${item.task}
						</p>
					</div>
				</div>
			</div>
			`
		);
	});
}

function setModal() {
	const item = document.querySelectorAll(' [data-modal]');
	item.forEach((i) => {
		i.addEventListener('click', (e) => {
			const coach = document.querySelector('.main__coach');
			wrapper.parentElement.scrollIntoView({ behavior: 'smooth' });
			e.stopPropagation();

			const data = +i.dataset.modal;
			const getId = i.dataset.subject;
			const get = getData(teacher, getId);

			coach.insertAdjacentHTML(
				'beforeend',
				`
				<div data-mod class="modal">
					<div class="close">
					<span data-close></span>
					</div>
					<div class="_row">
					<div class="img">
						<img
							id="image"
							src="${get.teachers[data].img}"
							alt=""
	
						/>
					</div>
					<div class="left">
						<h2 id="modal-title" class="modal-title">
						${get.teachers[data].name}
						</h2>
						<div class="modal-text main__text">
							${get.teachers[data].subject}
						</div>
						<div class="modal__icon">
							<a id="facebook" href="${get.teachers[data].facebook}">
							<img src="./img/icon/Facebook.svg" alt="" />
							</a>
							<a id="instagram" href="${get.teachers[data].instagram}">
							<img
								src="./img/icon/Instagram.svg"
								alt=""
							/>
							</a>
						</div>
					</div>
					</div>
	
					<div class="tab">
					<ul class="list">
						<li class="item" data-tab="tab-1">
							<a href="#" class="list__link">Образование</a>
						</li>
						<li class="item" data-tab="tab-2">
							<a href="#" class="list__link"
							>Опыт работы
							</a>
						</li>
						<li class="item" data-tab="tab-3">
							<a href="#" class="list__link">Уроки</a>
						</li>
					</ul>
	
					<div
						class="tab-content"
						id="tab-1"
						data-tab-content
					>
						<div class="modal-title">Образование</div>
						<div class="main__text">
						${get.teachers[data].education}
						</div>
					</div>
	
					<div
						class="tab-content none"
						id="tab-2"
						data-tab-content
					>
						<div class="modal-title">Опыт работы</div>
						<div id="practice" class="main__text">
						${get.teachers[data].practice}
						</div>
					</div>
	
					<div
						class="tab-content none"
						id="tab-3"
						data-tab-content
					>
						<div class="modal-title">Уроки</div>
						<video
							controls
							src="${get.teachers[data].video}"
							class="modal__video"
						></video>
					</div>
					</div>
				`
			);

			showModal();

			//! tab
			const tabHeaders = document.querySelectorAll('[data-tab]');
			const contentBoxes = document.querySelectorAll('[data-tab-content]');

			//* tabs scripts
			tabHeaders.forEach((item) => {
				item.addEventListener('click', function () {
					// 1. скрыть все contentBox и скрыть
					contentBoxes.forEach(function (item) {
						item.classList.add('none');
					});
					// 2. выбрать нужный content box и показать его
					const contentBox = document.querySelector('#' + this.dataset.tab);
					contentBox.classList.remove('none');
				});
			});
		});
	});
}

function showModal() {
	const getModal = document.querySelector('[data-mod]');
	getModal.classList.add('_active');
	document.body.classList.add('lock');
	const closeBtn = document.querySelector('[data-close]');

	document.addEventListener('click', (e) => {
		e.target == closeBtn ? hideModal() : null;
	});

	document.addEventListener('keydown', (e) => {
		e.key == 'Escape' ? hideModal() : null;
	});

	function hideModal() {
		getModal.classList.remove('_active');
		document.body.classList.remove('lock');
	}
}

function setTeachers() {
	const { teachers } = getData(teacher, localData);
	teachers.forEach((item, index) => {
		wrapper.insertAdjacentHTML(
			'beforeend',
			`
		<div class="main__item swiper-slide">
		<div class="main__img">
		  <img  src="${item.img}" alt="" />
		</div>
  
		<h3 class="sub-title">${item.name}</h3>
		<div class="main__text">
		  омузгори фанни ${item.subject}
		</div>
  
		<button
		  data-modal="${index}" data-subject="math"
		  type="button"
		  class="detailed"
		>
		  Хондан
		</button>
	 </div>
			`
		);
	});

	setModal();
	const showSlider = new Swiper('.swiper-coach', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 1000,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// simulateTouch: false,
		// grabCursor: true, // меняет курсор
		slideToClickedSlide: true,
		keyboard: {
			enabled: true,

			onlyInViewport: true,
			pageUpDown: true,
		},
		// breakpoints: {
		// 	// when window width is >= 320px

		// 	320: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 20,
		// 	},

		// 	640: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 30,
		// 	},
		// },
	});
}

function setList(accList, literatures) {
	if (accList.querySelectorAll('li').length === 0) {
		literatures.forEach((item) => {
			accList.insertAdjacentHTML(
				'beforeend',
				`
			<li>${item}</li>
				`
			);
		});
	}
}

function setTests(subject, item) {
	const { lessons } = subject;
	const data = item.dataset.test;
	const form = document.querySelectorAll('.accordeon__form');
	const { test } = lessons[data];
	if (!form[data].contains(document.querySelector('[data-answer]'))) {
		for (let i = test.length - 1; i >= 0; i--) {
			const item = test[i];
			form[data].insertAdjacentHTML(
				'afterbegin',
				`
						<h2>${item.question}</h2>
						<button data-answer="${i}" data-id="${data}" type="button" class="btn">вариантҳоро нишон додан</button>
						<div class="form__grid"></div>
	
					`
			);
		}

		setAnswer(subject);
	}
}

function showAnswer(subject, item) {
	const { lessons } = subject;
	const answer = item.dataset.answer;
	const id = item.dataset.id;
	const form = item.nextElementSibling;
	const { test } = lessons[+id];
	const answers = [];
	item.remove();
	test[answer].answers.forEach((item, index) => {
		count++;
		form.insertAdjacentHTML(
			'beforeend',
			`
			<div class="form__item">
			  <input
				 type="radio"
				 name="test${answer}"
				data-task="${item.id}"
				id="test${count}"
				 class="accordeon__checkbox"
			  />
			  <label for="test${count}" class="accordeon__label"
				 >${item.test}</label
			  >
			</div>
			`
		);
	});
}

function setAnswer(subject) {
	const answer = document.querySelectorAll('[data-answer]');
	const id = document.querySelectorAll('[data-id]');

	answer.forEach((item) => {
		item.addEventListener(
			'click',
			(e) => {
				e.stopPropagation();
				showAnswer(subject, item);
			},
			{ once: true }
		);
	});
}

function spoller(arg) {
	arg.forEach((item) => {
		item.addEventListener('click', (e) => {
			item.classList.toggle('_active');
			item.nextElementSibling.classList.toggle('_active');
		});
	});
}

function getData(obj, arg) {
	return obj.filter((item) => item.id === arg).find((i) => i);
}
