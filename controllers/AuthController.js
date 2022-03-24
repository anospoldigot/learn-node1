const { body, validationResult } = require('express-validator');
const knex = require('../config/db');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('login');
}

module.exports.loginPost = async (req, res) => {
    const user = await knex('users').where('email', req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if(user.length > 0){
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if(result){
                console.log('sukses login')
                
                req.flash('success', 'berhasil Login')

                req.session.user = {
                    email: user[0].email
                }

                return res.redirect('/profile');
            }else{
                console.log('salah password')
                return res.redirect('back');

            }
            
        });
    }else{
        console.log('salah email')
        return res.redirect('back');
        
    }
}

module.exports.logout = (req, res) => {
    req.session.destroy();

    res.redirect('login');
}