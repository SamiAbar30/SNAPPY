const { addMessages,getAllMessages} = require('../controllers/messagesController');

const router = require('express').Router();

/**
 * @openapi
 * /add-message:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/add-message',addMessages)
/**
 * @openapi
 * /get-all-messages:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/get-all-messages',getAllMessages)

module.exports=router;