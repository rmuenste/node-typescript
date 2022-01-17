export {};
const express = require('express');

const router = express.Router();

const fs = require('fs');

router.route('/').get((req : any, res : any) => {

  let portfolio: any;

  fs.readFile('./data/portfolio.json', 'utf8', function(err: any, data: any) {
      if (err) throw err;
      portfolio = data;
      res.status(200).json(portfolio);
  });

});

module.exports = router;
