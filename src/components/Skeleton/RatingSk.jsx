import React from "react";

const RatingSk = ({letter}) => {
	return (
		<>
			<div className="heading-blog">
				<span>{letter}</span>
			</div>
			<ul className="a-cards grid-3x">
				<li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
                <li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
                <li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
                <li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
                <li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
                <li className="card">
					<span className="skeleton-background w-80px brs-circle h-80px"></span>
					<div className="card__content">
						<div className="heading-card skeleton-background w-100 brs-10px h-20px"></div>
						<div className="skeleton-background w-120px brs-10px h-18px mt-30px"></div>
					</div>
				</li>
			</ul>
		</>
	);
};

export default RatingSk;
