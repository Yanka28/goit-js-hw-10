
import axios from "axios"
import Notiflix from 'notiflix'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

import { fetchBreeds  } from './cat-api.js'
import { fetchCatByBreed } from './cat-api.js'
import { selectors } from "./cat-api.js";

selectors.loaderEl.innerHTML = ''
selectors.selectEl.hidden = true

fetchBreeds()
    .then(data => {
        selectors.selectEl.hidden = false
        selectors.selectEl.insertAdjacentHTML('beforeend', createMarkup(data)) 
        new SlimSelect({
            select: '#single'
        })
        selectors.loaderEl.classList.remove('loader')
})
     .catch(err => Notiflix.Notify.failure(selectors.errorEl.textContent))
 


selectors.selectEl.addEventListener('change', onSelect)

function onSelect(evt) { 
     selectors.divEl.innerHTML = ''
    const id = evt.target.value
    // selectors.loaderEl.hidden=false
    selectors.loaderEl.classList.add('loader')
    fetchCatByBreed(id)
        .then(data => {
            selectors.divEl.insertAdjacentHTML('beforeend', createMarkupDiv(data))
            selectors.loaderEl.classList.remove('loader')
    })
    .catch(err => Notiflix.Notify.failure(selectors.errorEl.textContent))

}

function createMarkup(arr) {
    return arr.map((item) => `<option value="${item.id}">${item.id}</option>`).join('')
}
function createMarkupDiv(arr) { 
   
    return `<img src="${arr[0].url}" width='700' height ='500' alt="${arr[0].breeds[0].name}">
    <div class= 'content'>
      <p class='name'>${arr[0].breeds[0].name}</p>
      <p class= 'description'>${arr[0].breeds[0].description}</p>
      <p class = 'temperament'>${arr[0].breeds[0].temperament}</p>
    </div>
      `

}    

