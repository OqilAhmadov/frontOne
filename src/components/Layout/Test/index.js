import React from "react";
import { useTranslation } from "react-i18next";
import './test.scss'

const Test = () => {
	const { t } = useTranslation();
	return (
		<div className="test">
			<div className="container">
				<h1 className="test__title">{t("Сайт тест режимида ишламоқда")}</h1>
			</div>
		</div>
	);
};

export default Test;
