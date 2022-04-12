const myScorer = require('./htmlScore');

console.log(myScorer.scoreHTML("<!DOCTYPE html><html><head><title>All about chickens</title></head><body><h1>Something about chickens</h1>" + 
"<p>This is a story about a specific chicken named Ralph.</p><h3>Ralph the chicken</h3><p>yada, yada, yada</p></body></html>", "chicken"));
myScorer.scoreRemote("https://en.wikipedia.org/wiki/Special:Random", "edit").then( (res) => {
    console.log(res);
});
