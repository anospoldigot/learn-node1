const express = require('express');
const knex = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index =  async (req, res) => {
    try{
        const data = await knex('users');
        
        res.status(200).json({
            name: 'Success',
            data
        })

    }catch(err){
        res.status(500).json({
            message: 'Server error'
        })
    }
}


module.exports.store = (req, res) =>{
    try{
        const {name, email, password} = req.body;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            await knex('users').insert({
                name, email, password: hash
            });
        });

        res.status(201).json({
            message: 'User created'
        })

    }catch(err){
        res.status(500).json({
            message: 'Server Error'
        })
    }
}


module.exports.show = async (req, res) => {

    try{
        const data = await knex('users').where('id', req.params.id);

        if(data.length < 1){
            throw new Error('Not Found') 
        }

        res.status(200).json({
            message: 'Success',
            data: data[0]
        })
    }catch(err){
        res.status(404).json({
            message: 'Not Found',
        })
    }
}


module.exports.update = async (req, res) => {
    const {name, email} = req.body;
    const data = await knex('users')
        .where('id', req.params.id)
        .update({
            name, email
        })
    
        res.status(200).json({
            message: 'Success',
            data: data
        })
}


module.exports.destroy =  async (req, res) => {
    const data = await knex('users')
        .where('id', req.params.id)
        .del()

    res.status(200).json({
        message: 'Success',
        data: data
    })
}

module.exports.profile = (req, res) => {
    res.render('profile');
}