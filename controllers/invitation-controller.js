const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { template } = require('handlebars');

const readHTMLFile = function (path, callback) {
	fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
		if (err) {
			throw err;
		} else {
			callback(null, html);
		}
	});
};

const sendInvitation = async (req, res, next) => {
	const {
		senderMail,
		eventName,
		senderName,
		callbackUrl,
		time,
		venue,
		msg
	} = req.body;
	try {
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_SERVER,
			port: process.env.SMTP_PORT || 587,
			secure: process.env.SMTP_SECURE || false,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			},
			tls: {
				ciphers: 'SSLv3'
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
						from: process.env.EMAIL,
						to: senderMail,
						subject: 'Invitation',
						text: msg,
						html: htmltosend
					});
					console.log('Message send', info.messageId);
				} catch (error) {
					console.log(error);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};

exports.sendInvitation = sendInvitation;
