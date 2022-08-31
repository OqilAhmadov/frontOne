import config from "config";
import systemActions from "../actions/system";

const initialState = {
	currentLangCode: config.DEFAULT_LANGUAGE,
	callback: false,
	settings: [],
	menu: [],
	isMobile: false,
	ticketData: null
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
	switch (action.type) {
		case systemActions.Callback.SUCCESS: {
			return {
				...state,
				callback: true
			};
		}

		case systemActions.SaveTicketData.TRIGGER: {
			return {
				...state,
				ticketData: action.payload
			};
		}

		case systemActions.Callback.FAILURE: {
			return {
				...state,
				callback: false
			};
		}

		case systemActions.isMobile.TRIGGER: {
			return {
				...state,
				isMobile: action.payload
			};
		}

		case systemActions.ChangeLanguage.TRIGGER: {
			return { ...state, currentLangCode: action.payload };
		}

		case systemActions.GetSettings.SUCCESS: {
			return { ...state, settings: action.payload.data };
		}

		case systemActions.GetMenu.SUCCESS: {
			return {
				...state,
				menu: action.payload
			};
		}

		case systemActions.GetMenu.FAILURE: {
			return {
				...state,
				menu: []
			};
		}

		default:
			return state;
	}
};
