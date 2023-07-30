import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteItemAsync,
  getItemAsync,
  isAvailableAsync,
  setItemAsync,
} from "expo-secure-store";

export const saveDataAsyncStorage = async (
	key: string,
	value: string,
): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		return;
	}
};

export const getDataAsyncStorage = async (key: string): Promise<any> => {
	try {
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch (error) {
		return;
	}
};

export const removeDataAsyncStorage = async (key: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {}
};

export const saveDataSecureStorage = async (
	key: string,
	value: string,
): Promise<void> => {
	try {
		await setItemAsync(key, value);
	} catch (error) {
		return;
	}
};

export const getDataSecureStorage = async (key: string): Promise<any> => {
	try {
		const value = await getItemAsync(key);
		return value;
	} catch (error) {
		return;
	}
};

export const removeDataSecureStorage = async (key: string): Promise<void> => {
	try {
		await deleteItemAsync(key);
	} catch (error) {}
};

export const saveEncryptedDataAsyncStorage = async (
	key: string,
	value: string,
): Promise<void> => {
	const secureStoreIsAvailable = await isAvailableAsync();
	if (secureStoreIsAvailable) {
		try {
			await setItemAsync(key, value);
		} catch (error) {
			return;
		}
	}
};

export const getDataEncryptedAsyncStorage = async (
	key: string,
): Promise<any> => {
	const secureStoreIsAvailable = await isAvailableAsync();
	if (secureStoreIsAvailable) {
		return await getDataSecureStorage(key);
	} else {
		return await getDataAsyncStorage(key);
	}
};

export const removeEncryptedDataAsyncStorage = async (
	key: string,
): Promise<void> => {
	const secureStoreIsAvailable = await isAvailableAsync();
	if (secureStoreIsAvailable) {
		try {
			await deleteItemAsync(key);
		} catch (error) {}
	}
};
