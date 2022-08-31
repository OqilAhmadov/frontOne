import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cx from "classnames";

const TextInput = ({
	className,
	containerClassName,
	placeholder,
	disabled,
	onClick,
	type,
	inputClassName,
	mask,
	field,
	label,
	form: { touched, errors },
	...props
}) => {
	const { t } = useTranslation();
	const classes = cx("tm-input", touched[field.name] && errors[field.name] && "error", className);
	const classesWrap = cx("form-group", containerClassName, disabled && "is-disable");

	return (
		<div className={classesWrap}>
			{label && <label className="textInput-label">{label}</label>}
			<input
				style={touched[field.name] && errors[field.name] && { borderColor: "red" }}
				className={classes}
				{...{ placeholder: placeholder, type }}
				{...props}
				{...field}
				autoComplete={"off"}
				disabled={disabled}
			/>
			{touched[field.name] && errors[field.name] && <div className="form-group__error">{t("To'ldirish majburiy")}</div>}
		</div>
	);
};

TextInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.oneOf(["text", "password", "email", "number", "tel"]),
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


