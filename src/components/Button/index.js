import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cx from "classnames";

import "./style.scss";

const ButtonComponent = ({ isLink, path, isSubmitting, className, title, onClick, type, children, ...rest }) => {
	const classNames = cx(`btn`, className ? className : "");
	return !isLink ? (
		<button type={type} onClick={onClick} className={classNames} {...rest}>
			{title ? title : children}
		</button>
	) : (
		<Link to={path} className={classNames}>
			{title ? title : children}
		</Link>
	);
};

ButtonComponent.propTypes = {
	type: PropTypes.oneOf(["submit", "button", "reset"]).isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string
};

export default ButtonComponent;
