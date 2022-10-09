const models = require('../models');
const UserLogin = require('../controllers/api/session');

const verifyLogin = (req, res, next) => {
    console.log(req.body);
    if(req.body.username == undefined) {
        res.status(404).json({error: 'User not found'});
        return;
    }else if(req.body.username != undefined && req.body.password != undefined){
        next();
    }else{
        res.status(404).json({error: 'User password not match'});
        return;
    }
}

const verifyRegister = async (req, res, next) => {
    if(req.body.username != '' && req.body.username != undefined && req.body.first_name != '' && req.body.first_name != undefined && req.body.last_name != '' && req.body.last_name != undefined && req.body.email != '' && req.body.email != undefined && req.body.password != '' && req.body.password != undefined){
        let user = await models.User.findAll({
            where:{
                username : req.body.username,
                password : req.body.password
            }
        });

        if(user.length == 0){
            // res.status(444).json({error: 'jalan duluan'});
            next();
        }else{
            res.status(400).json({error: 'Username has exits'});
            return;
        }
    }else{
        res.status(406).json({error: `All collumn can't blank`});
        return;
    }
}

const authenticate = async (req, res, next) => {
    const timeLogin = 86400000; //in Date type
    if(req.params.auth == undefined){
        res.status(403).json({error: 'Access denied, user id is blank'});
        return;
    }
    let users = await models.User.findAll({
        where:{id: req.params.auth},
        include: [{ all: true, nested: true }]
    });
    req.my_data = users[0].dataValues;
    if(UserLogin.getUser(req.my_data.id) == null){
        res.status(403).json({error: 'Access denied, user id is not loggedd'});
        return;
    }else{
        let now = new Date();
        let longTime = now - UserLogin.getUser(req.my_data.id).loginTime;
        if(longTime > timeLogin){
            UserLogin.destroy(req.my_data.id);
            res.status(403).json({error: 'Access denied, user session is expired'});
            return;
        }else{
            next();
        };
    }
}

module.exports = {
    verifyLogin, verifyRegister, authenticate
}