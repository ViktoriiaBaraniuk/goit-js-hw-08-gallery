import images from './gallery-items.js';

/* 1.Создание и рендер разметки по массиву данных и предоставленному шаблону. */
const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryMarkup(images);
galleryContainer.insertAdjacentHTML('beforeEnd', galleryMarkup);

function createGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}

/* 2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.*/
const imgSrc = document.querySelector('.lightbox__image');
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  onOpenModal(event);
  setNewImgSrc(event.target);
}

/* 3.Открытие модального окна по клику на элементе галереи. */

const openModalWindow = document.querySelector('.js-lightbox');

function onOpenModal(event) {
    event.preventDefault();
    
    openModalWindow.classList.add('is-open');
    
    window.addEventListener('keydown', onKeypadPress);
}

function onKeypadPress(event) {
     if (event.code === 'Escape') { /* 8.Закрытие модального окна по нажатию клавиши ESC. */
    onCloseModal();
    }
    onArrowKeyPress(event); 
}
 
/* 4.Подмена значения атрибута src элемента img.lightbox__image. */

function setNewImgSrc(currentCard) {
    imgSrc.src = currentCard.dataset.source;
    imgSrc.alt = currentCard.alt;
}

/* 5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. */

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
    openModalWindow.classList.remove('is-open');

    removeImgSrc();
}

/*6.Очистка значения атрибута src элемента img.lightbox__image. */

function removeImgSrc() {
    imgSrc.src = '';
    imgSrc.alt = '';
}

/* 7.Закрытие модального окна по клику на div.lightbox__overlay. */

const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick (event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

/* 9.Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */

function onArrowKeyPress(event) {
  const currentPage = images.map(({ original }) => original);
  let indexOfCurrentPage = currentPage.indexOf(imgSrc.src);

  if (event.code === 'ArrowLeft') {
    if (indexOfCurrentPage <= 0) {
      indexOfCurrentPage = currentPage.length;
    }
    imgSrc.src = currentPage[indexOfCurrentPage - 1];
  }

  if (event.code === 'ArrowRight') {
    if (indexOfCurrentPage + 1 > currentPage.length - 1) {
      indexOfCurrentPage = -1;
    }
    imgSrc.src = currentPage[indexOfCurrentPage + 1];
  }
}

