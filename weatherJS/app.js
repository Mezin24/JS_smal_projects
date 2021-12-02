// Init weather object
const storage = new Storage();
const ui = new UI();
const weatherLocation = storage.getLocationData().city;

const weather = new Weather(weatherLocation);

// Get weaterh when DOM load
document.addEventListener('DOMContentLoaded', getWeater);

// Change Location Event
document
  .getElementById('w-change-btn')
  .addEventListener('click', changeLocation);

function getWeater() {
  weather
    .getWeather()
    .then((results) => {
      ui.paint(results);
    })
    .catch((err) => console.log(err));
}

function changeLocation(e) {
  const city = document.getElementById('city').value;

  weather.changeLocation(city);
  storage.setLocationData(city);

  getWeater();

  ui.clearInput('#city');

  $('#locModal').modal('hide');
}

document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    document.querySelector('.modal').classList.contains('show')
  ) {
    e.preventDefault();
    changeLocation();
  }
});
