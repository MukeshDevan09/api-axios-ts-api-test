import { AxiosHeaders } from 'axios';
import { attachment, epic, description, feature, severity, step } from "allure-js-commons";

import { getData } from '../api/api';
import { API_URLS } from '../configuration/endpoints';

interface ApiResponseItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

describe('GET API tests with headers', () => {
  beforeAll(() => {
    console.log('Setting up before all tests');
  })

  afterAll(() => {
    console.log('Cleaning up after all tests');
  })

  const url = API_URLS.COMMON_URL;
  const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });

  it('should fetch data with GET and headers contract assertion', async () => {
    epic('API Testing');
    feature('GET Requests');
    severity('critical');
    description("Get the data from DB");

    await step('Fetch data from API', async () => {
      const result = await getData(url, headers);
      const response = result.data;
      const status = result.status;
      console.log('Status:', status);

      // Validate the status code
      expect(result.status).toBe(200);

      // Assertions for contract-based validation
      expect(response).toBeArray()
      expect(response).not.toBeEmpty();

      response.forEach((item: ApiResponseItem) => {
        expect(item).toContainAllKeys(['userId', 'id', 'title', 'body']);
        expect(item.userId).toBeNumber();
        expect(item.id).toBeNumber();
        expect(item.title).toBeString();
        expect(item.body).toBeString();
      });

      // Attach the response data to the Allure report
      attachment('Response Data', JSON.stringify(response, null, 2), 'application/json');
      
      expect(response).toMatchSnapshot();
    });
  });
});
