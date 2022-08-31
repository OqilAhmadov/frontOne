import React from "react";

import { get } from "lodash";
import { helpers } from "services";
import { useSelector } from "react-redux";
import EntityContainer from "modules/entity/containers";
import PressCenterImg from "assets/images/press-center.png";
// import { Skeleton } from "../index";
import Countdown from "react-countdown";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PressBoxEvents = () => {
	const { t } = useTranslation();
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	return (
		<EntityContainer.All
			entity="posts"
			name="posts"
			url={`/posts`}
			params={{
				sort: "-created_at",
				limit: 2,
				filter: { status: 1, type: 4, top: 1 }
			}}>
			{({ items, isFetched }) => {
				return (
					<>
						{isFetched && items.length > 0 && (
							<div className="press__box press__box-events">
								{items.map(item => (
									<div className="press__box-left">
										<Link to={`news/${item.slug ? item.slug : ""}`}>
											<div className="press__box-card">
												<img src={get(item, "file.thumbnails.normal.src", PressCenterImg)} alt="press-center" />
												<div className="press__box-card--date">
													<span>{helpers.formatToDate(item.created_at, currentLangCode).day}</span>
													<span>
														{helpers.formatToDate(item.created_at, currentLangCode).month}
														<br />
														{helpers.formatToDate(item.created_at, currentLangCode).year}
													</span>
												</div>
												<div className="press__box-card--title">
													<h2 className="title">{item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}</h2>
													<span className="desc">
														{item.description && item.description.length > 100
															? item.description.slice(0, 100) + "..."
															: item.description}
													</span>
													<footer>
														<p>{t("Оставшееся время")}:</p>
														<h1>
															<Countdown date={new Date(get(item, "events_at")).valueOf()} />
														</h1>
													</footer>
												</div>
											</div>
										</Link>
									</div>
								))}
							</div>
						)}
						{/* {!isFetched && <Skeleton.PressBox />} */}
					</>
				);
			}}
		</EntityContainer.All>
	);
};

export default PressBoxEvents;
