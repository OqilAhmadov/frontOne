import React from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "config";
import { useLocation } from "react-router-dom";
import get from "lodash/get";
import { helpers, storage } from "services";
import cx from "classnames";
import arrowDown from "assets/images/icons/arrow-down.svg";
import OutsideClick from "hooks/outside-click";
import SystemActions from "store/actions/system";

const SelectLang = ({ isMobile }) => {
	const dispatch = useDispatch();
	const { ref, isVisible, setIsVisible } = OutsideClick(false);

	const location = useLocation();
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	let languages = config.API_LANGUAGES;

	languages = languages.sort((x, y) => {
		return x.code === currentLangCode ? -1 : y.code === currentLangCode ? 1 : 0;
	});

	const locationPath = location.pathname.split("/");
	const slug = locationPath[2];

	const post = useSelector(state => get(state, `entities.news.${slug}`));
	const page = useSelector(state => get(state, `entities.default-page.${slug}`));

	const changeLang = langCode => {
		if (currentLangCode !== langCode) {
			storage.set("language", langCode);
			dispatch(SystemActions.ChangeLanguage(langCode));
			window.history.pushState("", "", helpers.generateNewPath(langCode, post ? post : page ? page : null, "slug"));
			window.location.reload();
		}
	};
	return (
		<div className="lang">
			<div className="lang_list" ref={ref} style={{ height: isVisible ? "max-content" : "25px" }}>
				{languages.map((lang, key) => {
					return (
						<span
							key={key}
							className={cx(lang.code === currentLangCode ? "active" : "")}
							style={{ marginTop: "2px" }}
							onClick={() => {
								lang.code !== currentLangCode && changeLang(lang.code);
								currentLangCode === lang.code && setIsVisible(!isVisible);
							}}>
							{lang.short}
						</span>
					);
				})}
				<div className="lang_arrow" onClick={() => setIsVisible(!isVisible)}>
					<img src={arrowDown} alt="" />
				</div>
			</div>
		</div>
	);
};

export default SelectLang;
