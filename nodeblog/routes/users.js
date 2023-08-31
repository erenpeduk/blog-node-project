const express = require('express')
const User = require('../models/User')
const session = require('express-session')
const router = express.Router()
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')




router.get('/register', (req,res)=>{
    res.render('site/register')
})

router.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Kullanıcı başarılı bir şekilde oluşturuldu'
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: 'erenpeduk34@gmail.com',
                pass: "tmyjtnziflqogkjc",

            }
        })

        const mailOptions = {
            from: 'erenpeduk34@gmail.com',
            to: newUser.email,
            subject: 'Güzel sevgilime...',
            html: `
            <div style="text-align: center;">
                <h1>Sevgilim ${newUser.username},</h1>
                <p>Siteme kaydolduğun için teşekkür ederim.</p>
                <p>İletişime Geçmek İçin:</p>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="https://www.instagram.com/erenpeduk/">Instagram</a></li>
                    <li><a href="https://twitter.com/erenpeduk">Twitter</a></li>
                    <li><a href="https://www.linkedin.com/in/erenpeduk/">Linkedln</a></li>
                    <li><a href="https://github.com/erenpeduk">GitHub</a></li>
                </ul>
                <p>İyi uykular dilerim! Seni çok seviyorum !</p>
            </div>
        `

        }
        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log('E-posta gönderilirken hata oluştu:', error)
            }else{
                console.log('E-posta gönderildi:', info.response)
            }
        })

        res.redirect('/users/login')
    }
    catch(error){
        console.error(error);

        res.redirect('/users/register')
    }
    
    
})

router.get("/login",(req,res)=>{
    res.render("site/login")
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.findOne({email})

        if (user){
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid) {
                req.session.userId = user._id
                res.redirect("/")
            }else{
                //Yanlis sifre durumu
                res.redirect('/users/login')
            }
        }else{
            //Kullanıcı bulunamadi durumu
            res.redirect('/users/register')
        }
    }catch(error){
        console.error(error)
        res.redirect('/users/login')
        
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
    
})







module.exports = router

 