import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

import "./style.scss";

class ModalComponent extends Component {
	static propTypes = {
		size: PropTypes.oneOf([900, 800, 700, 600, 500, 400]),
		closeIcon: PropTypes.bool,
		isOpen: PropTypes.bool,
		toggle: PropTypes.func,
		backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["static"])]),
		scroll: PropTypes.bool
	};

	static defaultProps = {
		size: 900,
		closeIcon: true,
		isOpen: false,
		backdrop: true,
		scroll: false
	};

	_toggleAction = () => {
		this.props.toggle();
	};

	render() {
		const { size, customClass, isOpen, backdrop } = this.props;

		const classNames = cx("mx-modal-wrapper", size && `max-w-${size}`);

		const defaultStyle = {
			transition: "all .4s ease .2s",
			opacity: 0,
			visibility: "hidden"
		};

		const transitionStyles = {
			entering: { opacity: 0, visibility: "hidden" },
			entered: {
				opacity: 1,
				visibility: "visible",
				transition: "all .4s ease .0s"
			},
			exited: { opacity: 0, visibility: "hidden" }
		};

		const defaultModalStyle = {
			transition: "all .3s ease",
			opacity: 0,
			visibility: "hidden",
			transform: "translateY(-20px)"
		};

		const transitionModalStyles = {
			entering: { opacity: 0, visibility: "hidden" },
			entered: {
				opacity: 1,
				visibility: "visible",
				transform: "translateY(0)",
				transition: "all .3s ease .2s"
			},
			exited: { opacity: 0, visibility: "hidden" }
		};

		return (
			<Transition
				in={isOpen}
				timeout={{
					enter: 0,
					exit: 600
				}}
				unmountOnExit>
				{state => (
					<div
						className={`modal open ${customClass ? customClass : ""}`}
						style={{
							...defaultStyle,
							...transitionStyles[state]
						}}>
						<div
							className="overlay"
							onClick={() => (backdrop === true ? this._toggleAction() : () => {})}
							style={{
								...defaultStyle,
								...transitionStyles[state]
							}}
						/>
						<div
							className={classNames}
							style={{
								...defaultModalStyle,
								...transitionModalStyles[state]
							}}>
							{this.props.children}
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

export default ModalComponent;
