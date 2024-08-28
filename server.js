const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/Union-Dreamers',{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/signup', (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, error: 'Please fill in all the fields'})
    }

    User.findOne({email}, (err, exisingUser)=>{
        if(err){
            return res.json({success: false, error: 'Error occured while checking for existing user.'})
        }

        if(exisingUser) return res.json({success: false, error: 'Email already in use.'})

        bcrypt.hash(password, 10, (err, hash)=>{
            if (err){
                return res.json({success: false, error: 'Error occured while hashing.'})
            }

            const user = new User({email, password: hash});
            user.save((err)=>{
                if(err) {
                    return res.json({success: false, error: 'Error occured while saving user.'})
                }
                res.json({success: true});
            })
    })
    })
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, error: 'Please fill in all the fields'})
    }

    User.findOne({email}, (err, user)=>{
        if(err){
            return res.json({success: false, error: 'Error occured while checking for user.'})
        }

        if(!user) return res.json({success: false, error: 'Invalid email or password'})

        bcrypt.compare(password, user.password, (err, ismatch)=>{
            if (err){
                return res.json({success: false, error: 'Error occured while hashing.'})
            }

            if(!ismatch) return res.json({success: false, error: 'Invalid email or password'})

            res.json({success: true});
    })
    })
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})






