async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  if (!city) {
    resultDiv.innerHTML = "Please enter a city name!";
    return;
  }
  resultDiv.innerHTML = "Fetching weather...";
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);
    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      🌡️ Temperature: ${data.main.temp}°C<br>
      🌥️ Condition: ${data.weather[0].description}<br>
      💨 Wind Speed: ${data.wind.speed} m/s
    `;
  } catch (error) {
    resultDiv.innerHTML = "City not found!";
  }
}