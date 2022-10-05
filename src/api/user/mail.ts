const nodemailer = require('nodemailer');
const mailConfig = require('../config/mailSendConfig');

const mailSender = {
    // 메일발송 함수
    //네이버, 구글, 야후, 
    //사용하기 전에 아이디 비밀번호를 설정한 후 -> 메일에서 smtp 사용하기로 설정
    sendGmail: (param:any) => {
      const serviceName = param.service;
      const transporter = nodemailer.createTransport({
        service: serviceName,   // 메일 보내는 곳
        // port: 587,
        host: 'smtp.naver.com',
        auth: {
          user: "",  // 보내는 메일의 주소
          pass: ""   // 보내는 메일의 비밀번호
        }
      });
      // 메일 옵션
      const mailOptions = {
        from: "", // 보내는 메일의 주소
        to: param.toEmail, // 수신할 이메일
        subject: param.subject, // 메일 제목
        text: param.text // 메일 내용
      };
      
      // 메일 발송
      transporter.sendMail(mailOptions, function (error:String, info:any) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    }
  }
  
  module.exports = mailSender;