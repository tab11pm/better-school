const items = document.querySelector('.accordeon__items');
const test = document.querySelector('.test');
const localData = localStorage.getItem('subject');

import { lessonArray, teacher } from './modules/subject';
import * as allFunc from './modules/functions';

const subject = allFunc.getData(lessonArray, localData ? localData : 'math');
const literatures = allFunc.setContent(subject, items);
allFunc.setLesson(subject, items);

console.log(allFunc.funcs);

const tests = document.querySelectorAll('[data-test]');
const dataVideo = document.querySelectorAll('[data-video]');

//* Deligation
document.addEventListener('click', (e) => {
	switch (e.target) {
		case literaturesOfLesson:
			allFunc.setList(accList, literatures);
			break;

		case menu:
			document.body.classList.toggle('lock');
			header.classList.toggle('_active');
			break;
	}
});

let error = 0;
let truth = 0;

document.addEventListener('submit', (e) => {
	e.preventDefault();

	// if (e.target.querySelectorAll('[data-true]').length > 0)
	const input = e.target.querySelectorAll('[type="radio"]');
	const truthData = e.target.querySelectorAll('[data-true]');
	const btn = e.target.querySelector('.btn');
	const errModal = document.querySelector('.form__error');
	const submit = e.target.querySelector('.form__submit');
	e.target.scrollIntoView({ behavior: 'smooth' });

	if (input.length === 0) {
		errModal.textContent = 'Тугмаҳоро пахш кун ва ҷавоби дурустро интихоб кун';
		showFormModal();
	}

	input.forEach((item) => {
		if (item.checked) {
			if (item.dataset.task === 'false') {
				item.classList.add('_error');

				setInfoModal(error);
				showFormModal();
			} else {
				setInfoModal(truth);
				showFormModal();
			}
		}
	});

	function setInfoModal(arg) {
		if (arg === truth) {
			truth++;
		} else {
			error++;
		}
		errModal.innerHTML = `ҷавобҳои дуруст ${truth} <br> ҷавобҳои нодуруст ${error}`;
		submit.setAttribute('disabled', '');
	}

	function showFormModal() {
		formModal.classList.add('_active');
		document.body.classList.add('lock');
	}
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		header.classList.remove('_active');
		document.body.classList.remove('lock');
		formModal.classList.remove('_active');
	}
});

tests.forEach((item) => {
	item.addEventListener('click', (e) => allFunc.setTests(subject, item));
});

dataVideo.forEach(
	(item) => {
		item.addEventListener('click', (e) => {
			const data = item.dataset.video;
			const videoWrapper = document.querySelectorAll(
				'.accordeon__video .swiper-wrapper'
			);

			const slide = videoWrapper[data].querySelector('.swiper-slide');
			if (!slide) {
				subject.lessons[data].video.forEach((item) => {
					videoWrapper[data].insertAdjacentHTML(
						'beforeend',
						`
				<div class="main__item swiper-slide">
					<section class="lesson__video">
							<a target='_blank' href="${item}" data-youtubeLightbox class="video__link lightbox">
								<img src="./img/video/play.svg" alt="" class="video__icon">
								<img src="./img/${localData}.jpg" alt="" class="video__link">
							</a>
					</section>
				<div>	
				

			`
					);
				});
				const showSlider = new Swiper('.swiper', {
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
		});
	},
	{ once: true }
);

//! menu
const menu = document.querySelector('.header__menu span');
const header = document.querySelector('.header');
const title = document.querySelectorAll('.item');
const link = document.querySelectorAll('.list__link');
const list = document.querySelector('.list');
const accList = document.querySelector('.accordeon__list');
const literaturesOfLesson = document
	.querySelector('.accordeon__literature')
	.querySelector('.accordeon__sub-title');
const wrapper = document.querySelector('.wr');

//! lesson
const dataLesson = document.querySelectorAll('[data-lesson]');
const mainSubject = document.querySelector('.main__subject');
const mainLesson = document.querySelector('.main__lesson');
const formModal = document.querySelector('.form__modal');
const dataFormModal = document.querySelector('[data-formclose]');
const dataAccordeon = document.querySelectorAll('[data-accordeon]');

if (dataAccordeon.length > 0) {
	allFunc.spoller(dataAccordeon);
}

dataFormModal.onclick = () => {
	formModal.classList.remove('_active');
	document.body.classList.remove('lock');
};

//! logic for better school
/*
// Шаг 1: Импорт Firebase и инициализация (если используете модульную систему)
// import firebase from 'firebase/app';
// import 'firebase/database';

const firebaseConfig = {
  // ваш конфиг
};

firebase.initializeApp(firebaseConfig);

// Шаг 2: Получение ссылки на базу данных
const database = firebase.database();

// Шаг 3: Функция для обработки клика и поиска предмета
async function findSubject(subjectKey) {
  // Путь к предметам в вашей базе данных
  const subjectsRef = database.ref('subjects');

  // Запрос к базе данных для поиска предмета
  await subjectsRef.orderByChild('subject').equalTo(subjectKey).once('value', snapshot => {
    if (snapshot.exists()) {
      // Если предмет найден, получаем данные
      const subjectData = snapshot.val();
      console.log(subjectData);

      // Шаг 4: Отправка данных пользователю
      // Это может быть, например, отображение данных на странице
      displaySubjectData(subjectData);
    } else {
      // Если предмет не найден, выводим сообщение
      console.log('Subject not found');
    }
  });
}

// Функция для отображения данных предмета
function displaySubjectData(subjectData) {
  // Реализуйте логику отображения данных предмета пользователю
  console.log(subjectData);
}

// Пример использования функции findSubject при клике
document.getElementById('findSubjectButton').addEventListener('click', () => {
  const subjectKey = 'math'; // Ключ предмета, который нужно найти
  findSubject(subjectKey);
});
 
*/
