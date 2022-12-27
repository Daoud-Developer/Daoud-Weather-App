const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon1');
const time =document.querySelector('.time');
const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;


  // update details template  
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;
  details.innerHTML = details.innerHTML;

  // craete a new image icon element// 
  icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`);
  icon.setAttribute('alt', weather.WeatherText);
  icon.setAttribute('class', 'icon1');

  // create a new time render element on the page //
  let timeSrc = null;
  timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';   
  time.setAttribute('src', timeSrc); 
  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather};

};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


});


