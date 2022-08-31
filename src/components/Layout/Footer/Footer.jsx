import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get } from "lodash";

import FooterLogo from "assets/images/logo-dark.svg";

const Footer = () => {

	const { t } = useTranslation();
	const menus = useSelector(state => state.system.menu);
	const settings = useSelector(state => state.system.settings);
	const footerMenu = menus.filter(menu => menu.title === "footer-menu");

	if (footerMenu[0]?.lang !== 2) {
		if (footerMenu[0]?.lang !== 4) {
			footerMenu[0] = footerMenu[0]?.menu_items[0];
		}
	}
	const socials = settings.filter(setting => setting.slug === "social");
	const footerMenuTelGmail = settings.filter(setting => setting.slug === "tel" || setting.slug === "gmail");

	return (
		<footer className="footer section-gap">
			<div className="container">
				<div className="footer__top-wrapper">
					<ul className="footer__lists-wrapper">
						<li className="item">
							<Link to="/">
								<img src={FooterLogo} alt="Brand" />
							</Link>
							<p>
								{t(
									"Автомобиль йуллари холатини акс эттирувчи интерактив харита йўл Қўмитаси мезонлари ҳамда халқаро стандартлар талабига мос равишда яратилган new"
								)}
							</p>
						</li>

						<li className="item footer-menu-list">
							<h3>{t("Навигация")}</h3>
							<hr />
							<div>
								<ul className="footer__navigation-list">
									{get(footerMenu, "[0].menu_items", []).map((item, i) => {
										if (item.status === 1) {
											return (
												item.url !== "#" && (
													<span key={i}>
														<li>
															<Link to={item.url ? item.url : ""} className="line-animation">
																{item.title}
															</Link>
														</li>
														{item.menu_items.length > 0 &&
															item.menu_items.map(submenu => (
																<li>
																	<Link to={submenu.url} className="line-animation">
																		{submenu.title}
																	</Link>
																</li>
															))}
													</span>
												)
											);
										} else {
											return ""
										}
									})}
								</ul>
							</div>
						</li>

						<li className="item">
							<h3>{t("боғланиш")}</h3>
							<hr />
							<div>
								<ul className="footer__navigation-list">
									{footerMenuTelGmail.map((item, i) => {
										return (
											<li key={i}>
												<a href={`${item.slug}: ${item.link}`} className="line-animation">
													{item.name}
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
						<li className="item">
							<h3>{t("Фойдали ҳаволалар")}</h3>
							<hr />
							<div>
								<ul className="footer__navigation-list-last">
									{socials.map((setting, i) => {
										return (
											<li key={i}>
												<a href={setting.link}>
													<img src={get(setting, "file.thumbnails.normal.src")} alt="instagram" />
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="footer__bottom-wrapper">
				<div className="container">
					<p>2021 Shaffofyul.uz</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
