import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { renderUrl, viteUrl } from "../../utils.js";

export const register = async (req, res, next) => {
  req.body.password = bcryptjs.hashSync(req.body.password, 10);
  req.body.role = 0;
  req.body.is_online = false;
  req.body.is_verified = false;
  req.body.verificationCode = Math.floor(100000 + Math.random() * 900000);

  try {
    const user = new User(req.body);
    user.userCount++;
    await user.save();
    return res.status(201).json({
      message: "User registred",
      
    });
  } catch (error) {
    next(error);
  }
};

export const sendVerificationEmail = async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (user.is_verified) {
    return res.status(400).json({ error: "User is already verified" });
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    const message = await transporter.sendMail({
      from: "'Mind Tech' <jdorozco94@gmail.com>",
      to: email,
      subject: "Verify account",
      html: `
      <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="m_-5401722008193577908deviceWidth" style="width:100%;min-width:100%" width="100%">
          <tbody><tr>
          <td align="center" bgcolor="#ffffff">
          
          
          
          <table border="0" cellpadding="0" cellspacing="0" class="m_-5401722008193577908deviceWidth" style="width:100%;max-width:600px" width="600">
          <tbody><tr>
          <td height="32" style="height:32px;min-height:32px;line-height:32px;font-size:1px">
          &nbsp;
          </td>
          </tr>
          
          <td height="32" style="height:32px;min-height:32px;line-height:32px;font-size:1px">
          &nbsp;
          </td>
          </tr>
          </tbody></table>
          
          
          
          
          <table border="0" cellpadding="0" cellspacing="0" class="m_-5401722008193577908deviceWidth" style="max-width:600px" width="100%">
          <tbody><tr>
          <td align="center" bgcolor="#ffffff">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody><tr>
          <td valign="top">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody><tr>
          <td style="width:13%;min-width:40px" width="13%">&nbsp;</td>
          <td align="center">
          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
          
          <tbody><tr>
          <td align="center" style="padding-top:16px">
          
          
          
          </td>
          </tr>
          
          <tr>
          <td align="center" style="padding-top:16px">
          <h1 class="m_-5401722008193577908f48" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:38px;font-weight:bold;color:#4b4b4b">
          Verify your email
          
          </h1>
          
          </td>
          </tr>
          
          <tr>
          <td align="center" style="padding-top:16px">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;font-weight:normal;color:#777777;max-width:380px;text-align:center">
          ¡Thank you for helping us make your account more secure! Click the button below to finish verifying your email.
          
          
          </p>
          
          </td>
          </tr>
          
          <tr>
          <td align="center" style="padding-top:16px">
          <div>
          
          
          <table border="0" cellpadding="0" cellspacing="0" style="width:215px;border-spacing:0;border-collapse:collapse" width="215">
          <tbody><tr>
          <td align="center" height="43" style="border-collapse:collapse;background-color:#FF5722;border-radius:9px;white-space:nowrap">
          <a href="${renderUrl}users/verify-mail/?verificationCode=${user.verificationCode}" style="display:inline-block;width:100%;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;line-height:19px;color:#ffffff;text-align:center;text-decoration:none;background-color:#FF5722;border-radius:14px;border-top:12px solid #FF5722;border-bottom:12px solid #FF5722;text-transform:uppercase" target="_blank" data-saferedirecturl>
          &nbsp;&nbsp;CONFIRM EMAIL
          &nbsp;&nbsp;
          </a>
          </td>
          </tr>
          </tbody></table>
          
          
          </div>
          
          </td>
          </tr>
          
          <tr>
          <td align="center" style="padding-top:16px">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;font-weight:normal;color:#777777;max-width:380px;text-align:center">
          ¿Didn't create an account? Contact us to remove this email address.
          
          
          </p>
          
          </td>
          </tr>
          </center>
          `,
    });

    res
      .status(200)
      .json({ message: "Verification email sent, please check your mailbox" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const verificationCode = req.query.verificationCode;
    if (!verificationCode)
      return res.status(404).json({ error: "Verify Code not found" });

    const user = await User.findOne({ verificationCode });

    if (user) {
      user.is_verified = true;

      await user.save();

      return res.redirect(viteUrl);
    } else
      res
        .status(404)
        .json({ error: "Mail verification failed, invalid token" });
  } catch (error) {
    next(error);
  }
};
