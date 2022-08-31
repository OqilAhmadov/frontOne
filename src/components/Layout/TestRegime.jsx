import React from "react";
import { useTranslation } from "react-i18next";

const TestRegime = () => {
	const { t } = useTranslation();
	return (
		<div className="test-regime">
			<span>{t("Сайт работает в тестовом режиме")}.</span>
		</div>
	);
};

export default TestRegime;
