const express = require('express');
const router = express.Router();

const TicketService = require('../services/TicketService');

const User = require('@carecentive/carecentive-core/models/User');
const userServices = require('@carecentive/carecentive-core/services/UserService')


// router.post('/', async function(req, res, next) {
//   try {

//     if(!req.body.id) {
//       return res.status(400).send("Id does not exist");
//     }

//     await TicketService.createTicket(req.body.title, req.body.description, req.body.id);

//     res.sendStatus(201);
//   }
//   catch (err) {
//     next(err)
//   }
// });

router.get('/:id', async function(req, res, next) {
  try {

    if(!req.params.id) {
      return res.status(400).send("Id not provided");
    }

    // await TicketService.getTicket(req.body.id);

    res.json(await userServices.getRoles(req.params.id));
  }
  catch (err) {
    next(err)
  }
});

// router.post('/login', async function(req, res, next) {
//   try {

//     let username = req.body.username
//     let password = req.body.password

//     if(!username) {
//       return res.status(400).send("USERNAME_NOT_PROVIDED.");
//     }

//     if(!password) {
//       return res.status(400).send("PASSWORD_NOT_PROVIDED.");
//     }

//     let token = await UserService.login(username, password)

//     res.cookie('token', token, { httpOnly: true });
//     return res.json(token);
//   }
//   catch (err) {
//     if(err.message === "INVALID_NAME_OR_PASSWORD") {
//       return res.status(401).send("INVALID_NAME_OR_PASSWORD");
//     }
//     next(err)
//   }
// });

// router.get('/logout', async function(req, res, next) {
//   try {
//     res.clearCookie('token');
//     res.end();
//   }
//   catch (err) {
//     next(err)
//   }
// });

// router.post('/changePassword', authentication.authenticateToken, async function(req, res, next) {
  
//   try {
//     let userId = req.authData.user_id;

//     if (!req.body.newPassword || req.body.newPassword === 0) {
//       return res.status(400).send("NEW_PASSWORD_NOT_PROVIDED");
//     }

//     UserService.changePassword(userId, req.body.newPassword);

//     // Hash password
//     let newPasswordHash = await bcrypt.hash(req.body.newPassword, 12)

//     await User.query().patch({
//       password_hash: newPasswordHash
//     }).findById(userId);

//     res.sendStatus(200);
//   }
//   catch (err) {
//     next(err)
//   }
// });

module.exports = router;