const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (to, subject, text) => {
    const msg = {
        to: to,
        from: 'johan28@hotmail.fr',
        subject: subject,
        text: text,
        html: '<strong>et facile à faire partout, même avec Node.js</strong>',
    }
    try {
        await sgMail.send(msg)
        console.log('Email sent to ' + to + ' with subject ' + subject + ' and text ' + text)
    } catch (error) {
        console.error(`Error : ${error.message}`)

        if (error.response) {
            console.error(`Error details: ${error.response.body}`)
        }
        throw error
    }
}


exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'});
                    }
                    res.status(200).json({
                        user: {
                            userId: user._id,
                            name: user.name,
                            token: jwt.sign(
                                {userId: user._id},
                                process.env.RANDOM_TOKEN_SECRET,
                                {expiresIn: '24h'}
                            )
                        }
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.signup = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
                if (user) {
                    return res.status(400).json({message: 'Email already in use!'});
                }

                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        });
                        user.save()
                            .then((savedUser) => res.status(201).json({
                                    message: 'User created!',
                                    user: {
                                        userId: savedUser._id,
                                        name: savedUser.name,
                                        token: jwt.sign(
                                            {userId: savedUser._id},
                                            process.env.RANDOM_TOKEN_SECRET,
                                            {expiresIn: '24h'}
                                        )
                                    },
                                })
                            )
                            .catch(error => res.status(400).json({error}));
                    })
                    .catch(error => res.status(500).json({error}));
            }
        )
        .catch(error => res.status(500).json({error}));
}


exports.requestResetPassword = async (req, res, next) => {
    // Verifier que l'email existe
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Utilisateur inexistant');

    const token = jwt.sign({userId: user._id},
        process.env.RANDOM_TOKEN_SECRET,
        {expiresIn: '1h'})

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000; // Token valide 1 heure
    await user.save();

    // Envoyer le token par mail (voir documentation de votre service de mail)
    sendMail(user.email, 'Réinitialisation de votre mot de passe', `Cliquez sur ce lien pour réinitialiser votre mot de passe: $()/reset/${token}`);
    res.send('Mail envoyé');
}

exports.resetPassword = async (req, res, next) => {
    const {token, newPassword} = req.body;

    // Verifier que le token est valide
    const user = await User.findOne({
        resetToken: token,
        expireToken: {$gt: Date.now()}
    });
    if (!user) {
        return res.status(422).json({error: "Session expirée essayez à nouveau"});
    }

    // Hash le nouveau mot de passe et le sauvegarder
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined;
    user.expireToken = undefined;
    await user.save();

    res.json({message: "Mot de passe mis à jour avec succès"});
}
