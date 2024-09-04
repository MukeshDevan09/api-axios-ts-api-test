import { AxiosHeaders } from 'axios';
import { attachment, epic, description, feature, severity, step } from "allure-js-commons";

import { headData } from '../api/api';
import { API_URLS } from '../configuration/endpoints';

describe('HEAD API tests with headers', () => {
  const url = API_URLS.COMMON_URL;
  const headers = new AxiosHeaders({ 'Authorization': 'Bearer token' });

  it('should get headers with HEAD and headers', async () => {
    epic('API Testing');
    feature('HEAD Requests');
    severity('critical');
    description("Get the headers from the API using HEAD request");

    await step('Fetch headers from API', async () => {
      const result = await headData(url, headers);
      const responseHeaders = result.headers;
      const status = result.status;
      console.log('Status:', status); 

      // Validate the status code
      expect(status).toBe(200);

      // Validate the headers
      expect(responseHeaders).toHaveProperty('access-control-allow-credentials', 'true');
      expect(responseHeaders).toHaveProperty('alt-svc', 'h3=":443"; ma=86400');
      expect(responseHeaders).toHaveProperty('cache-control', 'max-age=43200');

      // Attach the response headers to the Allure report
      attachment('Response Headers', JSON.stringify(responseHeaders, null, 2), 'application/json');
    });
  });
});
