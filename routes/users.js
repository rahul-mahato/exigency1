const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//jsdom for server side dom manipulation
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const promise = require('promise');


//User Model
const User = require('../models/User');


async function findAuthNo() {
    return new promise((resolve, reject) => {
        User.find((err, docs) => {
            if (!err) {

                resolve(docs[docs.length - 1].authNo + 1);
            }
        });
    });
}


//login page
router.get('/login', (req, res) => {
    res.render('login');
})

//redirect 
router.get('/index', (req, res) => {
    res.render('index');
})

//Register page
router.get('/register', (req, res) => {
    res.render('register');
})

//Register Post Request
router.post('/register', async(req, res) => {
    console.log(req.body);

    const usertype = req.body.usertype;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const bloodgroup = req.body.bloodgroup;
    const DOB = req.body.DOB;
    const phoneno = req.body.phone;
    const vno = req.body.vno;
    //    if (!req.body.macno) {
    var macno = req.body.macno;
    // }
    const aadhaar = req.body.aadhaar;
    const city = req.body.city;
    const add1 = req.body.add1;
    const add2 = req.body.add2;
    const state = req.body.state;
    const ecfn1 = req.body.ecfn1;
    const ecln1 = req.body.ecln1;
    const ecpn1 = req.body.ecpn1;
    const ecfn2 = req.body.ecfn2;
    const ecln2 = req.body.ecln2;
    const ecpn2 = req.body.ecpn2;
    const ecfn3 = req.body.ecfn3;
    const ecln3 = req.body.ecln3;
    const ecpn3 = req.body.ecpn3;
    const authNo = await findAuthNo();
    console.log(macno);
    // return;

    let errors = [];

    //check req fields
    if (!Fname || !Lname || !email || !password || !password2 ||
        !bloodgroup || !DOB || !phoneno || !vno || !aadhaar || !city ||
        !add1 || !state || !ecfn1 || !ecln1 || !ecpn1 || !macno ||
        !ecfn2 || !ecln2 || !ecpn2 || !ecfn3 || !ecln3 || !ecpn3 || !usertype) {
        errors.push({ msg: 'Please Fill In All Fields' });
    }
    //checking type
    if (usertype != 'User With IOT Device' && usertype != 'User Without IOT Device') {
        console.log(usertype);
        errors.push({ msg: 'Please select type of registration from above two choices' });
    }
    //check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords Do not Match ' });
    }
    //check if password is 10char long 
    if (password.length < 10) {
        errors.push({ msg: 'Password should be at least 10 char long' });
    }
    //check valid bloodgroup
    if (bloodgroup != 'O+' && bloodgroup != 'O-' && bloodgroup != 'A+' &&
        bloodgroup != 'A-' && bloodgroup != 'B+' && bloodgroup != 'B-' &&
        bloodgroup != 'AB+' && bloodgroup != 'AB-' && bloodgroup != 'o+' && bloodgroup != 'o-' && bloodgroup != 'a+' &&
        bloodgroup != 'a-' && bloodgroup != 'b+' && bloodgroup != 'b-' &&
        bloodgroup != 'ab+' && bloodgroup != 'ab-' && bloodgroup != 'Bombay Group' && bloodgroup != 'bombay group') {
        errors.push({ msg: 'Enter a Valid blood group' });
    }
    if (phoneno.length > 10 || phoneno.length < 10) {
        errors.push({ msg: 'Enter a valid Number' });
    }
    if (ecpn1.length < 10 || ecpn1.length > 10 || ecpn2.length < 10 || ecpn2.length > 10 || ecpn3.length < 10 || ecpn3.length > 10) {
        errors.push({ msg: 'Enter valid emergency contact number' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            usertype,
            Fname,
            Lname,
            email,
            password,
            password2,
            bloodgroup,
            DOB,
            phoneno,
            vno,
            macno,
            aadhaar,
            city,
            add1,
            add2,
            state,
            ecfn1,
            ecln1,
            ecpn1,
            ecfn2,
            ecln2,
            ecpn2,
            ecfn3,
            ecln3,
            ecpn3
        });
    } else {
        //validation passed
        //checking users
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        usertype,
                        Fname,
                        Lname,
                        email,
                        password,
                        password2,
                        bloodgroup,
                        DOB,
                        phoneno,
                        vno,
                        macno,
                        aadhaar,
                        city,
                        add1,
                        add2,
                        state,
                        ecfn1,
                        ecln1,
                        ecpn1,
                        ecfn2,
                        ecln2,
                        ecpn2,
                        ecfn3,
                        ecln3,
                        ecpn3
                    });
                }
                User.findOne({ macno: macno })
                    .then(user => {
                        if (user && usertype != 'User Without IOT Device') {
                            //macno exists
                            errors.push({ msg: 'MACNO is already registered' });
                            res.render('register', {
                                errors,
                                usertype,
                                Fname,
                                Lname,
                                email,
                                password,
                                password2,
                                bloodgroup,
                                DOB,
                                phoneno,
                                vno,
                                macno,
                                aadhaar,
                                city,
                                add1,
                                add2,
                                state,
                                ecfn1,
                                ecln1,
                                ecpn1,
                                ecfn2,
                                ecln2,
                                ecpn2,
                                ecfn3,
                                ecln3,
                                ecpn3
                            });
                        } else {
                            const newUser = new User({
                                usertype,
                                Fname,
                                Lname,
                                email,
                                password,
                                password2,
                                bloodgroup,
                                DOB,
                                phoneno,
                                vno,
                                macno,
                                aadhaar,
                                city,
                                add1,
                                add2,
                                state,
                                ecfn1,
                                ecln1,
                                ecpn1,
                                ecfn2,
                                ecln2,
                                ecpn2,
                                ecfn3,
                                ecln3,
                                ecpn3,
                                authNo
                            });


                            //hash pasword
                            bcrypt.genSalt(10, (err, salt) =>
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    //set password to hashed 
                                    newUser.password = hash;
                                    //save the user
                                    newUser.save()
                                        .then(user => {
                                            req.flash('success_msg', 'You Are Now Registered And Can Log In');
                                            res.redirect('/users/login');
                                        })
                                        .catch(err => console.log(err));

                                }));
                        }
                    });
            });
    }
});
//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You Are Logged Out');
    res.redirect('/users/login');
});
module.exports = router;