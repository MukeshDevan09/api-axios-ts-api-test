import { AxiosHeaders } from 'axios';
import { attachment, epic, description, feature, severity, step } from "allure-js-commons";

import { patchData } from '../api/api';
import { data } from '../payload/patchPayload';
import { API_URLS } from '../configuration/endpoints';

describe('PATCH API tests with headers', () => {
  const url = API_URLS.PATCH_URL;
  const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });

  it('should patch data with PATCH and headers', async () => {
    epic('API Testing');
    feature('PATCH Requests');
    severity('critical');
    description("Patch data to the API using PATCH request");

    await step('Send PATCH request to API', async () => {
      const result = await patchData(url, data, headers);
      const responseData = result.data;
      const status = result.status;
      console.log('Status:', status); 

      // Validate the status code
      expect(status).toBe(200);

      // Validate the request
      expect(result.config.method).toBe('patch');
      expect(result.config.url).toBe(url);
      expect(result.config.data).toBe(JSON.stringify(data));
      expect(result.config.headers).toMatchObject(headers.toJSON());

      // Attach the response data to the Allure report
      attachment('Response Data', JSON.stringify(responseData, null, 2), 'application/json');
    });
  });
});
