async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "⚠️ Please enter a city name!";
    return;
  }

  resultDiv.innerHTML = "⏳ Fetching weather...";

  try {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (!data || data.cod !== 200) {
      resultDiv.innerHTML = "❌ City not found!";
      return;
    }

    const cityName = data.name;
    const temp = data.main.temp.toFixed(1);
    const condition = data.weather[0].description;
    const icon = data.weather[0].icon;
    const wind = data.wind.speed;

    resultDiv.innerHTML = `
      <h2>${cityName}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"><br>
      🌡️ <strong>${temp}°C</strong><br>
      🌥️ ${condition}<br>
      💨 Wind: ${wind} m/s
    `;

    // Save to localStorage
    const weatherData = { city: cityName, temp, condition, icon, wind };
    localStorage.setItem("lastWeather", JSON.stringify(weatherData));
  } catch (err) {
    resultDiv.innerHTML = "⚠️ Error fetching weather!";
    console.error(err);
  }
}

// Load last city weather when page opens
window.onload = () => {
  const saved = localStorage.getItem("lastWeather");
  if (saved) {
    const data = JSON.parse(saved);
    const resultDiv = document.getElementById("weatherResult");
    document.getElementById("cityInput").value = data.city;
    resultDiv.innerHTML = `
      <h2>${data.city}</h2>
      <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon"><br>
      🌡️ <strong>${data.temp}°C</strong><br>
      🌥️ ${data.condition}<br>
      💨 Wind: ${data.wind} m/s<br>
      💾 (Loaded from local storage)
    `;
  }
};
