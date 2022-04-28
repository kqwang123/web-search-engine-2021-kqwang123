// node crawler.js to run code

var fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

var root = "https://en.wikipedia.org/";
var urls = [root];
var json = [];

fetchData(0);

async function fetchData(index) {
    // make http call to url
    let response = await axios(urls[index]).catch((err) => console.log(err));
    if(response.status < 200 || response.status >= 300){
        console.log("Error occurred while fetching data");
        return;
    }
    var noIndex = "<meta name=\"robots\" content=\"noindex\"></meta>";
    var allowed = "https://en.wikipedia.org/w/load.php?";
    var allows = findAllows(root+"robots.txt");
    const html = response.data;
    const $ = cheerio.load(html);
    var titleVar = $("title").text();
    var links = $("a");
    links.each(function() {
        if (urls.length >= 10)
            return;
        else {
            let getUrl = $(this).attr("href");
            if (getUrl != undefined && getUrl.charAt(0) == "/") {
                if (getUrl.charAt(1) == "/") 
                    getUrl = "https:"+getUrl;
                else
                    getUrl = root+getUrl;
            }
            if (getUrl != undefined && getUrl.charAt(0) != "#" && !urls.includes(getUrl))
                urls.push(getUrl);
        }
    });
    if ($.html().includes(noIndex))
        return;
    let str = $.text();
    var today = new Date();
    var timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var addJson = {
        title : titleVar,
        link : urls[index],
        contents : str,
        time : timestamp
    };
    json.push(addJson);
    writeFile(json);
    await new Promise(r => setTimeout(r, 1000));
    if (index<9)
        fetchData(index+1);
}

function findAllows(robots) {

    

}

function findDisallows(robots) {

}

function writeFile(data) {
    fs.writeFile ("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        }
    );
}