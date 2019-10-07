import jwt from "jsonwebtoken";
import * as CryptoJS from "crypto-js";
const nodemailer = require('nodemailer');

/**
 * Function for creating response
 * @param {*} data (status, data, token)
 * @param {*} return (encrypted data)
 */
export let responseGenerator = (code: any, message: any, data: any = '') => {
    var details = {
      code: code,
      message: message,
      result: data
    };

    return details;
  
}


/**
 * Function for Encrypting the data
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
export let encryptData = (data: any) => {
  if (status === 'development') {
    return data;
  } else {
    var dataString = JSON.stringify(data);
    var response = CryptoJS.AES.encrypt(dataString, process.env.CRYPTO_KEY!);
    return { encResponse: response.toString() };
  }
}

/**
 * Function for decrypting the data
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypt data)
 */
export let decryptData = (data: any) => {
  if (status === 'development') {
    return data;
  } else {
    var decrypted = CryptoJS.AES.decrypt(data, process.env.CRYPTO_KEY!);
    if (decrypted) {
      var userinfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return userinfo;
    } else {
      return { userinfo: { error: 'Please send proper token' } };
    }
  }
}

/**
 * Function for Encrypting the password
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
export let encryptPassword = (data: any) => {
  var response = CryptoJS.AES.encrypt(data, process.env.TOKEN_KEY!);
  return response.toString();
}

/**
 * Function for decrypting the password
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypt data)
 */
export let decryptPassword = (data: any) => {
  var decrypted = CryptoJS.AES.decrypt(data, process.env.TOKEN_KEY!);
  if (decrypted) {
    var userinfo = decrypted.toString(CryptoJS.enc.Utf8);
    return userinfo;
  } else {
    return { userinfo: { error: 'Please send proper token' } };
  }
}

/**
 * Function for encryting the userId with session
 * @param {*} data (data to encrypt)
 * @param {*} return (encrypted data)
 */
export let tokenEncrypt = async(data: any) => {
  var token = await jwt.sign({ data: data }, process.env.TOKEN_KEY!, {
    expiresIn: 24 * 60 * 60
  }); // Expires in 1 day
  return token;
}

/**
 * Function for decryting the userId with session
 * @param {*} data (data to decrypt)
 * @param {*} return (decrypted data)
 */
export let tokenDecrypt = async (data: any) => {
  try {
    const decode = await jwt.verify(data, process.env.TOKEN_KEY!);
    return decode;
  } catch (error) {
    return error;
  }
}


/**
 * Function for sending email
 * @param {*} data (to, sub)
 * @param {*} return (decrypted data)
 */
export let sendEmail = async(to: string , subject: string , message: string) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL_ADDRESS,
      pass: process.env.SMTP_PWD
    }
  });

  var mailOptions = {
    from: process.env.SMTP_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: message
  };

  try {
    const smsDetails = await transporter.sendMail(mailOptions);
    return smsDetails;
  } catch (error) {
    return error;
  }
}

// /**
//  * Function to randomly generate string
//  * param
//  * return (err, result)
//  */
// function generateRandomString(callback) {
//   var referralCode = randomstring.generate({
//     length: 9,
//     charset: 'alphanumeric',
//     capitalization: 'uppercase'
//   });

//   callback(referralCode);
// }
