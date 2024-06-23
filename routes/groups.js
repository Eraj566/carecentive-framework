const express = require('express');
const GroupService = require('../services/GroupService');
const router = express.Router();

router.get('/role/:id', async function(req, res, next) {
  try {

    if(!req.params.id) {
      return res.status(400).send("Please provide role id");
    }
    
    res.json(await GroupService.getGroupByRoleId(req.params.id));
  }
  catch (err) {
    next(err)
  }
});


module.exports = router;