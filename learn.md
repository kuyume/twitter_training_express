# 勉強になったこと

- if you didn't mentioned any PORT in URL, it's set 80 as default by browser action

- DON'T FORGET write "type": "module" in package.json when you use "ESM(ES Modules)".

- to write '/:anyParams' in express router, you can use URL params. and it can be handled in object 'req.params.anyParams'.

- if you nest express router,
to write option { mergeParams: true } in NESTED router building, you can inherit outer router's params.

- DON'T WORKING you write 'module.js' to import modules,
you need to write './module.js'.

- **NEVER FORGET TO REFRESH WHITE IP LIST IN MONGODB CLOUD**

- **DON'T WORKING CREATE INDEX AFTER ADD ANY SCHEMA**

- **CONFIRM TESTS AROUND DB SCHEMA**

- when you define any function about model, at first found model can be many or not

# PENDING

- learn difference between save(), create() and insert() in mongoose

- learn to make unique key with createIndex instead of ensureIndex. and what's is index ???

- learn to use instance of MongoError in catch error