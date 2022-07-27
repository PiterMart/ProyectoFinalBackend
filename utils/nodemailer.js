const nodemailer = require('nodemailer')
const {adminWppMessage, smsClient} = require('./whatsapp')
const adminConfig = require('../config/config')
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const {infoLogger, errorLogger, consoleLogger} = require('./logger/index')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: 'pitermartingaste@gmail.com',
        pass: 'rxcrvuzuubhdlkpx'
    }
});

async function newRegister(newUser){
    try {
        const mailPayload = {
            from: 'Hex Commerce',
            to: adminConfig.ADMIN_EMAIL,
            subject:`Your user has been succesfully created`,
            html:`
            <html>
                <body>
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title"> Nombre: ${newUser.name}</h5>
                            <p class="card-text"> Email: ${newUser.email}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> Direccion: ${newUser.address}</li>
                            <li class="list-group-item"> Carrito ID: ${newUser.cart}</li>
                            <li class="list-group-item">Telefono: ${newUser.phone}</li>
                        </ul>
                    </div>
                </body>
            </html>`,
        };
        await transporter.sendMail(mailPayload);
    } catch (error) {
        throw error
    }
}

async function newPurchase(user,cart){
    try {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/cartList.hbs"), "utf8")
        const template = handlebars.compile(emailTemplateSource)
        const htmlToSend = template({cart})

        const subjectString = `New order from ${user.name}. Email: ${user.email}`
        const mailPayload = {
            from: 'Ecommerce Martingaste',
            to: adminConfig.ADMIN_EMAIL,
            subject: subjectString,
            html:htmlToSend,
        };
        const mailInfo = await transporter.sendMail(mailPayload);
        const wppInfo = await adminWppMessage(subjectString)
        const customerSms = await smsClient(user.phone, `Hola ${user.name}! Su pedido ha sido recibido y está ahora en proceso. Gracias!`)
        return true
    } catch (error) {
        errorLogger.error(error)
    }
}


module.exports={newRegister, newPurchase}

