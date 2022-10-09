const ctrl = require('../controllers/index');

const webRoutes = (app) => {
    app.get('/', ctrl.homepage.homepage);
    app.get('/cars', ctrl.homepage.explore);
    app.get('/register-page', ctrl.homepage.register);
    app.get('/login-page', ctrl.homepage.login);
    app.get('/auth/:auth/cars-dashboard', ctrl.homepage.homeManagement);
    app.get('/auth/:auth/cars/:car_id/update-page', ctrl.homepage.update);
    app.get('/auth/:auth/cars-dashboard/create-page', ctrl.homepage.create);
}

module.exports = {
    webRoutes
}