var fs = require('fs');

var data = {};
data.table = [];
for (i=0; i <26 ; i++){
   var obj = {
       id: i,
       square: i * i
   }
   data.table.push(obj);
}
fs.writeFile ("data.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);