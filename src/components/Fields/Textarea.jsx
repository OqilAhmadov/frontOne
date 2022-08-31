import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cx from "classnames";

const TextInput = ({
	label,
	className,
	placeholder,
	disabled,
	type,
	field,
	form: { touched, errors },
	...props
}) => {
	const { t } = useTranslation();
	const classes = cx(
		"tm-textarea",
		touched[field.name] && errors[field.name] && "error",
		className
	);

	return (
		<div className="form-group">
			{label && <label className='textarea-label'>{label}</label>}
			<textarea
				className={classes}
				{...{ placeholder:t(placeholder), type }}
				{...props}
				{...field}
				autoComplete={"off"}
			/>
			{touched[field.name] && errors[field.name] && (
				<small>{t(errors[field.name])}</small>
			)}
		</div>
	);
};

TextInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.oneOf(["text", "password"]),
	className: PropTypes.string,
	placeholder: PropTypes.string
};

TextInput.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null
};

export default TextInput;
