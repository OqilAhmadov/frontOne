import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

class ReCaptcha extends Component {
	render() {
		const {
			field,
			form: { touched, errors, setFieldValue }
		} = this.props;

		const divStyle = {
			color: "#ff0030",
			fontSize: "13px",
			paddingTop: "10px"
		};

		return (
			<div className="reCaptcha-field">
				<ReCAPTCHA
					sitekey="6LegmpEbAAAAAGTJdL7_xEIZi1R-2R7rNv74WTXR"
					// size="invisible"
					onChange={value => {
						setFieldValue(field.name, value);
					}}
				/>
				{touched[field.name] && errors[field.name] && (
					<div className="help-block" style={divStyle}>
						{errors[field.name]}
					</div>
				)}
			</div>
		);
	}
}

export default ReCaptcha;
