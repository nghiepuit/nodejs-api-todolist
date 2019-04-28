const { attributes } = require("structure");

const User = attributes({
  id: String,
  firstName: String,
  lastName: String,
  middleName: String,
  email: {
    type: String,
    required: true
  },
  password: String,
  verificationCode: String,
  isVerified: Number,
  isDeleted: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date,
  roles: Array
})(
  class User {
    // isLegal() {
    //   return this.age >= User.MIN_LEGAL_AGE;
    // }
  }
);

// User.MIN_LEGAL_AGE = 21;

module.exports = User;
