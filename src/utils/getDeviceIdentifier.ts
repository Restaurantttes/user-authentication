import { randomUUID } from "expo-crypto";
import { getDataEncryptedAsyncStorage, saveEncryptedDataAsyncStorage } from "./storage";

export async function getDeviceIdentifier(): Promise<string> {
	const key = "device_identifier";
	let identifier = await getDataEncryptedAsyncStorage(key);
	if (identifier === null) {
		identifier = randomUUID();
		await saveEncryptedDataAsyncStorage(key, identifier);
	}
	return identifier;
}