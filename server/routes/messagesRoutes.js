const { addMessages,getAllMessages} = require('../controllers/messagesController');

const router = require('express').Router();
router.post('/add-message',addMessages)
router.post('/get-all-messages',getAllMessages)
module.exports=router;