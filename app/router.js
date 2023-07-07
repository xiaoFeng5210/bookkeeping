'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/user/:id', controller.home.user);
  // router.get('/users', controller.home.user)
  // router.post('/edit_user', controller.home.editUser);
  // router.post('/delete_user', controller.home.deleteUser);
  // router.post('/add_user', controller.home.addUser);

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
};
