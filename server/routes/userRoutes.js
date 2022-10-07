const { register,login,setAvatar,allUsers} = require('../controllers/userController');

const router = require('express').Router();
router.post('/register',register)
router.post('/login',login)
router.post('/set-avatar/:id',setAvatar)
/**
 * @openapi
 * /all-users/:id:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/all-users/:id',allUsers)
module.exports=router;