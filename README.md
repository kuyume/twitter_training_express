# 開発用メモ

## やったこと

- initialize
  - npm init
  - express install
  - nodemon install
  - add start cmd in npm script by nodemon

- write index.js
  - import express module
  - build express server instance
  - listen initial port at 2500
  - build route (/)
  - prepare for importing user router from "/router/user.js"
  - import user router

- write user router (/router/user.js)
  - build user router instance

- write index.js
  - apply user router under '/user' path (/user)

- write user router
  - build route (/user/register) 
  - build route (/user/:userId)

- write user detail router
  - build user detail router WITH user router params (/user/:userId)
  - build route (/user/:userId/posts)
  - build route (/user/:userId/profile)

- write user router
  apply user detail router under '/user/:userId' (/user/:userId)

- prepare using model
  - install mongoose
  - setup mongoDB cloud

- write models
  - write user model (/model/userModel.js)
  - apply user model in userModel.js

- write index.js
  - initialize DB connection with token, options, function

- write user registration logic in userRouter.js
  - 


