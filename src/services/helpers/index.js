import get from "lodash/get";
import truncate from "lodash/truncate";

const isEnableLang = lang => {
	switch (lang) {
		case "uz":
			return true;
		case "ru":
			return true;
		case "en":
			return true;
		case "oz":
			return true;
		default:
			return false;
	}
};

const generateNewPath = (langCode, item, key = "slug") => {
	let newPath = "";
	const pathname = window.location.pathname;
	const splitPath = pathname.split("/");
	let _l = get(item, "translations", []).find(i => i.lang === langCode);
	let hasL = isEnableLang(splitPath[1]);

	if (item) {
		if (_l) {
			let beingArr = ["", langCode];
			let arr = [];
			if (hasL) {
				arr = [...beingArr, splitPath[2], _l[key]];
			} else {
				arr = [...beingArr, splitPath[1], _l[key]];
			}
			newPath = arr.join("/");
		} else {
			let beingArr = ["", langCode];
			newPath = beingArr.join("/");
		}
	}

	if (!item) {
		if (isEnableLang(splitPath[1])) {
			splitPath[1] = langCode;

			newPath = splitPath.join("/");
		} else {
			let beingArr = ["", langCode];
			let arr = [...beingArr, ...splitPath.slice(1)];

			newPath = arr.join("/");
		}
	}

	return newPath;
};

const cutStringText = (word, length, last) => {
	if (typeof word === "string") {
		return truncate(word, {
			length: length,
			omission: last ? last : "..."
		});
	} else {
		return null;
	}
};

const formatDate = (date, format) => {
	let dt = new Date(date);
	let month = ("00" + (dt.getMonth() + 1)).slice(-2);
	let day = ("00" + dt.getDate()).slice(-2);
	let year = dt.getFullYear();
	let hours = ("00" + dt.getHours()).slice(-2);
	let minutes = ("00" + dt.getMinutes()).slice(-2);
	let seconds = ("00" + dt.getSeconds()).slice(-2);

	switch (format) {
		case "DD-MM-YYYY":
			return day + "-" + month + "-" + year;
		case "DD.MM.YYYY / HH:mm:ss":
			return day + "." + month + "." + year + " / " + hours + ":" + minutes + ":" + seconds;
		case "DD.MM.YYYY / HH:mm":
			return day + "." + month + "." + year + " / " + hours + ":" + minutes;
		case "forComment":
			return hours + ":" + minutes + " / " + day + "." + month + "." + year;
		default:
			return day + "." + month + "." + year;
	}
};

const stringToCode = element => {
	const content = element.textContent;

	function toNode(iframeString) {
		const div = document.createElement("div");
		div.innerHTML = iframeString;
		const isYoutubePlayer = iframeString.includes("youtube.com");
		if (isYoutubePlayer) div.classList.add("youtube-player-wrapper");
		return div;
	}

	const parent = element.parentNode;
	const childOembed = parent.querySelector("code");
	childOembed.replaceWith(toNode(content));
};

const months = [
	{
		id: 1,
		month_uz: "Январ",
		month_oz: "Yanvar",
		month_ru: "Январь",
		month_en: "January"
	},
	{
		id: 2,
		month_uz: "Феврал",
		month_oz: "Fevral",
		month_ru: "Февраль",
		month_en: "February"
	},
	{
		id: 3,
		month_uz: "Март",
		month_oz: "Mart",
		month_ru: "Марть",
		month_en: "March"
	},
	{
		id: 4,
		month_uz: "Апрел",
		month_oz: "Aprel",
		month_ru: "Апрель",
		month_en: "Aprel"
	},
	{
		id: 5,
		month_uz: "Май",
		month_oz: "May",
		month_ru: "Май",
		month_en: "May"
	},
	{
		id: 6,
		month_uz: "Июн",
		month_oz: "Iyun",
		month_ru: "Июнь",
		month_en: "June"
	},
	{
		id: 7,
		month_uz: "Июл",
		month_oz: "Iyul",
		month_ru: "Июль",
		month_en: "July"
	},
	{
		id: 8,
		month_uz: "Август",
		month_oz: "Avgust",
		month_ru: "Августь",
		month_en: "August"
	},
	{
		id: 9,
		month_uz: "Сентябр",
		month_oz: "Sentabr",
		month_ru: "Сентябрь",
		month_en: "September"
	},
	{
		id: 10,
		month_uz: "Октябр",
		month_oz: "Oktabr",
		month_ru: "Октябрь",
		month_en: "October"
	},
	{
		id: 11,
		month_uz: "Ноябр",
		month_oz: "Noyabr",
		month_ru: "Ноябрь",
		month_en: "November"
	},
	{
		id: 12,
		month_uz: "Декабр",
		month_oz: "Dekabr",
		month_ru: "Декабрь",
		month_en: "December"
	}
];

const currencies = [
	{ value: 1, label: "UZS" },
	{ value: 2, label: "USD" },
	{ value: 3, label: "EUR" }
];

const repairTypes = [
	{ value: 1, label: "Реконструкция" },
	{ value: 2, label: "Капитальный ремонт" },
	{ value: 3, label: "Текуший ремонт" }
];

const ticketTypes = [
	{ value: 1, label: "Планируемый" },
	{ value: 2, label: "Отремонтированный" },
	{ value: 3, label: "Ремонтируется" }
];

const formatToDate = (date, currLang) => {
	const formattedDate = new Date(date);
	const month = formattedDate.getMonth();
	const year = formattedDate.getFullYear();
	const day = formattedDate
		.getDate()
		.toString()
		.padStart(2, 0);

	return {
		month: get(months[month], `month_${currLang}`),
		day,
		year
	};
};

const getWidgetType = widget => {
	switch (widget) {
		case "products": {
			return 2;
		}
		case "manufactures": {
			return 4;
		}
		case "years": {
			return 5;
		}
		case "strategy": {
			return 6;
		}
		default: {
			return 1;
		}
	}
};

const getDateCard = type_id => {
	switch (type_id) {
		case 1: {
			return [{ key: "total", label: "Худудий мақсадли жамғармаларига республика бюджетидан ажратиладиган мақсадли маблағлар", unit: "млрд сум" }];
		}
		case 2: {
			return [{ key: "total", label: "Ажратиладиган халқаро молия институтлари маблағлари", unit: "млрд сум" }];
		}
		case 3: {
			return [{ key: "total", label: "Ажратилган маблағлар", unit: "млрд сум" }];
		}
		case 4: {
			return [{ key: "total", label: "Ажратиладиган мақсадли маблағлар", unit: "млрд сум" }];
		}
		case 5: {
			return [{ key: "total", label: "Жами йиғимлар", unit: "млн сум" }];
		}
		case 6: {
			return [{ key: "total", label: "Келиб тушган маблағлар", unit: "млрд сум" }];
		}
		case 7: {
			return [{ key: "total", label: "Келиб тушган маблағлар", unit: "млн сум" }];
		}
		case 8: {
			return [{ key: "total", label: "Ажратилган маблағлар", unit: "млрд сум" }];
		}
		case 9: {
			return [
				{
					key: "external_advertising_objects_total",
					label:
						"Ташқи реклама объектлари (конструкциялари) қуриш учун электрон аукционлар якунлари бўйича ҳуқуқ тақдим этишдан тушган жами маблағлар",
					unit: "млн сум"
				},
				{
					key: "count_external_advertising_objects_total",
					label: "Ташқи рекламанинг ўрнатилган объектлари (конструкциялари) сони",
					unit: "дона"
				}
			];
		}
		case 10: {
			return [
				{
					key: "allocated_plots_of_land_total",
					label: "Ажратилган ер участкалари",
					unit: "га"
				},
				{
					key: "the_right_to_use_land_plots_total",
					label: "Ер участкаларидан фойдаланиш ҳуқуқини реализация қилишдан тушган маблағлар",
					unit: "млн сум"
				}
			];
		}
		case 111: {
			return [
				{ key: "in_year_plan_mln_sum_total", label: "Режада", unit: "млн сум" },
				{ key: "in_year_process_mln_sum_total", label: "Амалда", unit: "млн сум" }
			];
		}
		case 211: {
			return [
				{ key: "in_year_plan_mln_sum_total", label: "Режада", unit: "млн сум" },
				{ key: "in_year_process_mln_sum_total", label: "Амалда", unit: "млн сум" }
			];
		}
		case 311: {
			return [
				{ key: "in_year_plan_mln_sum_total", label: "Режада", unit: "млн сум" },
				{ key: "in_year_process_mln_sum_total", label: "Амалда", unit: "млн сум" }
			];
		}
		case 411: {
			return [
				{ key: "object_value_by_project_doc_total", label: "Лойиҳа-смета ҳужжатлари бўйича объектни қиймати ҚҚС билан", unit: "млн сум" },
				{ key: "object_value_by_contract_total", label: "Шартнома бўйича объект қиймати ҚҚС билан", unit: "млн сум" },
				{ key: "saved_amount_total", label: " Иқтисод қилинган маблағ ", unit: "млн сум" }
			];
		}
		case 112: {
			return [
				{
					key: "total",
					label: "Жами ажратилган маблағ",
					unit: "млрд сўм"
				}
			];
		}
		case 212: {
			return [
				{
					key: "allocated_funds_total",
					label: "Жами ажратилган маблағ",
					unit: "млрд сўм"
				}
			];
		}
		case 13: {
			return [
				{ key: "existing_roads_length_total", label: "Мавжуд йўллар узунлиги", unit: "км" },
				{ key: "avaible_bridge_number_total", label: "Мавжуд кўприклар сони", unit: "дона" }
			];
		}
		case 14: {
			return [{ key: "total", label: "Жами ажратилган маблағ", unit: "млрд сум" }];
		}
		case 15: {
			return [{ label: "Қўйилган вазифалар", key: "total", unit: "дона" }];
		}
		case 16: {
			return [{ key: "number_of_permissions_issued_total", label: "Берилган рухсатномалар сони", unit: "дона" }];
		}
		case 117: {
			return [
				{
					key: "number_of_granted_permission_requirement_violations_total",
					label: "O'zboshimchalik bilan qazish ishlari",
					unit: "дона"
				},
				{
					key: "including_one__for_excavation_work_total",
					label: "O'zboshimchalik bilan sun'iy notekisliklar va to'siqlar yaratish",
					unit: "дона"
				},
				{
					key: "violation_of_storage_rules_total",
					label: "Berilgan ruxsatnoma talablarini bajarmaslik holatlari",
					unit: "дона"
				},
				{
					key: "arbitrarily_total",
					label: "Berilgan ko'rsatmalar",
					unit: "дона"
				},
				{
					key: "including_two__for_excavation_work_total",
					label: "Taqdimnomalar",
					unit: "дона"
				},
				{
					key: "including_two__for_installing_artificial_bumps_total",
					label: "Ma'muriy bayonnomalar",
					unit: "дона"
				}
			];
		}
		case 217: {
			return [
				{
					key: "arbitrary_digging_work_total",
					label: "O'zboshimchalik bilan qazish ishlari",
					unit: "дона"
				},
				{
					key: "creating_arbitrary_artificial_unevenness_and_obstacles_work_tot",
					label: "O'zboshimchalik bilan sun'iy notekisliklar va to'siqlar yaratish",
					unit: "дона"
				},
				{
					key: "failure_comply_with_permit_total",
					label: "Berilgan ruxsatnoma talablarini bajarmaslik holatlari",
					unit: "дона"
				},
				{
					key: "break_storage_rules_instructions_total",
					label: "Berilgan ko'rsatmalar",
					unit: "дона"
				},
				{
					key: "break_storage_rules_submissions_total",
					label: "Taqdimnomalar",
					unit: "дона"
				},
				{
					key: "break_storage_rules_administratives_total",
					label: "Ma'muriy bayonnomalar",
					unit: "дона"
				}
			];
		}
		case 18: {
			return [
				{
					key: "foreign_delievers_total",
					label: "Хорижий юк ташувчилар",
					unit: "дона"
				},
				{
					key: "local_delievers_total",
					label: "Маҳаллий юк ташувчилар",
					unit: "дона"
				}
			];
		}
		case 19: {
			return [
				{
					key: "plan_total_soum_total",
					label: "Йил учун аниқлаштрилган режа маблағлар",
					unit: "млрд сўм"
				}
			];
		}
		case 20: {
			return [
				{
					key: "1",
					label: "Узунликдаги автомобиль йўли учун асфальтбетон қоплама",
					unit: "1 км",
					unit2 : "млн сум"
				}
			];
		}
		case 21: {
			return [
				{
					key: "total_highways_km_total",
					label: "Автомобиль йуллари",
					unit: "км"
				},
				{
					key: "total_bridges_piece_total",
					label: "Куприк вайул утказгичлар",
					unit: "дона"
				}
			];
		}
		case 22: {
			return [
				{
					label: "Шағал ва тупроқли ички хўжалик йўлларининг ҳолати"
				}
			];
		}
		case 123: {
			return [
				{
					key: "repair_part_total",
					label: "Таъмирталаб қисми",
					unit: "км"
				},
				{
					key: "amount_required_according_to_initial_accounts_total",
					label: "Дастлабки хисоб-китобларга кўра талаб этиладиган маблағ",
					unit: "млн сўм"
				}
			];
		}
		case 223: {
			return [
				{
					key: "part_of_the_bridge_in_need_of_repair_total",
					label: "Таъмирталаб кўприк жойлашган қисми",
					unit: "км"
				},
				{
					key: "amount_required_according_to_initial_accounts_total",
					label: "Дастлабки хисоб-китобларга кўра талаб этиладиган маблағ",
					unit: "млн сўм"
				}
			];
		}
		case 25: {
			return [
				{
					key: "total_production_equipment_number_total",
					label: "Жами ишлаб чиқариш ускуналар сони",
					unit: "дона"
				}
			];
		}
		case 24: {
			return [
				{
					label: "Автомобиль йўллари, шаҳарлар, шаҳар посёлкалари, қишлоқлар ва овуллар кўчалари тармоғи тўғрисида"
				}
			];
		}
		case 26: {
			return [
				{
					key: "total_number_of_techniques_total",
					label: "Жами техникалар сони",
					unit: "дона"
				}
			];
		}
		default:
			return [];
	}
};

const getIndicatorInfo = type_id => {
	switch (type_id) {
		case "1":
			return { unit: "млрд сум", total: "total" };
		case "2":
			return { unit: "млрд сум", total: "total" };
		case "3":
			return { unit: "млрд сум", total: "total" };
		case "4":
			return { unit: "млрд сум", total: "total" };
		case "5":
			return { unit: "млн сум", total: "total" };
		case "6":
			return { unit: "млрд сум", total: "total" };
		case "7":
			return { unit: "млн сум", total: "total" };
		case "8":
			return { unit: "млрд сум", total: "total" };
		case "9":
			return { unit: "млн сум", total: "external_advertising_objects_total" };
		case "10":
			return { unit: "млн сум", total: "the_right_to_use_land_plots_total" };
		case "111":
			return { unit: "млрд сум", total: "total" };
		case "211":
			return { unit: "млрд сум", total: "total" };
		case "311":
			return { unit: "млрд сум", total: "total" };
		case "411":
			return { unit: "млн сум", total: "total" };
		case "112":
			return { unit: "млрд сум", total: "total" };
		case "212":
			return { unit: "млрд сум", total: "total" };
		case "13":
			return { unit: "млрд сум", total: "total" };
		case "14":
			return { unit: "млрд сум", total: "total" };
		case "15":
			return { unit: "млрд сум", total: "total" };
		case "16":
			return { unit: "млрд сум", total: "total" };
		case "117":
			return { unit: "млрд сум", total: "total" };
		case "217":
			return { unit: "млрд сум", total: "total" };
		case "18":
			return { unit: "млрд сум", total: "total" };
		case "20":
			return { unit: "млн сум", total: "total" };
		case "21":
			return { unit: "млн сум", total: "total" };
		case "22":
			return { unit: "млн сум", total: "total" };
		case "123":
			return { unit: "млн сум", total: "total" };
		case "223":
			return { unit: "млн сум", total: "total" };
		case "24":
			return { unit: "млн сум", total: "total" };
		case "25":
			return { unit: "млн сум", total: "total" };
		case "26":
			return { unit: "млн сум", total: "total" };
		default:
			return "";
	}
};

const feedbackStatus = status => {
	if (status === 0) return { color: "orange", label_ru: "Новый", label_uz: "Янги", label_oz: "Yangi", label_en: "Yangi" };
	else if (status === 1) {
		return { color: "blue", label_ru: "В процессе", label_uz: "Жараёнда", label_oz: "Jarayonda", label_en: "In process" };
	} else if (status === 2) {
		return { color: "purple", label_ru: "В модерации", label_uz: "Модерацияда", label_oz: "Moderatsiyada", label_en: "In moderation" };
	} else if (status === 3) {
		return { color: "green", label_ru: "Принятый", label_uz: "Қабул қилинди", label_oz: "Qabul qilindi", label_en: "Accepted" };
	} else if (status === 4) {
		return { color: "red", label_ru: "Отклоненный", label_uz: "Рад етилган", label_oz: "Rad etilgan", label_en: "Rejected" };
	}
};

const convertToReadable = number => {
	function isFloat(n) {
		return Number(n) === n && n % 1 !== 0;
	}
	let newValue;

	if (number) {
		if (isFloat(Number(number))) {
			newValue = number.toString().split(".");
			newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			newValue = newValue.join(".");
		} else {
			newValue = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}
	} else {
		newValue = "-";
	}

	return newValue;
};

const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	isEnableLang,
	generateNewPath,
	cutStringText,
	formatDate,
	repairTypes,
	stringToCode,
	formatToDate,
	months,
	currencies,
	getWidgetType,
	ticketTypes,
	formatBytes,
	feedbackStatus,
	getDateCard,
	getIndicatorInfo,
	convertToReadable
};
