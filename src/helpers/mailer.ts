import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({email , emailType , userId}:any) => {
    try{
        const hashedToken = await bcrypt.hash(userId.toString() , 10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId ,
                {verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 3600000})
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId ,
                {forgotPasswordToken : hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000})
        }
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "08dde0e5a5e3a1",
            pass: "1d9498398d3166"
        }
    });
        const mailOptions = {
            from: 'archishmana@gmail.com',
            to : email,
            subject : emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html : `<p>Click <a href="${'http://localhost:3000'}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ? "Verify your email" : 'Reset your passwprd'}</p>`
        }
       const mailResponse = await transport.sendMail(mailOptions)
       return mailResponse
    }catch(error:any){
        throw new Error(error.message)
    }
}