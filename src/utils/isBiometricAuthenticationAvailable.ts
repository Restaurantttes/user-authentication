import { getEnrolledLevelAsync, hasHardwareAsync, isEnrolledAsync } from "expo-local-authentication";

export async function isBiometricAuthenticationAvailable(): Promise<boolean> {
	const hasHardware = await hasHardwareAsync();
	const enrolledLevel = await getEnrolledLevelAsync();
	const isEnrolled = await isEnrolledAsync();
	return hasHardware && enrolledLevel === 2 && isEnrolled;
}