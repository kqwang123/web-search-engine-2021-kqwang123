var fs = require('fs');

var data = '{"count" : 1,\n "stack" : "sometext"}';

console.log(JSON.parse(data));
function writeFile() {
    fs.writeFile ("data.json", JSON.stringify(JSON.parse(data)), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
}

writeFile();