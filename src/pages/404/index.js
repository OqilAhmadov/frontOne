import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import znak from "assets/images/znak.png";
import znakLeft from "assets/images/znak-left.png";
import earth from "assets/images/404-png.png"
import "./style.scss";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<div className="container">
			<div className="not-found">
				<div className="img-box">
					<img className="back-image" src={earth} alt="earth" />
					<img className="znak-left" src={znakLeft} alt="znak" />
					<img className="znak" src={znak} alt="znak2" />
				</div>
				<h2 className="title">{t("Уппс Мы не можем найти эту страницу")}</h2>
				<Link to="/" className="go-home-btn">
					{t("Домой")}
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
