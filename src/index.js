
import API from "./fetchImages.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pageNum } from "./fetchImages.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from "simplelightbox";


let count = 1;
let gallery = new SimpleLightbox('.gallery a');
const inputData = document.querySelector('input');
const formData = document.querySelector(".search-form");
const galleryRender = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
console.log(inputData.value)
btnLoadMore.classList.add('hidden')
async function onSearch(e) {
    e.preventDefault()

const image = await API.fetchImages(inputData.value)
    count=1
    if (image.hits.length === 0) {
        Notify.info("Sorry, there are no images matching your search query. Please try again.")
    }
  galleryRender.innerHTML =  await image.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"><img src=${webformatURL} alt="" loading="lazy" width=300px height=150px/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    ).join('')

gallery.on('show.simplelightbox', simpleLightbox);

    Notify.success(`Hooray! We found ${image.totalHits} totalHits images.`)
    btnLoadMore.classList.remove('hidden')
  
}


async function clickLoadMore() {

    count+=1
  const image = await API.fetchImages(inputData.value, count)
  
   const markup = await image.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"><img src=${webformatURL} alt="" loading="lazy" width=300px height=150px/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    ).join('')
    galleryRender.insertAdjacentHTML("beforeend", markup)
  const { height: cardHeight } = document
  .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    const renderedMarkup = document.querySelectorAll('.photo-card');
   

        if (renderedMarkup.length >= image.totalHits) {
       console.log(renderedMarkup.length)
            count = 1;
             Notify.info("We're sorry, but you've reached the end of search results.")
            btnLoadMore.classList.add('hidden')
        }
gallery.on('show.simplelightbox', simpleLightbox);
gallery.refresh()

}

  

  export default { clickLoadMore };
formData.addEventListener("submit", onSearch)
btnLoadMore.addEventListener("click", clickLoadMore)