class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.cloud = document.getElementById('w-cloud');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent =
      weather.location.name + ', ' + weather.location.region;
    this.desc.textContent = weather.current.condition.text;
    this.string.innerHTML = weather.current.temp_c + ' <sup>o</sup>C';
    this.icon.setAttribute('src', 'https:' + weather.current.condition.icon);
    this.humidity.textContent = `Realitive Humidity: ${weather.current.humidity}`;
    this.cloud.textContent = `Cloud: ${weather.current.cloud} %`;
    this.feelsLike.innerHTML =
      `Feels Like: ${weather.current.feelslike_c}` + ' <sup>o</sup>C';
    this.wind.textContent = `Wind: ${weather.current.wind_mph} mp/h`;
  }

  clearInput(selector) {
    document.querySelector(selector).value = '';
  }
}
