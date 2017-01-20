var fs = require("fs");

fs.readFile("htdocs/send/index.tgz", function (err, data) {
    if (err) throw err;
    console.log(data);
});
