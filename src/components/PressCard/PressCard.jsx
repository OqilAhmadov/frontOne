import React from "react";
import { get } from "lodash";
// import { Skeleton } from "../index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EntityContainer from "modules/entity/containers";
const PressCard = () => {
	const { t } = useTranslation();
	return (
		<EntityContainer.All
			entity="widgets-pressCard"
			name="widgets-pressCard"
			url={`/widgets`}
			params={{
				filter: { status: 1, alias: "key-indicators" },
				include: "items"
			}}>
			{({ items, isFetched }) => {
				const subItems = get(items[0], "items", []);
				return (
					<>
						{isFetched && subItems && (
							<div className="press__center-card--wrapper">
								<div className="press__card d-flex flex-wrap justify-content-between">
									{subItems.length > 0 &&
										subItems.map(item => {
											return (
												<div
													key={item.id}
													className="press__card-wrapper d-flex">
													<div className="press__card-left">
														<p className="press__card-left--category">
															{t(
																"Основные покозатели"
															)}
														</p>
														<p className="press__card-left--quantity">
															<span>
																{get(
																	item,
																	"title",
																	0
																)}
															</span>
															<span>
																{get(
																	item,
																	"secondary",
																	"МВт"
																)}
															</span>
														</p>
														<p className="press__card-left--title">
															{item.description}
														</p>
													</div>
													<div className="press__card-right">
														<img
															src={get(
																item,
																"file.thumbnails.normal.src",
																require("assets/images/press-card-icon.png")
															)}
															alt="press-card-icon"
														/>
													</div>
												</div>
											);
										})}
								</div>
								<div className="press__footer col-md-7 col-sm-12">
									<p className="press__footer-title">
										{t(
											"Остались вопросы или хотите обращатся руководству АО ТЭС?"
										)}
									</p>
									<p className="press__footer-txt">
										{t(
											"Напишите ваше вопрос или обрашение прямо сейчас"
										)}
									</p>
									<Link to="/contact">
										<button className="press__footer-btn">
											{t("Электронная приемная")}
										</button>
									</Link>
								</div>
							</div>
						)}
						{/* {!isFetched && <Skeleton.PressCenterCard />} */}
					</>
				);
			}}
		</EntityContainer.All>
	);
};

export default PressCard;
