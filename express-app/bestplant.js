var apiResult = { coord: { lon: 138.93, lat: 34.97 },
weather: [ { id: 803,
main: 'Clouds',
description: 'broken clouds',
icon: '04n',
iconUrl: 'http://openweathermap.org/img/w/04n.png' } ],
base: 'cmc stations',
main: { temp: 298.15,
pressure: 1010,
humidity: 90,
temp_min: 298.15,
temp_max: 298.15 },
wind: { speed: 1.8, deg: 259 },
rain: {},
clouds: { all: 76 },
dt: 1441461206,
sys: { type: 3,
id: 10294,
message: 0.0039,
country: 'JP',
sunrise: 1441397983,
sunset: 1441443945 },
id: 1851632,
name: 'Shuzenji',
cod: 200,
list: [] };

var plants = [
//Tomatoes,16,33,50,
{
'plant':'Tomatoes'
,'temp':'16'
,'rainfall':'33'
,'Humidity':'50'
},
//Kale,13.5,55,50,
{
'plant':'Kale'
,'temp':'13.5'
,'rainfall':'0'
,'Humidity':'50'
},
//Potatoes,11,17,30,
{
'plant':'Potatoes'
,'temp':'11'
,'rainfall':'17'
,'Humidity':'30'
},
//Carrots,11,17,30,
{
'plant':'Carrots'
,'temp':'11'
,'rainfall':'17'
,'Humidity':'30'
},
//Lettuce,18,77,70,
{
'plant':'Lettuce'
,'temp':'18'
,'rainfall':'77'
,'Humidity':'70'
}
//Beetroot,11,17,30,
//Red peppers,20,60,80,
];

function isEmpty(obj) {
return Object.keys(obj).length === 0;
}

function square(x) {return x*x;}

function getBestPlantIndex(apiResult, plants)
{
var tempC = apiResult.main.temp-273.15;
var humidity = apiResult.main.humidity;
var rainfall = isEmpty(apiResult.rain)?0:apiResult.rain;
var bestScore = 99999999999;
var bestIndex = 0;
for(var i in plants)
{
var score = square(tempC-plants[i].temp)+ .2 square(rainfall-plants[i].rainfall) + .4square(humidity - plants[i].Humidity);
console.log(i)
console.log(score)
if(score<bestScore)
{
bestScore = score;
bestIndex = i;
}
}
return bestIndex
}

getBestPlantIndex(apiResult, plants)
