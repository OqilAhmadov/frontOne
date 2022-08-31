import React from "react";
import { useTranslation } from "react-i18next";

import "./NoData.scss";

const NoData = () => {
	const { t } = useTranslation();
	return (
		<div className="nodata">
			<div className="nodata__img">
				<img src={require("assets/images/NoData.svg")} alt="" />
			</div>
			<div className="nodata__title">{t("В данной категории пока новостей нет. Наши сотрудники уже работают над этим.")}</div>
		</div>
	);
};

export default NoData;
