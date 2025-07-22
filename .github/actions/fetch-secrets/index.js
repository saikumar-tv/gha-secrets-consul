const core = require('@actions/core');
const https = require('https');

async function run() {
  try {
    const postmanMockUrl = core.getInput('postman-mock-url');

    https.get(postmanMockUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const secrets = JSON.parse(data);
        core.setOutput('secret-one', secrets.SECRET_ONE);
        core.setOutput('secret-two', secrets.SECRET_TWO);
      });

    }).on('error', (err) => {
      core.setFailed(err.message);
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
