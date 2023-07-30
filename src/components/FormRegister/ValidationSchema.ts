import { t } from "i18next";
import * as yup from "yup";

export const ValidationSchema = () => {
	const validationSchema = yup.object({
		name: yup
			.string()
			.required(t("authentication.error.name"))
			.matches(
				/^[A-Za-záéíóúÁÉÍÓÚ]+\s[A-Za-záéíóúÁÉÍÓÚ]+$/,
				t("authentication.error.full-name"),
			),
		email: yup
			.string()
			.required(t("authentication.error.email"))
			.email(t("authentication.error.email-valid")),
		password: yup.string().required(t("authentication.error.password")),
		password2: yup
			.string()
			.oneOf(
				[yup.ref("password"), null],
				t("authentication.error.confirm-password-same"),
			)
			.required(t("authentication.error.confirm-password")),
	});

	return validationSchema;
};