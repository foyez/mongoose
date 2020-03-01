// _id: 5e5b3d3ed717c020c14e9f98
// 24 characters
// 2 characters = 1 byte
/* 12 bytes
  - 4 bytes: timestamp
  - 3 bytes: machine identifier
  - 2 bytes: process identifier
  - 3 bytes: counter
*/

// 1 byte = 8 bits
// 2^8 = 256 different numbers
// 2^24 = 16M different counters

// Driver creates _id for MongoDB

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid(id);
console.log(isValid);
