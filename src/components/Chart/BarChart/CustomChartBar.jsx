import React from "react";
import "./style.scss";

const CustomChartBar = ({ chartData, width, height, columnBorderRadius, paddingWrapper, columnColor, verticalInterval, isY }) => {
	const maxValue = chartData && Math.max(...chartData.map(item => item.series));
	const generatorY = maxValue => {
		let valueY = [];
		const element = [];
		let i = 1;
		for (let index = 0; index <= maxValue; index = index + verticalInterval) {
			if (index === i * verticalInterval) {
				element[i - 1] = i * verticalInterval;
				i++;
			}
		}
		valueY = element;
		valueY.unshift(0);
		return element;
	};
	return (
		<div>
			<div className="chart-container" style={{ width: width }}>
				{isY && (
					<div className="series" style={{ height: height }}>
						{generatorY(maxValue)
							.reverse()
							.map((data, i) => {
								return (
									<div key={i} style={{ textAlign: "right" }}>
										{data}
									</div>
								);
							})}
					</div>
				)}

				<div className="chart-container__box" style={{ width: width, borderLeft: `${!isY && "none"}` }}>
					<div className="chart-container__box__row" style={{ width: width, height: height }}>
						{chartData &&
							chartData.map((data, i) => {
								return (
									<div key={i} style={{ width: width / chartData.length, height: height }} className="wrapper-col">
										<div
											style={{
												padding: `0 ${paddingWrapper}px`,
												height: `${(data.series / maxValue) * 100}%`,
												borderRadius: columnBorderRadius,
												background: columnColor
											}}
											className="chart-container__box__row__col"
											key={i}>
											<div className="circle" style={{ width: "100%", height: `${paddingWrapper * 2}px` }}>
												<span className="inner-circle" style={{ width: `${paddingWrapper}px`, height: `${paddingWrapper}px` }}></span>
											</div>
										</div>
										<span
											className="tooltip"
											style={{
												bottom: maxValue - 80 < data.series ? data.series : data.series + 60
											}}>
											{data.series}
										</span>
									</div>
								);
							})}
					</div>
				</div>

				<div className="categories" style={{ width: "100%",position:"relative" }}>
					{chartData &&
						chartData.map((data, i) => (
							<div style={{ width: width / chartData.length, textAlign: "center"}} key={i}>
								{data.categories}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CustomChartBar;
