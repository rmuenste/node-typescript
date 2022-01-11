const express = require('express');

const router = express.Router();

const fs = require('fs');


router.route('/').get((req : any, res : any) => {

  let marketData: any;

  fs.readFile('./data/market.json', 'utf8', function(err: any, data: any) {
      if (err) throw err;
      marketData = data;
      res.status(200).json(marketData);
  });

});

module.exports = router;