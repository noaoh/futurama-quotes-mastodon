const db = require('./dynamodb');

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);

  const quotes = await db.getQuotes();
  console.log(quotes);
};
