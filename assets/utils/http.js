import axios from "axios";
import { appConfig } from "../config/app";
import { getCredentials } from './keyStorage';

const APP_PLATFORM = "Mobile";

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1
  }
});

export async function setupHttpConfig() {
  request.defaults.baseURL = appConfig.apiBaseUrl;
  request.defaults.timeout = appConfig.defaultTimeout;
  axios.defaults.headers["Content-Type"] = "application/json";
  
  // debuggers
  request.interceptors.request.use(request => {
     console.log('[axios:request]', request)
    return request
  })
  request.interceptors.response.use(response => {
     console.log('[axios:response]', response)
    return response
  }, error => {
    console.warn('[axios:error]', error,error?.message)
    console.warn('[axios:error.response]', error?.response)
    return Promise.reject(error?.response == undefined ? error :error?.response)
  })

  await updateAccessKey()
}

export async function getToken() {
  try {
    const access = await getCredentials(appConfig.tokenSlugs.access);
    return access?.password;
  } catch (error) {
    return null;
  }
}
export async function updateAccessKey() {
  console.log('[updateAccessKey]')
  // get access token if exists
  try {
    const access = await getCredentials(appConfig.tokenSlugs.access)
    if (access.password !== undefined) {
      request.defaults.headers.common['Authorization'] = `token ${access.password}`
    } else {
      request.defaults.headers.common['Authorization'] = null
    }
    console.log('[updateAccessKey.http.access]', access.password)
  } catch (error) {
    console.warn('[updateAccessKey.http.getCredentials]', error)
    request.defaults.headers.common['Authorization'] = null
  }
}

