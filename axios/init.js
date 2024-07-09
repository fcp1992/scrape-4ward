import 'dotenv/config';
import axios from 'axios'
import retry from 'axios-retry-after'

const hsAxiosClient = axios.create({
    baseURL: 'https://api.hubapi.com'
})
hsAxiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`;
hsAxiosClient.interceptors.response.use(null, retry(hsAxiosClient));

export default hsAxiosClient;