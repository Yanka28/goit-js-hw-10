import axios from "axios"

axios.defaults.headers.common["x-api-key"] ='live_K4pzQoLzu9IhHwHlN4Hvo6GlKKLKJ2ktVFgFb1KTRljqdmsjG2dTpJbWjfSQGmNf'
axios.defaults.baseURL = 'https://api.thecatapi.com/v1'

export const selectors= { 
    selectEl: document.querySelector('.breed-select'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
    divEl: document.querySelector('.cat-info')
}
export function fetchBreeds() {
  return axios.get('/breeds/')
    .then(({ data }) => {
      return data
      }
  )
  .catch((error) => {
    Notiflix.Notify.failure(selectors.errorEl.textContent);
  })
  .finally(function () {
});
}

export function fetchCatByBreed(breedId) {

    return axios.get(`/images/search?breed_ids=${breedId}`)
      .then(({ data }) => {
        return data
    })
    .catch((error) => {
     Notiflix.Notify.failure(selectors.errorEl.textContent);
  })
    .finally(function () {
});
}
