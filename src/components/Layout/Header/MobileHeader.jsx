import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowDown from "assets/images/icons/arrow-down.svg";
import SelectLang from "./components/SelectLang";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import ForBlinds from "./components/ForBlinds";
import circle from "assets/images/icons/circle-dropmenu.svg";
import HeaderLogo from "assets/images/logo.svg";
import burger from "assets/images/icons/burger-mob.svg";
import searchIcon from "assets/images/icons/search-header.svg";
import { ReactComponent as Close } from 'assets/images/icons/close.svg'

const MobileHeader = ({ menus, currentRoute, speak, changeSpeakSwitcher }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [openDrop, setOpenDrop] = useState(false)
	const { t } = useTranslation();

	const initialValues = {
		searchValue: ""
	};
	const onSubmit = values => {
		window.history.pushState("", currentRoute, `news/search/${values.searchValue}`);
		window.location.reload();
	};

	useEffect(() => {

		if (isOpen) {
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.body.style.overflow = "visible"
		}

	}, [isOpen])
	return (
		<header className="header for-mobile">
			<div className="top-line"></div>
			<div className="container">
				<div className="wrapper-mob-header">
					<div className="logo-box">
						<Link to="/">
							<img src={HeaderLogo} alt="Brand" />
						</Link>
					</div>
					<div className="burger-mob" onClick={() => setIsOpen(true)}>
						<img src={!isOpen ? burger : ""} alt="mobile burger" />
					</div>
				</div>
				<div className={`outer-mob-menu  ${isOpen && "opened"}`}>
					<Close onClick={() => setIsOpen(false)} className="close__svg" />
					<div className='rightMenu'>
						<div className="top-sec">
							<li className="search">
								<div className="search__box">
									<div className={`search-form`}>
										<Formik onSubmit={onSubmit} initialValues={initialValues}>
											<Form className="form">
												<Field className="input-formik" type="text" placeholder={t("Поиск")} name="searchValue" value={undefined} />
												<button className="search-btn-box" type="submit">
													<img src={searchIcon} alt="qidiruv" />
												</button>
											</Form>
										</Formik>
									</div>
								</div>
							</li>
						</div>
						<div className="invalid">
							<SelectLang />
							<li className="readibility">
								<ForBlinds speak={speak} changeSpeakSwitcher={changeSpeakSwitcher} />
							</li>
						</div>
						<ul>
							{menus.map((menu, i) => {
								if (menu.status === 1) {
									return (
										<li
											onClick={() => { menu.menu_items[0] ? setIsOpen(true) : setIsOpen(false); setOpenDrop(openDrop ? false : true) }}
											className={`nav__item ${(currentRoute === menu.url) || (menu.url === "/" && (currentRoute.length === 0)) ? "active" : ""
												} ${menu.menu_items.length > 0 && "menu-dropdown"}`}
											key={i}>
											{menu.menu_items.length === 0 ? (
												<Link to={`/${menu.url === "/" ? "" : menu.url}`}>{menu.title}</Link>
											) : (
												<>
													<Link
														to={menu.url}
														onClick={() => setOpenDrop(openDrop ? false : true)}
														className={
															menu.menu_items.map(m => m.url === currentRoute)[0] ||
																menu.menu_items.map(m => m.url === currentRoute)[1]
																? "activeDropdown"
																: ""
														}>
														{menu.title} <img src={ArrowDown} alt="arrow-down" />
													</Link>
													<div className={`transparent-box  ${openDrop ? "open_drop" : ""}`}>
														<div className="rating-dropdown">
															{menu.menu_items.map((submenu, k) => {
																if (submenu.status) {
																	return (
																		<div key={k}>
																			<Link
																				to={submenu.url.split("/")[1] ? submenu.url.split("/")[1] : submenu.url.split("/")[0]}
																				onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
																				className={`dropdown__item ${(currentRoute === submenu.url || `/${currentRoute}` === submenu.url) && "activeSub"}`}
																				key={k}>
																				<img src={circle} alt="circle" /> <span>{submenu.title}</span>
																			</Link>
																			<div className="divider"></div>
																		</div>
																	);
																} else {
																	return ""
																}
															})}
														</div>
													</div>
												</>
											)}
										</li>
									);
								} else {
									return ""
								}
							})}
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default MobileHeader;
