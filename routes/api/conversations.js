var express = require('express');
var router = express.Router();
var fs = require('fs'); 
var multer = require('multer'); 
var upload = multer();

router.post('/', upload.array(), function(req, res, next) {

  //messages from first conversation (hardcoded):  
	var messages = res.locals.conversations[0].messages; 

  //text input from user: 
  var content = req.body.content;

  //data to update ("to" and "from" hardoded):
  var newMessage = {
      "id": messages.length + 1,
      "to": "Suzy",
      "from": "Me",
      "content": content
    }

	var fileName = './api/conversations.json';
  var file = res.locals.conversations; 

  //add new message to messages array:
	file[0].messages.push(newMessage);

  //write updated file to conversations.json:
  fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
    console.log('Wrote ' + JSON.stringify(file, null, 2));
  });

  res.send(file);

});


module.exports = router;