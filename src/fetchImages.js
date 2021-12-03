export let pageNum = 1;
import clickLoadMore from "./index.js"

async function fetchImages(search) {
    // if (clickLoadMore.clickLoadMore) {
    //     pageNum += 1;
    // }
   
   const response = await fetch(`https://pixabay.com/api/?key=24642073-b12941d2e5507c49f57c90e2e&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads&per_page=40&page=${pageNum}`)
    const image = await response.json()
 pageNum = 1;
    return image;
}

export default { fetchImages };