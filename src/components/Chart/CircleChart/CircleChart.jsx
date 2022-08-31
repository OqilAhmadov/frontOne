import { get } from "lodash";
import React from "react";
import { Doughnut, Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const options1 = {
	responsive: true,
	legend: {
		display: false,
		position: "bottom",
		labels: {
			fontSize: 42,
			fontColor: "#323232",
			fontFamily: "Proxima Nova"
		}
	}
};

export default function CircleChart({ height, width, color, percent, total, finished, fontSizeCustom, textColor }) {
	var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;

	Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
		draw: function() {
			originalDoughnutDraw.apply(this, arguments);
			var chart = this.chart;
			var width = chart.chart.width,
				height = chart.chart.height,
				ctx = chart.chart.ctx;
			var fontSize = (height / 114).toFixed(2);
			ctx.font = fontSizeCustom || fontSize + "em sans-serif";
			ctx.fillStyle = textColor || "#323232";
			ctx.textBaseline = "middle";
			var text = chart.config.data.text,
				textX = Math.round((width - ctx.measureText(text).width) / 2),
				textY = height / 2;
			ctx.fillText(text, textX, textY);
		}
	});
	const {t} = useTranslation();
	return (
		<div>
			<Doughnut
				data={{
					labels: [t("Amalga oshirilgan"), t("Tugallanmagan")],
					datasets: [
						{
							data: [finished, total - finished],
							backgroundColor: [get(color, "color1"), get(color, "color2")]
						}
					],
					text: percent + "%"
				}}
				options={options1}
				height={height}
				width={width}
			/>
		</div>
	);
}
