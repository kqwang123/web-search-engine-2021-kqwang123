// node crawler.js to run code

var fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

var link = "https://en.wikipedia.org/wiki/Philosophy";

var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
fetchData(link);

function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}

async function fetchData(url) {
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    const html = response.data;
    const $ = cheerio.load(html);
    var titleVar = $("title").text();
    let str = $.text();
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var json = {
        title : titleVar,
        link : url,
        contents : str,
        time : timestamp
    };
    writeFile(json);
}