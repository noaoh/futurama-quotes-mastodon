const aws = require('aws-sdk');

const getQuotes = async () => {
    // Set the region
    aws.config.update({ region: 'us-east-1' });

    // Create the DynamoDB client
    const dynamodb = new aws.DynamoDB.DocumentClient();

    // Set the attribute to filter on
    const filterKey = 'is_used';
    const filterValue = false;

    // Set up the filter expression
    const filterExpression = `${filterKey} = :v1`;

    // Set up the expression attribute values
    const expressionAttributeValues = {
        ':v1': filterValue
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

const updateQuote = async (id) => {
    // Set the region
    aws.config.update({ region: 'us-east-1' });

    // Create the DynamoDB client
    const dynamodb = new aws.DynamoDB.DocumentClient();

    // Set the attribute values to update
    const attributeValues = {
        ':v1': true
    };

    // Set up the update expression
    const updateExpression = 'SET is_used = :v1';

    // Set up the key of the item to update
    const key = {
        id: {
            N: id.toString()
        }
    };

    // Set up the params for the update operation
    const params = {
        TableName: 'futurama_quotes',
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: attributeValues,
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        // Update the item
        const data = await dynamodb.update(params).promise();

        // Get the updated item
        const item = data.Attributes;

        return item;
    } catch (error) {
        console.error(error);
    }
};

module.exports.getQuotes = getQuotes;
module.exports.updateQuote = updateQuote;
