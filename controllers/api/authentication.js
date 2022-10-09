const models = require('../../models');
const UserLogin = require('./session');

const loginController = async (req, res) => {
    // Lakukan login check (mohon maaf, sementara ini pakai login abal abal tidak pakai validator)
    let user = await models.User.findAll({
       where:{
        username : req.body.username,
        password : req.body.password
       }
    })
    if(user.length == 0){
        res.status(404).json({error: 'User not found'});
        return;
    } else{
        UserLogin.save(user[0].dataValues.id);
        res.status(200).json(user[0].dataValues);
        return;
    }
}

const registerController = async (req, res) => {
    models.User.create({
        username : req.body.username, 
        first_name : req.body.first_name, 
        last_name : req.body.last_name, 
        email :req.body.email, 
        password :req.body.password, 
        access_level: req.body.access_level ? 1 : 0,
    }).then((result) => {
        UserLogin.save(result.dataValues.id);
        res.status(201).json(result);
        return;
    }).catch((err) => {
        res.status(400).json({err: "Error write data to server"});
        return;
    });
}

const logoutController = (req, res) => {
    try {
        UserLogin.destroy(req.my_data.id);
        res.status(200).json({msg:'Logout Sucess'});
    } catch (error) {
        res.status(403).json({error});
    }
}

module.exports = {
    loginController, registerController, logoutController
}