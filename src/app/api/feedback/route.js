// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// const nodemailerConfig = {
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "ivanmozzhakov@gmail.com",
//     pass: "ozurdndipkppvzqx",
//   },
// };

// export async function POST(req) {
//   const body = await req.json();
//   const { name, email, subject, comment, rating } = body;

//   const transport = nodemailer.createTransport(nodemailerConfig);
//   const mailOptions = {
//     from: "ivanmozzhakov@gmail.com",
//     to: "support@stastiem.com",
//     subject: "Feedback",
//     html: `<div>From: ${name}, ${email}</div><div>Subject: ${subject}</div><div>Comment: ${comment}</div><div>Rating: ${rating}</div>`,
//   };

//   try {
//     await transport.sendMail(mailOptions);
//     return NextResponse.json({
//       success: true,
//       message: "Feedback sent successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       success: false,
//       message: "Failed to send email",
//       error: `${error}`,
//     });
//   }
// }
