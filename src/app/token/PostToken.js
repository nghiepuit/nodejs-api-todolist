/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token');

const Operation = require('src/app/Operation');

class PostToken extends Operation {
  constructor({ usersRepository, jwt }) {
    super();
    this.usersRepository = usersRepository;
    this.jwt = jwt;
  }

  async execute(body) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    try {
      const credentials = Token(body);
      const userCredentials = await this.usersRepository.findOne({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'middleName',
          'email',
          'password',
          'roleId',
          'isDeleted',
          'createdBy'
        ],
        where: {
          email: credentials.email,
          isDeleted: 0
        }
      });
      const validatePass = this.usersRepository.validatePassword(
        userCredentials.password
      );

      if (!validatePass(credentials.password)) {
        throw new Error('Invalid Credentials');
      }
      const signIn = this.jwt.signin();
      const data = {
        token: signIn({
          id: userCredentials.id,
          firstName: userCredentials.firstName,
          lastName: userCredentials.lastName,
          middleName: userCredentials.middleName,
          email: userCredentials.email
        })
      };

      this.emit(SUCCESS, data);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

PostToken.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = PostToken;
