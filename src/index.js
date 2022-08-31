import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { i18n, api } from "services";
import { configure as configureStore } from "store";

import Routes from "./routes";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.min.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import "./assets/styles/main.css";
import "./assets/styles/ui.scss";
import "./assets/styles/header.scss";
import "./assets/styles/footer.scss";
import "./assets/styles/fonts.css";

const store = configureStore();
store.subscribe(() => {
	api.subscribe(store);
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider {...{ store }}>
		<Suspense fallback="">
			<I18nextProvider i18n={i18n()}>
				<Routes />
			</I18nextProvider>
		</Suspense>
	</Provider>
);
