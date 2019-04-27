/**
 * this file will hold all the get use-case for user domain
 */
const Operation = require("src/app/Operation");
const User = require("src/domain/user/User");

class Register extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(email, password) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const user = new User({
      email,
      password
    });
    try {
      const newUser = await this.usersRepository.register(user);
      this.emit(SUCCESS, newUser.id);
    } catch (error) {
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

Register.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = Register;
