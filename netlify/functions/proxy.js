
const axios = require('axios');

exports.handler = async (event) => {
    // This runs on the server. CORS does not apply here.
    try {
        const response = await axios.post('https://api.cobalt.tools/api/json', {
            url: "https://www.youtube.com/watch?v=2hs1wwuwc5I",
            downloadMode: "audio",
            audioFormat: "mp3"
        }, {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
