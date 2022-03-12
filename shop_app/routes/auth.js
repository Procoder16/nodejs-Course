const express = require('express');
const User = require('../models/user');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        body('email').isEmail()
            .withMessage('Please enter a valid email address.')
            .custom((value, { req }) => {
                User.findOne({ email: value })
                    .then(userDoc => {
                        if (!userDoc) {
                            return Promise.reject('Email doesn\'t exist.');
                        }
                    });
            }),
        body('password', 'Password has to be valid.')
        .isLength({min: 5})
        .isAlphanumeric()
    ],
    authController.postLogin
);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                // if (value === 'test@test.com') {
                //     throw new Error('This email is forbidden!');
                // }
                // return true;
                User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('E-Mail exists already, please pick a different one.');
                        }
                    });
            }),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        ).isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.email) {
                return new Error('Passwords have to match.');
            }
            return true;
        })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
