const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { template } = require('handlebars');
const { readHTMLFile } = require('./invitation-controller');

const sendInvitation = async (req, res, next) => {
	const { senderMail, title, message } = req.body;
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_SERVER,
			port: process.env.SMTP_PORT || 587,
			secure: process.env.SMTP_SECURE || true,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		});
		console.log(__dirname);
		readHTMLFile(
			path.join(
				__dirname,
				'../mail-body/invitation/invitaion-template1/invitation_template1.html'
			),
			async function (err, html) {
				try {
					const temp = handlebars.compile(html);
					const replacements = {
						username: senderName,
						eventName: eventName,
						link: callbackUrl,
						time: time,
						venue: venue,
						msg: msg
					};
					const htmltosend = temp(replacements);
					let info = await transporter.sendMail({
						from: 'hi@eventplanner.com',
						to: senderMail,
						subject: 'Invitation',
						text: msg,
						html: htmltosend
					});
					console.log('Message send', info.messageId);
					return res.status(200).json({ msg: 'success' });
				} catch (error) {
					console.log(error);
					return res.status(500).json({ msg: 'error' });
				}
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'error' });
	}
};

const contact = async (req, res, next) => {
	const { name, subject, email, message } = req.body;

	try {
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_SERVER,
			port: process.env.SMTP_PORT || 587,
			secure: process.env.SMTP_SECURE || true,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		});

		let info = await transporter.sendMail({
			from: process.env.EMAIL,
			to: 'imdazun@gmail.com',
			subject: subject,
			text: message,
			html: `<b>${name}</b> </br> <p>${message}</p> </br> <p>my email ${email}</p>`
		});

		readHTMLFile(
			path.join(__dirname, '../mail-body/mailrec/index.html'),
			async function (err, html) {
				try {
					const temp = handlebars.compile(html);
					const replacements = {
						name: name
					};
					const htmltosend = temp(replacements);
					let info = await transporter.sendMail({
						from: 'info@dasunx.com',
						to: email,
						subject: 'Mail confirmation',
						text: `Hello ${name}. we got your email. will contact you soon`,
						html: htmltosend
					});
					console.log('Message send', info.messageId);
					return res.status(200).json({ msg: 'success', code: 200 });
				} catch (error) {
					console.log(error);
					return res.status(500).json({ msg: 'error', code: 500 });
				}
			}
		);
	} catch (error) {
		return res
			.status(500)
			.json({ msg: 'server error Please try again' + error, code: 500 });
	}
};
exports.contact = contact;
exports.sendInvitation = sendInvitation;
