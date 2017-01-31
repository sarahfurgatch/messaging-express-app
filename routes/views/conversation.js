var express = require('express')
var router = express.Router()

/* GET conversation by id */
router.get('/:id', function(req, res, next) {
	res.locals.conversations.forEach(function(conversation){
	    if (req.params.id == conversation.id){
	      res.render('conversation', { title: 'Flairbnb', conversation: conversation});
	    }
  	})
});

module.exports = router