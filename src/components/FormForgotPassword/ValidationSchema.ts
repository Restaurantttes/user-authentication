import { t } from "i18next";
import * as yup from "yup";

export const ValidationSchema = () => {
	const validationSchema = yup.object({
		email: yup
			.string()
			.required(t("authentication.error.email"))
			.email(t("authentication.error.email-valid")),
	});
	return validationSchema;
};