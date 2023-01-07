const fetch = require('node-fetch');

const createPost = async (quote) => {
    // Set the API endpoint URL
    const apiUrl = 'https://botsin.space/api/v1/statuses';

    // Set the parameters for the new post
    const params = {
        status: quote,
        visibility: 'public'
    };

    const accessToken = process.env.MASTODON_ACCESS_TOKEN;

    // Make the request to the Mastodon API
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    // Check the status code of the response
    if (response.ok) {
        console.log('Post created successfully!');
    } else {
        console.error(`Error creating post: ${response.statusText}`);
    }
};

module.exports.createPost = createPost;
