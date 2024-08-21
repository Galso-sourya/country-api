const countriesContainer = document.querySelector('.countries-container')//11.
/*18. api has endpoint called name means we can search based on name. search for
restcountries.com/v3.1/name/india
*/
const filterByRegion = document.querySelector('.filter-by-region')//20.three..
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')//21. create the file country.js

let allCountriesData//16.

fetch('https://restcountries.com/v3.1/all')//1.
  .then((res) => res.json())//2.
  //.then(console.log)//3.
  .then((data) => {//4.
    //5. console.log(data)
    /*data.forEach((country)=>{
      console.log(country);
      console.log(country.flags);
      console.log(country.flags.svg);
      }) */
    renderCountries(data)//14.
    allCountriesData = data//17.
  })

filterByRegion.addEventListener('change', (e) => {//45.full
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)//this is taken directly from the main api website where
  //the endpoints are being mentioned
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {//15.
  countriesContainer.innerHTML = ''//46. this line clears the previous result or reset like things
  data.forEach((country) => {//13.
    const countryCard = document.createElement('a')//6.
    countryCard.classList.add('country-card')//7.
    //8. console.log(countryCard)
    /*9.
    const cardImg=document.createElement('img)
    cardImg.src='https://flagcdn.com/is.svg'
    countryCard.append(cardImg)
    */
    countryCard.href = `/country.html?name=${country.name.common}`//19.
    //10.
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)//12.
  })
}


searchInput.addEventListener('input',  (e) => {//47.full
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {//48.full
  document.body.classList.toggle('dark')
})

