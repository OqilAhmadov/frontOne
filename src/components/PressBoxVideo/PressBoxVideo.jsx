import React from "react";

import { get, truncate } from "lodash";
import { helpers } from "services";
import { useSelector } from "react-redux";
import EntityContainer from "modules/entity/containers";
import PressCenterImg from "assets/images/press-center.png";
import Camera from "assets/images/play.svg";
// import { Skeleton } from "../index";

import { Link } from "react-router-dom";

const PressBoxVideo = () => {
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	return (
		<EntityContainer.All
			entity="posts"
			name="posts"
			url={`/posts`}
			params={{
				sort: "-created_at",
				limit: 3,
				filter: { status: 1, type: 3, top: 1 }
			}}>
			{({ items, isFetched }) => {
				return (
					<>
						{items.length > 0 && isFetched && (
							<div className="press__box press__box-photo">
								<Link className="press__box-card" to={`news/${items[0].slug ? items[0].slug : ""}`}>
									<img className="press__box-card--bg" src={get(items[0].file, "thumbnails.normal.src", PressCenterImg)} alt="press-center" />
									<div className="press__box-card--date">
										<span>{helpers.formatToDate(get(items[0], "created_at"), currentLangCode).day}</span>
										<span>
											{helpers.formatToDate(get(items[0], "created_at"), currentLangCode).month}
											<br />
											{helpers.formatToDate(get(items[0], "created_at"), currentLangCode).year}
										</span>
									</div>
									<div className="press__box-card--icon press__box-card--icon_video">
										<img src={Camera} alt="" />
									</div>
									<div className="press__box-card--title">{truncate(items[0].title, { length: 140 })}</div>
								</Link>
								<div className="press__box-photo-right">
									{items.slice(1, 3).map((item, i) => {
										return (
											<Link className="press__box-card" key={i} to={`news/${item.slug ? item.slug : ""}`}>
												<img
													className="press__box-card--bg"
													src={get(item.file, "thumbnails.normal.src", PressCenterImg)}
													alt="press-center"
												/>
												<div className="press__box-card--date">
													<span>{helpers.formatToDate(get(item, "created_at"), currentLangCode).day}</span>
													<span>
														{helpers.formatToDate(get(item, "created_at"), currentLangCode).month}
														<br />
														{helpers.formatToDate(get(item, "created_at"), currentLangCode).year}
													</span>
												</div>
												<div className="press__box-card--icon press__box-card--icon_video">
													<img src={Camera} alt="" />
												</div>
												<div className="press__box-card--title">{truncate(item.title, { length: 60 })}</div>
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

export default PressBoxVideo;
