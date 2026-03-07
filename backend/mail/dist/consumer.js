import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const startSendOtpConsumer = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password
        });
        const channel = await connection.createChannel();
        const queueName = "sent-otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("Mail service consumer started, listening for otp emails");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    console.log("Using Gmail:", process.env.GMAIL_USER);
                    console.log("Pass length:", process.env.GMAIL_PASS?.length);
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASSWORD,
                        },
                    });
                    await transporter.sendMail({
                        from: "Chat App",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`OTP mail sent to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("Failed to send OTP", error);
                }
            }
        });
    }
    catch (error) {
        console.log("Failed to start rabbitmq consumer", error);
    }
};
//# sourceMappingURL=consumer.js.map