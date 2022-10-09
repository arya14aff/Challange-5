const multer = require('multer');
const models = require('../models');
const fs = require('node:fs');
const path = require('path');

// const pubDir = `/public/images/${req.my_data.id}`;
const pubDir = path.join(__dirname, '../public');
const upDir = path.join(pubDir, 'images');
    
const setup = multer.diskStorage({
    destination : function(req, file, callback){
           callback(null, upDir);
    },
    filename : function(req, file, callback){
        const uniqueIdentifier = Date.now() + '_' + Math.round(Math.random() * 1E9);
           console.log(file);
           callback(null, req.my_data.id + '_' + file.fieldname + '_' + uniqueIdentifier + path.extname(file.originalname));
     }
});

const upload = multer({storage: setup});

const setCar = (req, res, next) => {
    let cars = req.my_data.cars.filter(element => element.id == req.params.car_id && element.deleted == false);
    if(cars.length == 0){
        res.status(404).json({error: 'Car not found'});
        return;
    }else{
        req.car = cars[0];
        next();
    }
}

const uploadHandler = (req, res, next)=>{
    if(req.file != undefined){
        if(req.file.mimetype == 'image/jpeg'){
            if(req.car == undefined){
                req.body.image = `/images/${req.file.filename}`;
                req.msg = 'New uploaded file success';
            }else{
                req.car.image == '' ? '' : fs.rm(path.join(pubDir,req.car.image), (err) => {
                    console.log(err);
                });
                req.body.image = `/images/${req.file.filename}`;
                req.msg = 'Uploaded file success';
            }
        }else{
            req.msg = 'Uploaded file must be image/jpg/png';
        }
    }else{
        req.car == undefined ? req.body.image = '' : req.body.image = req.car.image;
        req.msg = 'No uploaded file detected';
    }
}


const setCreate = (req, res, next) => {
    console.log('Dijalankan set create');
    uploadHandler(req, res);

    if(req.body.name != undefined && req.body.type_car != undefined && req.body.price != undefined && req.body.available != undefined && req.body.available_at != undefined && req.body.capacity != undefined && req.body.description != undefined && req.body.transmission != undefined && req.body.year != undefined && req.body.size != undefined && req.body.name != '' && req.body.type_car != '' && req.body.price != '' && req.body.available != '' && req.body.available_at != '' && req.body.capacity != '' && req.body.description != '' && req.body.transmission != '' && req.body.year != '' && req.body.size != ''){
        // Ubah inputan bertipe angka menjadi type data number
        req.body.type_car = parseInt(req.body.type_car);
        req.body.price = parseInt(req.body.price);
        req.body.capacity = parseInt(req.body.capacity);
        req.body.year = parseInt(req.body.year);
        if(isNaN(req.body.type_car) || isNaN(req.body.price) || isNaN(req.body.capacity) || isNaN(req.body.year)){
            res.status(406).json({error: 'Field type car or price must be fill with number'});
            return;
        }
        if(req.body.available != true && req.body.available != false && req.body.available != "true" && req.body.available != "false"){
            res.status(406).json({error: 'Availablle filed must be boollean value'});
            return;
        }
        req.body.available == true || req.body.available == "true" ? req.body.available = true : req.body.available = false;
        let available_at = new Date(req.body.available_at);
        if(available_at.toDateString() == "Invalid Date"){
            res.status(406).json({error: 'Field date must be fill date and time'});
            return;
        }
        req.body.available_at = available_at;
        req.body.deleted == undefined ? req.body.deleted = false : '';
       
        next();
    }else{
        res.status(406).json({error: `Field data can't blank`});
        return;
    }
}

module.exports = {
    setCar, setCreate, upload
};