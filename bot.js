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
    let url=`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=`+text+`&country=uk`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ad55dec050msh3b20d03711d1f1fp1fcd4fjsne2ed26002d0d',
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
let msg="";
       //bot.sendMessage(chatId,result);
       for(let i=0;i<result.results.length;i++){
msg+="titolo: "+(result.results[i].name)+"\n";
for(let j=0;j<result.results[i].locations.length;j++){
    msg+="url: "+(result.results[i].locations[j].url)+"\n";
}

       }
       bot.sendMessage(chatId,msg);
    } catch (error) {
        console.error(error);
    }
   }
   
});
/*
function formattazione(r){
let platform=[];
let link=[];
let x=r.results;
let location=
for(let i=0; i<4;i++){
    platform.push(r.results[i].locations[i].display_name)
    link.push(r.results[i].locations[i].url)
}
}
*/
/*
function formatMovieData(data) {
    let formattedData = [];
    
    data.results.slice(0, 4).forEach(movie => {
        let movieEntry = {
            nomeFilm: movie.name,
            link: [],
            piattaforma: []
        };
        
        if (movie.locations) {
            movie.locations.forEach(location => {
                movieEntry.link.push(location.url);
                movieEntry.piattaforma.push(location.display_name);
            });
        }
        
        formattedData.push(movieEntry);
    });
    
    return formattedData;
}
    */