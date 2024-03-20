const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const axios = require('axios');
console.log(process.env)
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);


try{

    bot.start((ctx) => ctx.reply('Welcome to WeatherBot! Please enter the name of the city you\'d like to know the weather for.'))

    bot.on(message('text'), async (ctx) => {

        const chatId=ctx.message.chat.id;
        const userInput=ctx.message.text;

        ctx.reply(`Let me check the weather for ${userInput} `);

        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=03df0b38050c0b1ab90cdc5e68ccba3b`);
        const data=response.data;
        const weather=data.weather[0].description;
        const temperature=data.main.temp-273.15;
        const city= data.name;
        const humidity=data.main.humidity;
        const pressure=data.main.pressure;
        const windSpeed=data.wind.speed;

        const msg=`The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed()}°C.The Humidity is ${humidity}%,The pressure is ${pressure} hPa and the wind speed is ${windSpeed} m/s.` ;

        ctx.reply(msg,chatId,);
        
      })

    bot.launch();



}
    
 catch (error) {
    console.log("unexpected command")
}

