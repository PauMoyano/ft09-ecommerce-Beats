require('dotenv').config();
const { Newsletter,Product } = require("../db");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;
const path = require("path");
const {
    getAllProducts,
} = require("../controllers/products/get.products");

let emailList = []
// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || '1234' // TODO: your gmail password
    }
});
transporter.use('compile', hbs(
    {
        viewEngine: {
            partialsDir: "./views",
            defaultLayout: ""
        },
        viewPath: "./views",
        extName: ".hbs"
    }

));

module.exports = {

    sendMail: async function () {

        await Newsletter.findAll({
            attributes: ["email"],
            raw: true
        }).then(list => {
            emailList = list.map(email => email.email)
            log(emailList)
        }).then(() => {
            Product.findAll({
                raw: true
            }).then((products) => {
                let dbProducts=products.reverse().splice(0,6)
                console.log(dbProducts)
                let mailOptions = {
                    from: 'beatstars@mail.com', // TODO: email sender
                    to: emailList, // TODO: email receiver
                    subject: 'Beatstore',
                    template: 'Template_for_Nesletter',
                    text: "here are the newsletters",
                    context: {
                        products:dbProducts,
                        product1:dbProducts[0],
                        product2:dbProducts[1],
                        product3:dbProducts[2],
                        product4:dbProducts[3],
                        product5:dbProducts[4],
                        product6:dbProducts[5],
                    },
                    attachments: [
                        {
                            filename: 'logo.png',
                            path: path.join(__dirname, '../../uploads/logo.png'),
                            cid: 'logo'
                        },
                        {
                            filename: dbProducts[0].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[0].image),
                            cid: 'first'
                        },
                        {
                            filename: dbProducts[1].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[1].image),
                            cid: 'second'    
                        },
                        {
                            filename: dbProducts[2].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[2].image),
                            cid: 'third'
                        },
                        {
                            filename: dbProducts[3].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[3].image),
                            cid: 'four'
                        },
                        {
                            filename: dbProducts[4].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[4].image),
                            cid: 'fifth' 
                        },
                        {
                            filename: dbProducts[5].image,
                            path: path.join(__dirname, '../../uploads/',dbProducts[5].image),
                            cid: 'six'
                        }
        
                    ],
                };
        
                // Step 3
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return log('Error occurs' + err);
                    }
                    return log('Email sent!!!');
                });
            })

        })



    }

}