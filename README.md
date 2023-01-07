## About
A serverless function that uploads a futurama quote to botsin.space everyday.
Queries dynamodb to get the quotes, picks a random one, sends it to Mastodon, and then sets
that quote to used.