const aws = require('aws-sdk');

const getQuotes = async () => {
    // Set the region
    aws.config.update({ region: 'us-east-1' });

    // Create the DynamoDB client
    const dynamodb = new aws.DynamoDB.DocumentClient();

    // Set the attributes to filter on
    const isUsedKey = 'is_used';
    const isUsedValue = false;
    const lengthKey = 'quoteLength';
    const lengthValue = 500;

    // Set up the filter expression
    const filterExpression = `${isUsedKey} = :v1 AND ${lengthKey} <= :v2`;

    // Set up the expression attribute values
    const expressionAttributeValues = {
        ':v1': isUsedValue,
        ':v2': lengthValue
    };

    // Set up the params for the scan operation
    const params = {
        TableName: 'futurama_quotes',
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues
    };

    try {
        // Run the scan operation
        const data = await dynamodb.scan(params).promise();

        // Get the items from the response
        const items = data.Items;

        // Return the items
        return items;
    } catch (error) {
        console.error(error);
    }
};

const updateQuote = (quoteId, functionId) => {
    // Set the region
    aws.config.update({ region: 'us-east-1' });

    // Create the DynamoDB client
    const dynamodb = new aws.DynamoDB.DocumentClient();

    const query = {
        Update: {
            TableName: 'futurama_quotes',
            Key: {
                id: quoteId,
            },
            UpdateExpression: 'set is_used = :val',
            ExpressionAttributeValues: { ':val': true },
            ReturnValues: 'ALL_NEW'
        }
    }

    dynamodb.transactWrite({ 
        TransactItems: [ query ],
        ClientRequestToken: functionId
    }, (err, ignore) => {
        console.error(err);
    });
};

module.exports.getQuotes = getQuotes;
module.exports.updateQuote = updateQuote;
