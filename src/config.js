const { REACT_APP_API_ROOT } = process.env;

const config = {
	API_ROOT: REACT_APP_API_ROOT,
	DEFAULT_LANGUAGE: "uz",
	API_LANGUAGES: [
		{ id: 1, code: "ru", title: "Русский", short: "RUS" },
		{ id: 2, code: "uz", title: "Ўзбекча", short: "УЗБ" },
		{ id: 3, code: "en", title: "English", short: "ENG" },
		{ id: 4, code: "oz", title: "Uzbek", short: "UZB" }
	]
};

export default config;
