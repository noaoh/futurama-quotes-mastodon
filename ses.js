const aws = require('aws-sdk');

// Set the region
aws.config.update({ region: 'us-east-1' });


async function sendOutOfQuotesAlert() {
    // Create the SES client
    const ses = new aws.SES();
    const myEmailAddress = process.env.MY_EMAIL_ADDRESS;

    // Set the parameters for the email
    const params = {
        Destination: {
            ToAddresses: [ myEmailAddress ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: 'You have run out of futurama quotes.'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Futurama Quotes'
            }
        },
        Source: myEmailAddress
    };

    try {
        // Send the email
        const data = await ses.sendEmail(params).promise();
    } catch (error) {
        console.error(error);
    }
}

module.exports.sendOutOfQuotesAlert = sendOutOfQuotesAlert;

