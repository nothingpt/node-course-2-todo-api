// const { SHA256 } = require('crypto-js');
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }

// const jwt = require('jsonwebtoken');
//
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123qwe');
// // console.log(token);
//
// var decoded = jwt.verify(token, '123qwe');
// console.log('decoded', decoded);

const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('hash: ' + hash);
  });
});

var hashedPassword = '$2a$10$lCCYl9AN4qLz.U67LItxReSUsR0WN2nHoybgUTRgwt2C5oIXbOIRi';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})
