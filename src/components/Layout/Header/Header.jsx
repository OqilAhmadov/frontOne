import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SelectLang from "./components/SelectLang";
import { Field, Form, Formik } from "formik";
import MobileHeader from "./MobileHeader";
import { useWindowDimensions } from "hooks";
import ForBlinds from "./components/ForBlinds";
import { get } from "lodash";

import HeaderLogo from "assets/images/logo.svg";
import ArrowDown from "assets/images/icons/arrow-down.svg";
import searchIcon from "assets/images/icons/search-header.svg";
import circle from "assets/images/icons/circle-dropmenu.svg";
import closeIcon from "assets/images/icons/close.svg";

const Header = ({ speak, changeSpeakSwitcher }) => {
	const { width } = useWindowDimensions();
	let location = useLocation();
	const { t } = useTranslation();
	const currentRoute = location.pathname.split("/")[1];
	const [isActive, setIsActive] = useState(false);
	const currentLangCode = useSelector(state => state.system.currentLangCode);

	const initialValues = {
		email: "",
		description: "",
		selectOption: "",
		radioOptions: "",
		checkboxOptions: "",
		birthDate: null
	};

	const menus = useSelector(state => state.system.menu);
	if (menus[0]?.title !== "Header-menu") {
		menus.reverse();
	}

	const onSubmit = values => {
		window.history.pushState("", location.pathname, `${currentLangCode}/news/search/${values.searchValue}`);
		window.location.reload();
	};
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (width <= 1024) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

	return (
		<>
			{isMobile ? (
				<MobileHeader menus={get(menus, "[0].menu_items", [])} currentRoute={currentRoute} speak={speak} changeSpeakSwitcher={changeSpeakSwitcher} />
			) : (
				<header className="header">
					<div className="top-line"></div>
					<nav className="nav">
						<div className="container">
							<div className="nav__wrapper">
								<div className="logo-box">
									<Link to="/">
										<img src={HeaderLogo} alt="Brand" />
									</Link>
								</div>

								<div className="left-content">
									<ul>
										{get(menus, "[0].menu_items", []).map((menu, i) => {
											if (menu.status === 1) {
												return (
													<li
														className={`nav__item ${`${currentRoute}` === menu.url || (menu.url === "/" && currentRoute.length === 0) ? "active" : ""
															} ${menu.menu_items.length > 0 && "menu-dropdown"}`}
														key={i}>
														{menu.menu_items.length === 0 ? (
															<Link to={`${menu.url === "/" ? "" : menu.url}`}>{menu.title}</Link>
														) : (
															<>
																<Link
																	to={menu.url}
																	className={
																		menu.menu_items.map(m => m.url === `${currentRoute}`)[0] ||
																			menu.menu_items.map(m => m.url === `${currentRoute}`)[1]
																			? "activeDropdown"
																			: ""
																	}>
																	{menu.title} <img src={ArrowDown} alt="arrow-down" />
																</Link>
																<div className="transparent-box">
																	<div className="rating-dropdown">
																		{menu.menu_items.map((submenu, k) => {
																			if (submenu.status === 1) {
																				return (
																					<div key={k}>
																						<Link
																							to={
																								submenu.url.split("/")[1]
																									? submenu.url.split("/")[1]
																									: submenu.url.split("/")[0]
																							}
																							className={`dropdown__item ${(`${currentRoute}` === submenu.url ||
																								`/${currentRoute}` === submenu.url) &&
																								"activeSub"}`}
																							key={k}>
																							<img src={circle} alt="circle" /> <span>{submenu.title}</span>
																						</Link>
																						<div className="divider"></div>
																					</div>
																				);
																			} else {
																				return "";
																			}
																		})}
																	</div>
																</div>
															</>
														)}
													</li>
												);
											} else {
												return "";
											}
										})}
									</ul>
									<div className="right-nav">
										<ul>
											<li className="search">
												<div className="search__box">
													<img src={isActive ? closeIcon : searchIcon} alt="search" onClick={() => setIsActive(!isActive)} />
													<span onClick={() => setIsActive(true)}>
														{/* {t("Излаш")} */}
														<div className={`search-form ${!isActive ? "inactive-form" : "active-form"}`}>
															<Formik onSubmit={onSubmit} initialValues={initialValues}>
																<Form className="form" style={{ position: "relative" }}>
																	<Field
																		className="input-formik"
																		type="text"
																		placeholder={t("Излаш")}
																		name="searchValue"
																		value={undefined}
																	/>
																	<button className="search-btn-box" type="button">
																		{/* <img src={closeIcon} alt="qidiruv" /> */}
																	</button>
																</Form>
															</Formik>
														</div>
													</span>
												</div>
											</li>

											<li className="readibility">
												<ForBlinds speak={speak} changeSpeakSwitcher={changeSpeakSwitcher} />
											</li>
											<li>
												<SelectLang />
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</header>
			)}
		</>
	);
};

export default Header;
