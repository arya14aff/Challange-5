const models = require('../models');
const getUser = async (id)=>{
    return await models.User.findOne({
        where:{id: id}
    })
}

const homepage = (req, res) => {
    res.render('index', {
        title : 'BINAR Rent Car | Landing Page',
        layout : 'layouts/main-layout',
    });
}
const explore = (req, res) => {
    res.render('car-search', {
        title : 'BINAR Rent Car | Explore',
        layout : 'layouts/main-layout',
    });
}

const register = (req, res) => {
    res.render('management/register',{
        layout: 'layouts/blank-layout'
    })
}

const login = (req, res) => {
    res.render('management/login', {
        layout: 'layouts/blank-layout'
    });
}

const homeManagement = (req, res) => {
    res.render('management/index', {
        layout: 'layouts/management-layout',
        userID: req.params.auth,
        title: 'Car Management',
        myData: getUser(req.params.auth),
        notify: req.query.notify,
        notifyError: req.query.error,
        filter: req.query.filter
    });
}

const update = (req, res) => {
    models.TypeCar.findAll().then(result => {
        res.render('management/update', {
            layout: 'layouts/management-layout',
            userID: req.params.auth,
            carID: req.params.car_id,
            title: 'Update Car',
            typeCars: result
        });
    });
}

const create = (req, res) => {
    models.TypeCar.findAll().then(result => {
        res.render('management/create', {
            layout: 'layouts/management-layout',
            userID: req.params.auth,
            title: 'Create Car Data',
            typeCars: result
        });
    });
}

module.exports = {
    homepage, explore, register, login, homeManagement, update, create
}