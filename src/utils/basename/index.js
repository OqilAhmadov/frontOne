import { storage } from "services";
import config from "config";

export const getBaseName = () => {
	const currentLangCode = storage.get("language");
	let base = window.location.pathname.split("/")[1];
	let include = config.API_LANGUAGES.filter(lang => lang.code === base);

	if (include.length > 0) {
		if (currentLangCode !== base) {
			window.location.pathname = base + "/" + window.location.pathname.slice(4);
			storage.set("language", base);
		}
	} else if (window.location.pathname === "/") {
		window.location.pathname = "uz";
		base = "uz";
	} else {
		window.location.pathname = `${currentLangCode}/` + window.location.pathname.slice(base.length + 2);
		base = currentLangCode;
	}

	return base;
};
