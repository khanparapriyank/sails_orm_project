# sails_orm_project

## Getting Stared

:::Project Details:::
Language: NodeJs
FrameWork: SailsJs
Database: MongoDB
ORM: Sails Waterline ORM

:::Packages/Features:::
 - Validation: Joi
 - UserAuth: bcrypt (encryption)
 - GlobalErrorHandler Support
 - Middleware for restrict entry point of APIs

To make it easy first clone project from GitHub Repository.
Afterward execute Following Command in  command prompt:

```
cd existingrepo
npm install
```

For Local mongodb setup,
 if you do not have mongodb install then install from (https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.16-signed.msi)

Run mongodb in local system. (Project will connect to localhost/local mongodb server)
NOTE: You can change connection in connection.js file from config/connection.

To run application 
```
sails lift
```

Run application with defined PORT 1337

Project Contain file [sails-model-function.postman_collection.json] file which you can import in postman and execute all APIs.

Main functionality using APIs:

1. User Signup
2. User login
3. View profile
4. Get a random joke
5. User logout

Additional functionalities using APIs: 

1. Find record using Email
2. Get all record
3. Get Total Users / Total Login Users Count
4. Change Password
5. Delete record

To help with better entry users.json file in project.
