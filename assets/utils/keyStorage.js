import { getGenericPassword, setGenericPassword, resetGenericPassword, setInternetCredentials, getInternetCredentials, resetInternetCredentials } from 'react-native-keychain'
import { appConfig } from '../config/app'

/**
 * Stores the encrypted credentials via Keystore(iOS) or Keychain(Android)
 */

export const setToStorage = (username, password) => {
  return setGenericPassword(username, password);
}

export const getFromStorage = async () => {
  try {
    const { username, password } = await getGenericPassword();
    return {
      address: username,
      privateKey: password,
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    }
  }
}

export const setCredentials = async (server, username, password) => {
  await setInternetCredentials(server, username, password)
}

export const getCredentials = async (server) => {
  try {
    const { username, password } = await getInternetCredentials(server)
    return {
      username,
      password,
    }
  } catch (error) {
    return {
      error: true,
      message: error,
    }
  }
}

export const resetCredentials = () => {
  resetInternetCredentials(appConfig.tokenSlugs.access)
  resetInternetCredentials(appConfig.tokenSlugs.refresh)
}

export const resetStorage = async () => {
  return await resetGenericPassword()
}
