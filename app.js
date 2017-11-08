var express = require("express");
var app = express();
app.use(express.static(__dirname));
// console.log('test2'+test)
// console.log('test'+ express.static(__dirname + '/app'));
var port = process.env.PORT || 3000;
// app.listen(port);
app.listen(port, function() {
  console.log("Server is running at port " + port);
});
