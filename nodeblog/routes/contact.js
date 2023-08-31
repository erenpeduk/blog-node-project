const express = require('express')
const router = express.Router()

router.post('/email', (req, res) => {

    const outputHTML = `
    
            <h2>Mail Details</h2>
            <ul>
                <li>Name: ${req.body.name} </li>
                <li>Email: ${req.body.email} </li>
                <li>Phone: ${req.body.phone} </li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>`

    "use strict";
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {

            user: "erenpeduk34@gmail.com ",
            pass: "tmyjtnziflqogkjc",
        },
    });


    async function main() {

        const info = await transporter.sendMail({
            from: '"Node Proje Contact Form 👻" <erenpeduk34@gmail.com>',
            to: "",
            subject: "Node Contact Message",
            text: "Hello world?",
            html: outputHTML,
        });

        console.log("Message sent: %s", info.messageId);

        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Mesajınız başarılı bir şekilde gönderildi.'
        }

        res.redirect('/contact')
    }





    main().catch(console.error);

})

module.exports = router