# api-axios-functional-template

## Use Arrange-Act-Assert Pattern to design your test files
- The Arrange-Act-Assert pattern is a common pattern used to structure your tests in a clear and understandable way. Here’s how it works:

  - Arrange: Set up the conditions for the test.
  - Act: Execute the code under test.
  - Assert: Verify that the code behaved as expected.

  Example: 
  ```bash
  import { AxiosHeaders } from 'axios';
  import { getData } from '../api/api';
  import { API_URLS } from '../configuration/endpoints';

  describe('GET API tests with headers', () => {
  it('should fetch data with GET and headers', async () => {
    
    //Arrange
    const url = API_URLS.COMMON_URL;
    const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });
    const expectedStatus = 200;

    // Act
    const result = await getData(url, headers);
    const response = result.data;
    const status = result.status;

    // Assert
    expect(status).toBe(expectedStatus);
    expect(response).toMatchSnapshot();
  });
});


## Folder Structure

- `.github`: Contains GitHub-specific configuration files.
- `.vscode`: Contains settings specific to the Visual Studio Code editor.
- `api`: Contains API-related code for the project.
    - `api.ts` : The main API file with various Axios methods.
- `configurations`: Contains configuration-related files
    - `endpoints.ts`: File containing endpoint definitions.
- `payload`: Contains payload data for tests.
- `tests`: Contains test files for the project’s code.
- `.babelrc.js` : Babel configuration file for setting up presets and plugins.
    - This project uses Babel to compile modern JavaScript and TypeScript code into a format compatible with the current version of Node.js. The Babel configuration is defined in the babel.config.js file and includes the following presets:
        - @babel/preset-env: This preset allows us to use the latest JavaScript features by automatically determining the necessary syntax transformations and polyfills based on the target environment. In this case, the target is set to the current version of Node.js.
        - @babel/preset-typescript: This preset enables Babel to compile TypeScript code into JavaScript, allowing us to leverage TypeScript’s type-checking and other features while maintaining compatibility with the JavaScript ecosystem.
- `.eslintrc.js`: ESLint configuration file for maintaining code quality standards.
- `jest.config.js`: Configuration file for Jest testing framework.
- `package.json`: Lists metadata relevant to the project and manages project dependencies.
- `tsconfig.json`: Configuration file for TypeScript compiler options.

## Running Tests

1. **Prerequisites**: Make sure you have Node.js and npm (Node Package Manager) installed on your system.

2. **Install Dependencies**: Open your terminal and navigate to the project root directory. Run the following command to install the required dependencies:

    ```bash
    npm install
    ```

3. To run all tests at once, use the following command:
    ```bash
    npm test
    ```

4. To run tests in a single file:
    ```bash
    npm test -- path/to/testfile.test.ts
    ```

   Replace `path/to/testfile.test.ts` with your specific test filename.

5. To run tests that match a specific pattern:
    ```bash
    npm run test:pattern "pattern"
    ```

    Example:
    ```bash
    npm run test:pattern "should fetch data with GET and headers"
    ```

## Running ESLint

To check your code for linting errors using ESLint, run the following command:

    ```bash
    npm run lint

    To automatically fix linting errors, run:  
    ```bash
    npm run lint:fix

## Debugging

- To debug your Jest tests in Visual Studio Code, use the following debug configuration:
    ```json
    {
      "version": "1.0.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Jest: current file",
          "program": "${workspaceFolder}/node_modules/.bin/jest",
          "args": ["${fileBasenameNoExtension}", "--config", "jest.config.js"],
          "console": "integratedTerminal",
          "disableOptimisticBPs": true,
          "windows": {
            "program": "${workspaceFolder}/node_modules/jest/bin/jest"
          }
        }
      ]
    }
    ```

- Steps to Debug:
  1. Open the test file you want to debug.
  2. Set breakpoints by clicking in the gutter next to the line numbers.
  3. Go to the Debug view by clicking the Debug icon in the Activity Bar on the side of the window.
  4. Select “Jest: current file” from the dropdown menu.
  5. Click the green play button to start debugging.

## Contract-Based Assertions Using jest-extended

To ensure your API responses adhere to a specific contract, you can use jest-extended for more expressive assertions.

Refer: https://jest-extended.jestcommunity.dev/docs/matchers/

## Snapshot Assertions

Snapshot testing is a powerful way to ensure your API responses remain consistent over time.

Snapshot testing involves capturing the output of a function or component and saving it to a file. This saved output is called a “snapshot.” In subsequent test runs, Jest compares the current output to the saved snapshot to check for any changes.

#### How Snapshot Testing Works:

- Initial Run:

  - When you first run your test, Jest generates a snapshot file that contains the output of your test. This file is stored in a "_ _snapshots_ _" folder next to your test file.

  - For example, if your test file is api.test.ts, the snapshot file will be named api.test.ts.snap.

- Snapshot Creation:

  - In your test, you use expect(value).toMatchSnapshot(). Jest takes the value and saves it in the snapshot file.
  - The snapshot file contains a serialized version of the value.

- Subsequent Runs:

  - On subsequent test runs, Jest compares the current output of your test to the stored snapshot.
  - If the output matches the snapshot, the test passes.
  - If the output differs, the test fails, indicating that something has changed.

- Updating Snapshots:

  - If the change in output is intentional (e.g., you updated the API response), you can update the snapshot by running Jest with the -u flag (npx jest -u).
  - This regenerates the snapshot file with the new output.

  Refer: https://jestjs.io/docs/snapshot-testing#snapshot-testing-with-jest