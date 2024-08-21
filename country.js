const countryName = new URLSearchParams(location.search).get('name')//22.
const flagImage = document.querySelector('.country-details img')//25.
const countryNameH1 = document.querySelector('.country-details h1')//28.
const nativeName = document.querySelector('.native-name')//33.
const population = document.querySelector('.population')//29.
const region = document.querySelector('.region')//30.
const subRegion = document.querySelector('.sub-region')//34.
const capital = document.querySelector('.capital')//35.
const topLevelDomain = document.querySelector('.top-level-domain')//36.
const currencies = document.querySelector('.currencies')//37.
const languages = document.querySelector('.languages')//38.last too...
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)//23.
  .then((res) => res.json())//24.
  .then(([country]) => {//26.
    flagImage.src = country.flags.svg//27.all 5..below...
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if (country.capital) {//39.
      capital.innerText = country.capital?.[0]
    }

    if (country.subregion) {//40.
      subRegion.innerText = country.subregion
    }

    if (country.name.nativeName) {//31.some countries do  not have native name
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {//32.
      nativeName.innerText = country.name.common
    }

    if (country.currencies) {//43.
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {//41.
      languages.innerText = Object.values(country.languages).join(', ')
    }

    //42.console.log(country);
    if (country.borders) {//44.
      
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
          })
      })
    }
  })
