'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

const bcrypt = require('bcrypt');

//START_ASYNC -do not remove notes, place code between correct pair of notes.

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed password (async):", hash);
    
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Password match result (async):", res); // should log: true
      }
    });
  }
});

//END_ASYNC

//START_SYNC

const syncHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("Hashed password (sync):", syncHash);

const syncResult = bcrypt.compareSync(myPlaintextPassword, syncHash);
console.log("Password match result (sync):", syncResult); // should log: true

//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
