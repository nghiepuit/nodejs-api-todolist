## Create migrate :

npx sequelize model:generate --name category --attributes name:string

## Create seed data :

npx sequelize seed:generate --name test-categories
note: update model mapping with migration.

## Steo by step

Create Model db orm >>
Create Repository + Mapper >>
Domain >>
Serialize + Controller ( interfaces/http/modules )
