import React from "react";

import PropTypes from "prop-types";
import cx from "classnames";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";

const MaskInput = ({ className, label, placeholder, disabled, type, mask, field, form: { touched, errors }, ...props }) => {
	const { t } = useTranslation();
	const classes = cx("form-group", touched[field.name] && errors[field.name] && "has-error", field.value && "label-top", className);
	return (
		<div className={classes}>
			{label && <label className="form-label form-label--sm">{label}</label>}
			<InputMask
				style={touched[field.name] && errors[field.name] && { borderColor: "red" }}
				className="form-input"
				mask={mask}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				formatChars={{
					"9": "[0-9]",
					A: "[A-Z]"
				}}
				{...props}
				{...field}
			/>
			{touched[field.name] && errors[field.name] && <div className="form-group__error">{t("To'ldirish majburiy")}</div>}
		</div>
	);
};

MaskInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["text", "password", "phone"]),
	className: PropTypes.string,
	mask: PropTypes.string,
	disabled: PropTypes.bool
};

MaskInput.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null,
	mask: "+999999999999",
	disabled: false
};

export default MaskInput;
