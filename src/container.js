const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");

const config = require("../config");
const Application = require("./app/Application");
const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
} = require("./app/user");

const { PostToken, Register } = require("./app/token");

const UserSerializer = require("./interfaces/http/user/UserSerializer");

const Server = require("./interfaces/http/Server");
const router = require("./interfaces/http/router");
const auth = require("./interfaces/http/auth");

const loggerMiddleware = require("./interfaces/http/logging/loggerMiddleware");
const errorHandler = require("./interfaces/http/errors/errorHandler");
const devErrorHandler = require("./interfaces/http/errors/devErrorHandler");
const swaggerMiddleware = require("./interfaces/http/swagger/swaggerMiddleware");

const encryption = require("./infra/encryption");
const logger = require("./infra/logging/logger");
const SequelizeUsersRepository = require("./infra/repositories/user/SequelizeUsersRepository");
const jwt = require("./infra/repositories/jwt");

/**
 * Model
 */

const {
  database,
  user: UserModel,
  role: RoleModel,
  permission: PermissionModel,
  userrole: UserRoleModel
} = require("./infra/database/models");

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    auth: asFunction(auth).singleton(),
    jwt: asFunction(jwt).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config),
    encryption: asValue(encryption)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel),
  RoleModel: asValue(RoleModel),
  PermissionModel: asValue(PermissionModel),
  UserRoleModel: asValue(UserRoleModel)
});

// Operations
container.register({
  // user
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser),
  // token
  postToken: asClass(PostToken),
  register: asClass(Register)
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer)
});

module.exports = container;
