const db = require('./dynamodb');
const mastodon = require('./mastodon');
const ses = require('./ses');

module.exports.run = async (event, context) => {
  const quotes = await db.getQuotes();
  const l = quotes.length;
  if (l === 0) {
    await ses.sendOutOfQuotesAlert();
    process.exit(0);
  } else {
    const idx = Math.floor(Math.random() * l);
    const choice = quotes[idx];
    const { id, quote } = choice;
    await mastodon.createPost(quote);
    await db.updateQuote(id);
    process.exit(0);
  }
};
