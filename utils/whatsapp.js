const twilio = require('twilio')
const adminConfig = require('../config/config')
const {infoLogger, errorLogger} = require('./logger/index')

const ACCOUNT_ID = 'ACe3fd3972db307a1a426ed639814ec032'
const AUTH_TOKEN = '6397d54b302f357d37b3a454a97a8087'
const ADMIN_PHONE = adminConfig.ADMIN_PHONE;

const twilioClient = twilio(ACCOUNT_ID, AUTH_TOKEN);

async function adminWppMessage(msg){
    try {
        const messagePayload = {
            from:'whatsapp:+12184008573',
            to: `whatsapp:${ADMIN_PHONE}`,
            body: msg,
        }
        const messageResponse = await twilioClient.messages.create(messagePayload)
        infoLogger.info(messageResponse)
        
    } catch (error) {
        errorLogger.error(error)
    }
};

async function smsClient(phone, msg){
    try {
        const messagePayload = {
            from:'+12184008573',
            to: phone,
            body: msg,
        }
        const messageResponse = await twilioClient.messages.create(messagePayload)
        infoLogger.info(messageResponse)
        
    } catch (error) {
        errorLogger.error(error)
    }
}

module.exports={adminWppMessage, smsClient}