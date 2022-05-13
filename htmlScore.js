// node htmlScore.js to run code

const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scoreHTML = (str, key) => {
    str = str.toLowerCase();
    let score = 0;
    let tags = ["p", "a", "b", "strong", "i", "em", "h3", "h4", "h5", "h2", "h1", "title"];
    let statuses = [false, false, false, false, false, false, false, false, false, false, false, false];
    for (let i = 0; i<str.length-9; i++) {
        for (let j =0; j<12; j++) {
            if (str.substring(i, i+tags[j].length+2) == "<"+tags[j]+">") 
                statuses[j] = true;
        }
        for (let j =0; j<12; j++) {
            if (str.substring(i, i+tags[j].length+3) == "</"+tags[j]+">") 
                statuses[j] = false;
        }
        if (str.substring(i, i+key.length) == key) {
            for (let j =0; j<12; j++) {
                if (statuses[j]) {
                    if (j == 0)
                        score +=1;
                    else if (j == 1)
                        score +=2;
                    else if (j == 2)
                        score +=2;
                    else if (j == 3)
                        score +=2;
                    else if (j == 4)
                        score +=2;
                    else if (j == 5)
                        score +=2;
                    else if (j == 6)
                        score +=3;
                    else if (j == 7)
                        score +=3;
                    else if (j == 8)
                        score +=3;
                    else if (j == 9)
                        score +=4;
                    else if (j == 10)
                        score +=5;
                    else if (j == 11)
                        score +=10;
                }
            }
        }
    }
    return score;
}

async function scoreRemote(url, key) { 

    return fetchData(url).then( (res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        let str = $.html();
        return this.scoreHTML(str, key);
    }); 
}
module.exports.scoreRemote = scoreRemote;

async function fetchData(urlLink) {
    // make http call to url
    let response = await axios(urlLink).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}