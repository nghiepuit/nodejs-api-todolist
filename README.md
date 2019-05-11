## Create migrate :

npx sequelize model:generate --name category --attributes name:string

## Create seed data :

npx sequelize seed:generate --name test-categories
note: update model mapping with migration.

## Add constraint :

npx sequelize migration:generate --name CONSTRAIN_NAME

## Rules

table 2 words+ Ex: role permission => rolePermissions
Connect to model: models.file-name

## Step by step

Create Model db orm >>
Create Repository + Mapper >>
Domain >>
Serialize + Controller ( interfaces/http/modules )

## Feature

Manage User - Role - Permission
Manage Category
Manage Product - Brand - Variants - Vendor

## Awillix - module register :

1. Operation.
2. Serialize : convert data from controller to send to user.
3. Repository.
4. Model : database.
5. Repository.
