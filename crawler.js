var fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

var url = "https://en.wikipedia.org/wiki/Philosophy";
var link = '{"link":"https://en.wikipedia.org/wiki/Philosophy"}';

var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    var title = $("title").text();

    let str = $.html();

    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
});

writeFile(link);
writeFile(content);

function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(JSON.parse(data)), function(err) {
        if (err) throw err;
        }
    );
}

async function fetchData(urlLink) {
    // make http call to url
    let response = await axios(urlLink).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}