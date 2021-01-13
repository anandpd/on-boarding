import nodemailer from "nodemailer";

export const sendEmailTo = async (email, emailToken, registration = false) => {
  const link = `localhost:3000/api/auth/verify/user/${emailToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: registration ? "Activation Link" : "Activity Detected",
    html: registration
      ? `<strong>Link to activate account :</strong> <a href="${link}">${link}</a>`
      : `Someone just logged in with this email account !`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    return new Promise((resolve, reject) => {
      if (err) reject(new Error(err.message));
      resolve(data);
    });
  });
};
