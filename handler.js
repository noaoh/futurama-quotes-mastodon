const db = require('./dynamodb');
const mastodon = require('./mastodon');
const ses = require('./ses');

module.exports.run = async (event, context) => {
  console.log(`context: ${JSON.stringify(context)}`);
  console.log('Getting quotes');
  const quotes = await db.getQuotes();
  const l = quotes.length;
  const { awsRequestId: functionId } = context;
  if (l === 0) {
    console.log('Ran out of quotes, sending alert email');
    await ses.sendOutOfQuotesAlert();
  } else {
    console.log('Selecting random quote');
    const idx = Math.floor(Math.random() * l);
    const choice = quotes[idx];
    const { id: quoteId, quote } = choice;
    console.log('Creating mastodon post');
    await mastodon.createPost(quote, functionId);
    console.log('Updating DynamoDB table to show quote has been used');
    db.updateQuote(quoteId, functionId);
  }
};
