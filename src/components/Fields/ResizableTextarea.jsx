import { t } from "i18next";
import React, { Component } from "react";

class ResizableTextarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 1,
			minRows: 1,
			maxRows: 15,
		};
	}

	handleChange = (event) => {
		const {onChangeHandle} = this.props;

		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;

		const previousRows = event.target.rows;
		event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

		if (currentRows === previousRows) {
			event.target.rows = currentRows;
		}

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

		onChangeHandle(event.target.value);

		this.setState({
			rows: currentRows < maxRows ? currentRows : maxRows,
		});
	};

	render() {
		const { value, placeholder, autoFocus } = this.props;
		return (
			<textarea
				rows={this.state.rows}
				value={value}
				placeholder={t(placeholder)}
				className={'textarea'}
				onChange={this.handleChange}
				autoFocus={autoFocus}
			/>
		);
	}
}

export default ResizableTextarea;
