class Weather {
  constructor(city) {
    this.apiKey = 'd563f3959f134d3aa87200121210212';
    this.city = city;
  }

  // Fetch Weather from API

  async getWeather() {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=no`
    );
    const responseData = await response.json();
    return responseData;
  }

  //  Change weather location
  changeLocation(city) {
    this.city = city;
  }
}
