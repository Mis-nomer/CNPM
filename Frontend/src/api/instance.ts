import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/model',
  withCredentials: true
})


instance.interceptors.request.use((config) => {
  if (config.method !== 'get' && config.data) {
    const urlPath = config.url || '';
    const pathParts = urlPath.split('/').filter(Boolean);
    const resourceType = pathParts[pathParts.length - 1];

    config.data = {
      data: {
        type: resourceType,
        attributes: { ...config.data }
      }
    };
  }
  config.baseURL

  return config
})

instance.interceptors.response.use((response) => {
  if (response.data !== undefined && Array.isArray(response.data?.data)) {
    const included = response.data?.included;

    response.data = (response.data?.data).map(({ attributes, id }: { attributes: any, id: number }) => ({ ...attributes, id }));
    response.data.included = included

    return response
  }
  else if (response.data) {
    const url = String(response.request.responseURL)
    if (url.includes("log")) {
      return response
    }
    response.data = { data: { ...response.data.data.attributes, included: response.data?.included, id: response.data.data.id } }
    return response
  }
  return response

})

export default instance
