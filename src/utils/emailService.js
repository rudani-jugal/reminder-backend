import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.MAIL_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: "Reminder App", email: process.env.SENDER_EMAIL_ID };
    sendSmtpEmail.to = [{ email: to }];

    const result = await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent:", result.messageId);
    return result;
  } catch (err) {
    console.error("❌ Error while sending email:", err);
  }
}
