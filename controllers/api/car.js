const { Op } = require('sequelize');
const models = require('../../models');
const fs = require('node:fs');
const path = require('path');
const pubDir = path.join(__dirname, '../../public');

const create = async (req, res) => {
    await models.Car.create({
        name: req.body.name,
        type_car: req.body.type_car,
        price: req.body.price,
        available: req.body.available,
        available_at: req.body.available_at,
        deleted: req.body.deleted,
        image: req.body.image,
        user_id: req.my_data.id,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        year: req.body.year,
        size: req.body.size
    }).then((result) => {
        res.status(201).json({car : result, msg: req.msg});
        return;
    }).catch((err) => {
        res.status(400).json({error : 'Have error write your data to server '+err, msg: req.msg});
        return;
    });
}

const listAll = async (req, res) => {
    res.status(200).json({cars: req.my_data.cars});
    return;
}

const getById = (req, res) => {
    res.status(200).json({car: req.car});
    return
}

const filterName = async (req, res) => {
    let cars = await models.Car.findAll({
        where:{
            user_id: req.my_data.id,
            name: {[Op.like]: `%${req.params.filter}%`}
        },
        include: [{ all: true, nested: true }]
    });
    res.status(200).json({cars});
    return;
}

const filterSize = async (req, res) => {
    let cars = await models.Car.findAll({
        where:{
            user_id: req.my_data.id,
            size: req.params.size
        },
        include: [{ all: true, nested: true }]
    });
    res.status(200).json({cars});
    return;
}

const publicFilter = async (req, res) => {
    let driverType = req.params.driverType;
    let date = req.params.date;
    let time = req.params.time;
    let countPeople = req.params.countPeople;

    let filterer = {};

    if(driverType != '-0-'){
        driverType == 1 ? driverType = true : driverType = false;
        filterer.available = driverType;
    }
    if(date != '-0-' || time != '-0-'){
        if(date == '-0-') date = new Date().getFullYear().toString()+'-'+ new Date().getMonth().toString()+'-'+new Date().getDate().toString();
        if(time == '-0-') time = new Date().getHours().toString()+':'+new Date().getMinutes().toString()
        
        let datetime = new Date(`${date} ${time}`);
        filterer.available_at = {[Op.lte]: datetime};
    }
    if(countPeople != '-0-'){
        filterer.capacity = {[Op.gte]: countPeople};
    }

    let dataFromDB = await models.Car.findAll({where: filterer, include: [{ all: true, nested: true }]});

    res.status(200).json({cars: dataFromDB});
}

const update = async (req, res) => {

    await models.Car.update({
       //data
        name: req.body.name,
        type_car: req.body.type_car,
        price: req.body.price,
        available: req.body.available,
        available_at: req.body.available_at,
        deleted: req.body.deleted,
        image: req.body.image,
        user_id: req.my_data.id,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        year: req.body.year,
        size: req.body.size
    },
    {
        //conditions
        where: {id: req.car.id}
    }).then((result) => {
        res.status(200).json({car: result, msg: req.msg});
        return;
    }).catch((err) => {
        res.status(400).json({error : 'Have error write your data to server', msg: req.msg});
        return;
    });
}

const destroy = async (req, res) => {
    await models.Car.destroy({
        where: {id: req.car.id}
    }).then((result) => {
        fs.rm(path.join(pubDir,req.car.image), (err) => {
            console.log(err);
        });
        res.status(200).json({car: result});
        return;
    })
}

module.exports = {
    create,
    listAll,
    getById,
    update,
    destroy,
    filterName,
    filterSize,
    publicFilter,
}