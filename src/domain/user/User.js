const { attributes } = require('structure');

const User = attributes({
  id: Number,
  firstName: String,
  lastName: String,
  middleName: String,
  email: {
    type: String,
    required: true
  },
  password: String,
  roleId: Number,
  verificationCode: String,
  isVerified: Number,
  isDeleted: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
})(class User {

  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }

});

// User.MIN_LEGAL_AGE = 21;

module.exports = User;
