import React from "react";

const NewsSk = () => {
	return (
		<>
			<div className="container">
				<div className="page-title skeleton-background w-40 h-50px brs-21px mt-20px"></div>
			</div>

			<section className="container">
				<div className="latest-news-section">
					<div className="skeleton-background w-100 h-500px brs-21px mt-20px"></div>
					<div className="right-side">
						<div className="news-items mt-20px">
							<div className="skeleton-background w-100 h-160px brs-21px">
								<div className="img-box"></div>
								<div className="text-content">
									<div className="title"></div>
									<div className="date"></div>
								</div>
							</div>
							<div className="skeleton-background w-100 h-160px brs-21px">
								<div className="img-box"></div>
								<div className="text-content">
									<div className="title"></div>
									<div className="date"></div>
								</div>
							</div>
							<div className="skeleton-background w-100 h-160px brs-21px">
								<div className="img-box"></div>
								<div className="text-content">
									<div className="title"></div>
									<div className="date"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="all-newss">
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
					<div className="all-news__item skeleton-background w-32 h-400px brs-21px">
						<div className="img-box"></div>
						<div className="date"></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default NewsSk;
