//! form
const formModal = document.querySelector('.form__modal');
const select = document.querySelector('.select');
const dataStar = document.querySelectorAll('[data-id]');
const formLink = document.querySelector('.form-link');
const closeBtn = document.querySelector('[data-close]');
const menu = document.querySelector('.header__menu span');
const header = document.querySelector('.header');

//* Deligation
document.addEventListener('click', (e) => {
	switch (e.target) {
		case menu:
			document.body.classList.toggle('lock');
			header.classList.toggle('_active');
			break;
		case closeBtn:
			formModal.classList.remove('_active');
			break;
	}
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		document.body.classList.remove('lock');
		header.classList.remove('_active');
		formModal.classList.remove('_active');
	}
});

//* form option
document.addEventListener('DOMContentLoaded', (e) => {
	const form = document.querySelector('.form__body');
	if (form) {
		form.addEventListener('submit', formSent);

		function formSent(e) {
			e.preventDefault();

			let error = formValidate(form);
			let formData = new FormData(form);

			if (error === 0) {
				document.body.classList.add('_sending');
				formLink.classList.add('_active');
				// const response = await fetch('sendmail.php', {
				//   method: 'POST',
				//   body: formData,
				// });
				// if (response.ok) {
				//   const res = await response.json();
				//   alert(response.message);
				//   formPreview.innerHTML = '';
				//   form.reset();
				// } else {
				//   alert('ошибка!');
				// }

				setTimeout(() => {
					document.body.classList.remove('_sending');
					formModal.classList.add('_active');
					formModal.classList.add('green');
					formModal.querySelector('.form__error').innerHTML = formEvent.ok;
					setTimeout(() => {
						formLink.scrollIntoView({ behavior: 'smooth' });
						formModal.classList.remove('_active');
					}, 3000);
				}, 4000);
			} else {
				// alert('заполните поля');
				formModal.classList.add('_active');
				formModal.querySelector('.form__error').innerHTML =
					formEvent.inputError;

				form.scrollIntoView({ behavior: 'smooth' });
				form.classList.remove('_sending');
			}
		}

		const formValidate = (form) => {
			let error = 0;
			let formReq = document.querySelectorAll('._req');

			for (let index = 0; index < formReq.length; index++) {
				const element = formReq[index];
				formRemoveError(element);

				if (element.classList.contains('_email')) {
					if (emailTest(element)) {
						formAddError(element);
						error++;
					}
				} else {
					if (element.value === '' && !Number.isInteger(element.value)) {
						formAddError(element);
						error++;
					}
				}
			}
			return error;
		};

		const formFor = (arg) => {
			for (let i = 0; i < arg.length; i++) {
				const element = arg[i];
				return element.checked;
			}
		};

		const formAddError = (input) => {
			input.classList.add('_error');
			input.parentElement.classList.add('_error');
		};

		const formRemoveError = (input) => {
			input.classList.remove('_error');
			input.parentElement.classList.remove('_error');
		};

		const emailTest = (input) => {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		};

		const formEvent = {
			error: 'Ошибка!',
			ok: 'Всё отлично!',
			inputError: 'Заполните поля!',
		};
	}
});

//* star style
dataStar.forEach((item) => {
	item.addEventListener('click', (e) => {
		removeStarClass(dataStar);
		const data = +item.dataset.id;
		for (let i = 0; i < data; i++) {
			dataStar[i].classList.add('_active');
		}
	});
});

function removeStarClass(arg) {
	arg.forEach((i) => i.classList.remove('_active'));
}

// * selecet style
if (select) {
	$('.select').each(function () {
		const _this = $(this),
			selectOption = _this.find('option'),
			selectOptionLength = selectOption.length,
			selectedOption = selectOption.filter(':selected'),
			duration = 450; // длительность анимации

		_this.hide();
		_this.wrap("<div class='select'></div>");
		$('<div>', {
			class: 'new-select',
			text: _this.children('option:disabled').text(),
		}).insertAfter(_this);

		const selectHead = _this.next('.new-select');
		$('<div>', {
			class: 'new-select__list',
		}).insertAfter(selectHead);

		const selectList = selectHead.next('.new-select__list');
		for (let i = 1; i < selectOptionLength; i++) {
			$('<div>', {
				class: 'new-select__item',
				html: $('<span>', {
					text: selectOption.eq(i).text(),
				}),
			})
				.attr('data-value', selectOption.eq(i).val())
				.appendTo(selectList);
		}

		const selectItem = selectList.find('.new-select__item');
		selectList.slideUp(0);
		selectHead.on('click', function () {
			if (!$(this).hasClass('on')) {
				$(this).addClass('on');
				selectList.slideDown(duration);

				selectItem.on('click', function () {
					let chooseItem = $(this).data('value');

					$('select').val(chooseItem).attr('selected', 'selected');
					selectHead.text($(this).find('span').text());

					selectList.slideUp(duration);
					selectHead.removeClass('on');
				});
			} else {
				$(this).removeClass('on');
				selectList.slideUp(duration);
			}
		});
	});
}
