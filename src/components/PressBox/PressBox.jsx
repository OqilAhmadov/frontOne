import React from "react";
import { get, truncate } from "lodash";
import { helpers } from "services";
import { useSelector } from "react-redux";
import EntityContainer from "modules/entity/containers";
import PressCenterImg from "assets/images/press-center.png";
// import { Skeleton } from "../index";

import { Link } from "react-router-dom";

const PressBox = () => {
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	return (
		<EntityContainer.All
			entity="posts"
			name="posts"
			url={`/posts`}
			params={{
				sort: "-created_at",
				limit: 4,
				filter: { status: 1, type: 1, top: 1 }
			}}>
			{({ items, isFetched }) => {
				return (
					<>
						{items.length > 0 && isFetched && (
							<div className="press__box">
								<Link className="press__box-left" to={`news/${items[0].slug ? items[0].slug : ""}`}>
									<div className="press__box-card">
										<img src={get(items[0].file, "thumbnails.normal.src", PressCenterImg)} alt="press-center" />
										<div className="press__box-card--date">
											<span>{helpers.formatToDate(items[0].published_at, currentLangCode).day}</span>
											<span>
												{helpers.formatToDate(items[0].published_at, currentLangCode).month}
												<br />
												{helpers.formatToDate(items[0].published_at, currentLangCode).year}
											</span>
										</div>
										<div className="press__box-card--title">{items[0].title}</div>
									</div>
								</Link>

								<div className="press__box-right">
									{items.slice(1).map((item, index) => {
										return (
											<Link
												to={`news/${item.slug ? item.slug : ""}`}
												key={item.id}
												className={`press__box-card ${index === 0 ? "press__box-card--1 col-12" : ""}  ${
													index === 1 ? "press__box-card--3" : ""
												}  ${index === 2 ? "press__box-card--4" : ""}`}>
												<div className="press__box-card--date">
													<span>{helpers.formatToDate(get(item, "published_at"), currentLangCode).day}</span>
													<span>
														{helpers.formatToDate(get(item, "published_at"), currentLangCode).month}
														<br />
														{helpers.formatToDate(get(item, "published_at"), currentLangCode).year}
													</span>
												</div>
												<div className="press__box-card--title">{truncate(item.title, { length: 70 })}</div>
											</Link>
										);
									})}
								</div>
							</div>
						)}
						{/* {!isFetched && <Skeleton.PressBox />} */}
					</>
				);
			}}
		</EntityContainer.All>
	);
};

export default PressBox;
