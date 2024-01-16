import nodemailer from "nodemailer";
export const sendMail=async(
    {
        from=process.env.EMAIL,
        to,
        cc,
        bcc,
        subject,
        html,
        attachments=[]
    }
)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    const info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers,
        cc:cc,
        bcc:bcc,
        subject: subject, // Subject line
        text: "", // plain text body
        html: html,
        attachments: attachments
      });
      console.log(info);
}