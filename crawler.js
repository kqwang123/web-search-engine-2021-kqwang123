// node crawler.js to run code

var fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

var root = "https://en.wikipedia.org/";
var urls = [root];
fetchData(root);

function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}

async function fetchData(url) {
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }

    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    const html = response.data;
    const $ = cheerio.load(html);
    var titleVar = $("title").text();
    var firstLink = $("a");
    firstLink.each(function() {
        let getUrl = $(this).attr("href");
        if (getUrl != undefined && getUrl.charAt(0) == "/") {
            if (getUrl.charAt(1) == "/") 
                getUrl = getUrl.substring(2);
            else
                getUrl = root+getUrl;
        }
        //if (getUrl != undefined && getUrl.charAt(0) != "#" && urls.length < 1000)
          //  urls.push(getUrl);
    });
    console.log(urls);
    let str = $.text();
    if (str.includes(noIndex))
        return;
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