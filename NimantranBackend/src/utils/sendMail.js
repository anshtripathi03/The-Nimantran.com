import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config({
  path:"../../.env"
})


const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.COMP_EMAIL,
    pass:process.env.COMP_PASS,
  }
}
)

const sendEmail = (email,subject,data)=>{transporter.sendMail({
 from:`"TheNimantran.com" ${""}`,
 to:email,
 subject:subject,
 html:`<p>    ${data}     </p>`




})
         
};

export {sendEmail}