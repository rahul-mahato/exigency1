const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../config/auth');
//welcome
router.get('/', (req, res) => {
    res.render('index');
});
//redirect 
router.get('/index', (req, res) => {
    res.render('index');
})
//explore-us
router.get('/about-us-loggedout', (req, res) => {
    res.render('about-us-loggedout');
});
//loggedin home
router.get('/index-loggedin', (req, res) => {
    console.log(req.user);
    res.render('index-loggedin', {
        usertype: req.user.usertype,
        Fname: req.user.Fname,
        Lname: req.user.Lname,
        email: req.user.email,
        bloodgroup: req.user.bloodgroup,
        DOB: req.user.DOB,
        phoneno: req.user.phoneno,
        vno: req.user.vno,
        macno: req.user.macno,
        aadhaar: req.user.aadhaar,
        city: req.user.city,
        add1: req.user.add1,
        add2: req.user.add2,
        state: req.user.state,
        ecfn1: req.user.ecfn1,
        ecln1: req.user.ecln1,
        ecpn1: req.user.ecpn1,
        ecfn2: req.user.ecfn2,
        ecln2: req.user.ecln2,
        ecpn2: req.user.ecpn2,
        ecfn3: req.user.ecfn3,
        ecln3: req.user.ecln3,
        ecpn3: req.user.ecpn3,
        authNo: req.user.authNo
    });
});
//analysis page
router.get('/analysis', (req, res) => {
    res.render('analysis', {
        usertype: req.user.usertype,
        Fname: req.user.Fname,
        Lname: req.user.Lname,
        email: req.user.email,
        bloodgroup: req.user.bloodgroup,
        DOB: req.user.DOB,
        phoneno: req.user.phoneno,
        vno: req.user.vno,
        macno: req.user.macno,
        aadhaar: req.user.aadhaar,
        city: req.user.city,
        add1: req.user.add1,
        add2: req.user.add2,
        state: req.user.state,
        ecfn1: req.user.ecfn1,
        ecln1: req.user.ecln1,
        ecpn1: req.user.ecpn1,
        ecfn2: req.user.ecfn2,
        ecln2: req.user.ecln2,
        ecpn2: req.user.ecpn2,
        ecfn3: req.user.ecfn3,
        ecln3: req.user.ecln3,
        ecpn3: req.user.ecpn3,
        authNo: req.user.authNo
    });
});

//Dashboard
router.get('/dashboard', (req, res) => {
    console.log(req.user);
    res.render('dashboard', {
        usertype: req.user.usertype,
        Fname: req.user.Fname,
        Lname: req.user.Lname,
        email: req.user.email,
        bloodgroup: req.user.bloodgroup,
        DOB: req.user.DOB,
        phoneno: req.user.phoneno,
        vno: req.user.vno,
        macno: req.user.macno,
        aadhaar: req.user.aadhaar,
        city: req.user.city,
        add1: req.user.add1,
        add2: req.user.add2,
        state: req.user.state,
        ecfn1: req.user.ecfn1,
        ecln1: req.user.ecln1,
        ecpn1: req.user.ecpn1,
        ecfn2: req.user.ecfn2,
        ecln2: req.user.ecln2,
        ecpn2: req.user.ecpn2,
        ecfn3: req.user.ecfn3,
        ecln3: req.user.ecln3,
        ecpn3: req.user.ecpn3,
        authNo: req.user.authNo
    });
});

module.exports = router;