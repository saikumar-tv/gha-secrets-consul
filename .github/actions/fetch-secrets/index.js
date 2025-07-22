const core = require('@actions/core');
const https = require('https');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const postmanMockUrl = core.getInput('postman-mock-url');
    const reactAppDir = core.getInput('react-app-dir');

    if (!postmanMockUrl.startsWith('https://')) {
      core.setFailed('Invalid URL. The Postman mock URL must start with "https://".');
      return;
    }

    const secretsToFetch = ['db_username', 'db_password', 'db_port'];
    const fetchedSecrets = {};

    const promises = secretsToFetch.map(secretName => {
      return new Promise((resolve, reject) => {
        https.get(`${postmanMockUrl}/${secretName}`, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              // The response from the mock API is just the value, not JSON
              fetchedSecrets[secretName] = data;
              resolve();
            } catch (error) {
              reject(new Error(`Failed to parse secret ${secretName}: ${error.message}`));
            }
          });
        }).on('error', (err) => {
          reject(new Error(`Failed to fetch secret ${secretName}: ${err.message}`));
        });
      });
    });

    await Promise.all(promises);

    const envContent = Object.entries(fetchedSecrets)
      .map(([key, value]) => `REACT_APP_${key.toUpperCase()}=${value}`)
      .join('\n');

    const envFilePath = path.join(reactAppDir, '.env');
    fs.writeFileSync(envFilePath, envContent);

    console.log(`Successfully wrote secrets to ${envFilePath}`);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
