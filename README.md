# GHA Secrets Demo

This project demonstrates a secure way to fetch secrets from a Postman mock server and use them in a React application during a GitHub Actions CI/CD pipeline. The React application is then deployed to GitHub Pages.

## How it Works

1.  **Postman Mock Server**: A Postman collection is used to create a mock server that serves predefined secrets. This allows us to simulate an external secret management service.
2.  **Custom GitHub Action**: A custom action is created in this repository. This action is responsible for fetching the secrets from the Postman mock server URL.
3.  **React Application**: A standard React application is set up to read the secrets from environment variables at build time and display them in the UI.
4.  **GitHub Actions Workflow**: The main workflow file (`.github/workflows/deploy.yml`) orchestrates the entire process:
    *   It checks out the code.
    *   It runs the custom action to fetch the secrets.
    *   It builds the React application, injecting the fetched secrets as environment variables.
    *   It deploys the built application to GitHub Pages.

## Setup Instructions

1.  **Create a Postman Mock Server**:
    *   Create a new collection in Postman.
    *   Add a new request to the collection.
    *   In the request, create an example response with a JSON body containing your secrets. For example:
        ```json
        {
          "SECRET_ONE": "This is the first secret",
          "SECRET_TWO": "This is the second secret"
        }
        ```
    *   Create a mock server for this collection.
    *   Copy the mock server URL.

2.  **Create GitHub Repository Secrets**:
    *   In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
    *   Create a new repository secret named `POSTMAN_MOCK_URL` and paste the Postman mock server URL as the value.

3.  **Enable GitHub Pages**:
    *   In your GitHub repository, go to `Settings` > `Pages`.
    *   Under `Build and deployment`, select `GitHub Actions` as the source.

Once you have completed these steps, any push to the `main` branch will trigger the GitHub Actions workflow, build the React app with the secrets, and deploy it to GitHub Pages.
