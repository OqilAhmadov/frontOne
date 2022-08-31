import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { history } from "store";
import { Spinner, Layout } from "components";
import { getBaseName } from "./utils";

import App from "./App";
import ScrollTop from "./hoc/ScrollTop";

const Home = lazy(() => import("./pages/Home"));
const News = lazy(() => import("./pages/News"));
const Search = lazy(() => import("./pages/News/Search"));
const Rating = lazy(() => import("./pages/CompanyRates"));
const Designers = lazy(() => import("./pages/Designers"));
const InnerRoads = lazy(() => import("./pages/InnerRoads"));
const Docs = lazy(() => import("./pages/Docs"));
const RoadsStatistics = lazy(() => import("./pages/RoadsStatistics"));
const DefaultPage = lazy(() => import("./pages/DefaultPage/DefaultPage"));
const SingePageNews = lazy(() => import("./pages/SingePageNews"));
const NotFound = lazy(() => import("./pages/404"));
const Tickets = lazy(() => import("./pages/Tickets"));
const CheckApplication = lazy(() => import("./pages/Home/components/Request/check-application"));
const Dates = lazy(() => import("./pages/dates_for_admin/StatisticsLatest"));
const Tables = lazy(() => import("./pages/Tables"));

const routes = [
	{ path: "", element: Home },
	{ path: "/news", element: News },
	{ path: "/pudratchilar", element: Rating },
	{ path: "/designers", element: Designers },
	{ path: "/news/search/:search", element: Search },
	{ path: "/inner-roads", element: InnerRoads },
	{ path: "/documents", element: Docs },
	{ path: "/roads", element: RoadsStatistics },
	{ path: "/pages/:slug", element: DefaultPage },
	{ path: "/news/:slug", element: SingePageNews },
	{ path: "/tickets", element: Tickets },
	{ path: "/check-application", element: CheckApplication },
	{ path: "/tables/:table_id/:table_type_id", element: Tables },
	{ path: "/dates", element: Dates },
	{ path: "/dates_roads", element: RoadsStatistics },
	{ path: "/dates_inner-roads", element: InnerRoads },
	{ path: "/date_tables/:table_id/:table_type_id", element: Tables },
];

const RoutesContainer = () => (
	<Router {...{ history }} basename={`/${getBaseName()}`}>
		<App>
			<Layout>
				<Suspense fallback={<Spinner position="full" />}>
					<Routes>
						{routes.map((route, key) => {
							const RouteComponent = ScrollTop(route.element);
							return <Route key={key} path={route.path} element={<RouteComponent />} />;
						})}
						<Route path="/tables/:table_id/:table_type_id" element={<Tables />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Layout>
		</App>
	</Router>
);

export default RoutesContainer;
