import { AxiosHeaders } from 'axios';
import { attachment, epic, description, feature, severity, step } from "allure-js-commons";

import { postData } from '../api/api';
import { data } from '../payload/postPayload';
import { API_URLS } from '../configuration/endpoints';

describe('POST API tests with headers', () => {
  const url = API_URLS.COMMON_URL;
  const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });

  it('should post data with POST and headers', async () => {
    epic('API Testing');
    feature('POST Requests');
    severity('critical');
    description("Post data to the API using POST request");

    await step('Send POST request to API', async () => {
      const result = await postData(url, data, headers);
      const responseData = result.data;
      const status = result.status;
      console.log('Status:', status); 

      // Validate the status code
      expect(status).toBe(201);

      // Validate the request
      expect(result.config.method).toBe('post');
      expect(result.config.url).toBe(url);
      expect(result.config.data).toBe(JSON.stringify(data));
      expect(result.config.headers).toMatchObject(headers.toJSON());

      // Attach the response data to the Allure report
      attachment('Response Data', JSON.stringify(responseData, null, 2), 'application/json');
    });
  });
});