const express = require('express');
const multer  = require('multer');
const path = require('path');

const router = express.Router();

const ChatService = require('../services/ChatService');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}.${file.mimetype.split("/")[1]}`)
  }
})

const upload = multer({ storage: storage });

router.post('/', async function(req, res, next) {
  try {

    await ChatService.createChat(req.body.message, req.body.user_id, req.body.ticket_id, req.body.group_id, req.body.attachment);

    res.sendStatus(201);
  }
  catch (err) {
    next(err)
  }
});

router.get('/:id', async function(req, res, next) {
  try {

    if(!req.params.id) {
      return res.status(400).send("Id not provided");
    }

    // await TicketService.getTicket(req.body.id);

    res.json(await ChatService.getChatByTicketId(req.params.id));
  }
  catch (err) {
    next(err)
  }
});

router.get('/group/:id', async function(req, res, next) {
  try {

    if(!req.params.id) {
      return res.status(400).send("Id not provided");
    }

    res.json(await ChatService.getChatByGroupId(req.params.id));
  }
  catch (err) {
    next(err)
  }
});

router.post('/upload', upload.single('file'), (req, res) => {
  // req.file contains information about the uploaded file
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Construct the file path
  // const filePath = path.join(__dirname, req.file.path);

  // You can save the file to a different location if needed
  // For example, move the file to the public folder
  // const publicPath = path.join(__dirname, 'uploads', req.file.filename);
  // fs.renameSync(filePath, publicPath);

  // Return the file path to the client
  res.json({ filePath: `/uploads/${req.file.filename}` });
  // res.json({ filePath: __dirname })
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