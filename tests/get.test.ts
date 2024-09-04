import { AxiosHeaders } from 'axios';
import { attachment, epic, description, feature, severity, step } from "allure-js-commons";

import { getData } from '../api/api';
import { API_URLS } from '../configuration/endpoints';

describe('GET API tests with headers', () => {
  const url =  API_URLS.COMMON_URL;
  const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });

  it('should fetch data with GET and headers', async () => {
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

      // Assertions
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);

      // Validate the first item in the response
      const firstItem = response[0];
      expect(firstItem).toHaveProperty('userId', 1);
      expect(firstItem).toHaveProperty('id', 1);
      expect(firstItem).toHaveProperty('title', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
      expect(firstItem).toHaveProperty('body', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');

      // Validate the second item in the response
      const secondItem = response[1];
      expect(secondItem).toHaveProperty('userId', 1);
      expect(secondItem).toHaveProperty('id', 2);
      expect(secondItem).toHaveProperty('title', 'qui est esse');
      expect(secondItem).toHaveProperty('body', 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla');

      // Attach the response data to the Allure report
      attachment('Response Data', JSON.stringify(response, null, 2), 'application/json');

      expect(response).toMatchSnapshot({
        0: {
          id: expect.any(Number),
        },
        1: {
          id: expect.any(Number),
        },
      });
    });
  });
});
