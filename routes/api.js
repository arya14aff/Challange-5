const api = require('../controllers/api/index');
const middleware = require('../middleware/index');
const upload = require('../middleware/upload');

const apiRoutes = (app) => {
    app.post('/login', middleware.auth.verifyLogin, api.auth.loginController);
    app.post('/register', middleware.auth.verifyRegister, api.auth.registerController);
    app.get('/auth/:auth/logout', middleware.auth.authenticate, api.auth.logoutController);
    app.get('/cars/:driverType/:date/:time/:countPeople', api.car.publicFilter);

    app.get('/auth/:auth/cars', middleware.auth.authenticate, api.car.listAll);
    app.get('/auth/:auth/cars/:car_id', middleware.auth.authenticate, middleware.setCar.setCar, api.car.getById);
    app.get('/auth/:auth/cars/filter/:filter', middleware.auth.authenticate, api.car.filterName);
    app.get('/auth/:auth/cars/size/:size', middleware.auth.authenticate, api.car.filterSize);
    app.post('/auth/:auth/cars', middleware.auth.authenticate, middleware.setCar.upload.single('image'), middleware.setCar.setCreate, api.car.create);
    app.put('/auth/:auth/cars/:car_id', middleware.auth.authenticate, middleware.setCar.setCar, middleware.setCar.upload.single('image'), middleware.setCar.setCreate, api.car.update);
    app.delete('/auth/:auth/cars/:car_id', middleware.auth.authenticate, middleware.setCar.setCar, api.car.destroy);
}

module.exports ={
    apiRoutes,
}