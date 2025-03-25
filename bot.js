/*import fetch from 'node-fetch';

const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ad55dec050msh3b20d03711d1f1fp1fcd4fjsne2ed26002d0d',
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
    */

import fs from 'fs';//perchè da problemi di compatibilità il require su  es6
import TelegramBot from 'node-telegram-bot-api';
const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk';

const conf = JSON.parse(fs.readFileSync('conf.json'));
const token = conf.key;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
   const chatId = msg.chat.id;
   const text = msg.text;

   if (text === "/start") {
      bot.sendMessage(chatId, "fornisci genere film");
   }

   if(text !== "/start"){
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ad55dec050msh3b20d03711d1f1fp1fcd4fjsne2ed26002d0d',
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        bot.sendMessage(chatId, result);
    } catch (error) {
        console.error(error);
    }
   }
   
});