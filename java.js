document.getElementById("search-btn").addEventListener("click",()=>{
    const city=document.getElementById("search").value.trim();

    if(city==""){
        alert("Please enter a city name");
        return;
    }
getData(city);
})

    async function getData(city){
           const apikey="38e28c22b2e3a2ec32f2c8d6d14e1179";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data= await response.json();
        document.getElementById("locationvalue").textContent=`${data.name}`;
        document.getElementById("tempvalue").textContent=`${data.main.temp} `;
        document.getElementById("humidityvalue").textContent=`${data.main.humidity}`;
        document.getElementById("windvalue").textContent=`${data.wind.speed} m/s`;
        document.getElementById("icon").src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").textContent=data.weather[0].main;
                document.getElementById("description").textContent=data.weather[0].description;
        document.getElementById("feels-like").textContent=data.main.feels_like;
        document.getElementById("winddirection").textContent=`${data.wind.deg} °`;

        document.getElementById("cloudvalue").textContent=`${data.clouds.all}%`;
        const timezoneOffset = data.timezone; // in seconds

const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  timeZone: 'Asia/Kolkata'
});

const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  timeZone: 'Asia/Kolkata'
});


document.getElementById("sunrise").textContent = sunriseTime;
document.getElementById("sunset").textContent = sunsetTime;

         document.getElementById("lati").textContent=data.coord.lat;
                document.getElementById("longi").textContent=data.coord.lon;
                document.getElementById("date").textContent= new Date(data.dt*1000).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'});
                // const localTimestamp = (data.dt + data.timezone) * 1000;



    }
    catch(error){
        alert(error.message);


    }}
   



window.addEventListener("load", () => {
  getData("Delhi");
});


document.getElementById("location-btn").addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            const apikey="38e28c22b2e3a2ec32f2c8d6d14e1179";
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
            async function livedata(){
                try{
                const response= await fetch(url);
                if(!response.ok) throw new Error("failed to fetch data");
                const data= await response.json();
                document.getElementById("locationvalue").textContent=data.name;
                document.getElementById("lati").textContent=data.main.temp;
                document.getElementById("longi").textContent=data.coord.lon;
                document.getElementById("weather").textContent=data.weather[0].main;
                document.getElementById("description").textContent=data.weather[0].description;
                document.getElementById("tempvalue").textContent=data.main.temp;
                document.getElementById("feels-like").textContent=data.main.feels_like;
                document.getElementById("cloudvalue").textContent=data.clouds.all;
                document.getElementById("humidityvalue").textContent=data.main.humidity;
                document.getElementById("windvalue").textContent=`${data.wind.speed},m/s`;
                document.getElementById("icon").src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                console.log(data.name);

            } catch(error){
                alert(error.message);
            }
            }
            livedata();
        },
      error => {
       
        alert("Could not get your location, try manually instead");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser");
  }
});

    
    
