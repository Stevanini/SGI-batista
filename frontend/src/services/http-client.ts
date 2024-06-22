import { Configs } from '~/configs';
import { FetchHttpClient } from './http-client.fetch';

const httpClient = new FetchHttpClient(Configs.env.BASE_URL);

export default httpClient;
