
import API from "./fetchImages.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pageNum } from "./fetchImages.js";


const inputData = document.querySelector('input');
const formData = document.querySelector(".search-form");
const galleryRender = document.querySelector('.gallery')
const btnLoadMore = document.querySelector('.load-more')
console.log(inputData.value)
btnLoadMore.classList.add('hidden')
async function onSearch(e) {
    e.preventDefault()
    console.log(e)

const image = await API.fetchImages(inputData.value)
    console.log(image);
    if (image.hits.length === 0) {
        Notify.info("Sorry, there are no images matching your search query. Please try again.")
    }
  galleryRender.innerHTML = await image.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                  `<div class="photo-card">
  <img src=${webformatURL} alt="" loading="lazy" width=300px height=150px/>
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
    btnLoadMore.classList.remove('hidden')
}


async function clickLoadMore() {
    
 const image = await API.fetchImages(inputData.value)
    galleryRender.insertAdjacentElement = ('beforeend', await image.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                  `<div class="photo-card">
  <img src=${webformatURL} alt="" loading="lazy" width=300px height=150px/>
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
    ).join('')) 
}

  export default { clickLoadMore };
formData.addEventListener("submit", onSearch)
btnLoadMore.addEventListener("click", clickLoadMore)