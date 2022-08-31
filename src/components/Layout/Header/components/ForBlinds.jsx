import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Readibility from "assets/images/icons/ochki.svg";
import mode1 from "assets/images/mode-icon.svg";
import mode2 from "assets/images/mode-icon2.svg";
import mode3 from "assets/images/mode-icon3.svg";

class ForBlinds extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			bodyClass: "",
			showImage: true
		};

		this.ref = React.createRef();
	}

	componentDidMount() {
		document.addEventListener("click", this.handleClickOutside, true);
		return () => {
			document.removeEventListener("click", this.handleClickOutside, true);
		};
	}

	toggleDropdown = () => {
		this.setState(
			state => ({
				visible: !state.visible
			}),
			() => {
				document.addEventListener("click", this._closeDropdown);
			}
		);
	};

	_defaultAction = () => {
		this.setState(
			{
				bodyClass: "greyscaleMode"
			},
			() => {
				document.body.className = " ";
			}
		);
	};
	_greyscaleAction = () => {
		this.setState(
			{
				bodyClass: "greyscaleMode"
			},
			() => {
				document.body.classList.remove("greyscaleInvertMode");
				document.body.classList.add("greyscaleMode");
			}
		);
	};
	_greyscaleInvertAction = () => {
		this.setState(
			{
				bodyClass: "greyscaleInvertMode"
			},
			() => {
				document.body.classList.remove("greyscaleMode");
				document.body.classList.add("greyscaleInvertMode");
			}
		);
	};

	handleClickOutside = event => {
		if (this.ref.current && !this.ref.current.contains(event.target)) {
			this.setState(
				() => ({
					visible: false
				}),
				() => {
					document.addEventListener("click", this._closeDropdown);
				}
			);
		}
	};

	removeSizeTypes = () => {
		const sizeTypes = ["zoom1", "zoom2", "zoom3"];

		sizeTypes.forEach(item => {
			document.body.classList.remove(item);
		});
	};
	addClassSize(className) {
		this.removeSizeTypes();
		document.body.classList.add(className);
	}
	toggleClassImage = () => {
		if (document.body.classList.contains("no_image")) {
			document.body.classList.remove("no_image");
		} else {
			document.body.classList.add("no_image");
		}
	};
	render() {
		const { t } = this.props;
		const { visible } = this.state;

		return (
			<div className="header-top__for-blind">
				<div className="header-top__for-blind-top">
					<div className="readibility__box" onClick={() => this.toggleDropdown()}>
						<img src={Readibility} alt="readibility" />
						{/* {withOutLabel === false ? "" : <span>{t("Махсус имконият")}</span>} */}
					</div>
				</div>
				<div className={`dropdown ${visible ? "visible" : ""}`} ref={this.ref}>
					<div className="appearance">
						<div className="eye-settings__title">{t("САЙТНИ АКС ЕТТИРИШ")}</div>
						<div className="eye-settings__view">
							<div className="eye-settings__view-item" id="viewItemColor" onClick={this._defaultAction}>
								<p>{t("Rangli")} </p>
								<img src={mode1} alt="eye-mode-icon" />
							</div>

							<div className="eye-settings__view-item" onClick={this._greyscaleAction}>
								<span>{t("Rangsiz")}</span>
								<img src={mode2} alt="eye-mode-icon" />
							</div>

							<div className="eye-settings__view-item" onClick={this._greyscaleInvertAction}>
								<span>{t("Teskari rangli")}</span>
								<img src={mode3} alt="eye-mode-icon" />
							</div>
						</div>
					</div>
					<div className="appearance">
						<div className="eye-settings__title">{t("ШРИФТ ЎЛЧАМИ")}</div>
						<div className="eye-settings__text">
							<div className="eye-settings__text-item">A</div>
							<div className="eye-settings__text-item">A</div>
							<div className="eye-settings__text-item">A</div>

							<div className="eye-settings__text-radio">
								<input
									className="font-remote"
									id="normal"
									type="radio"
									name="font-size"
									onClick={() => this.addClassSize("zoom1")}
									defaultChecked={true}
								/>
								<label className="font-remote-label label1" htmlFor="normal" checked></label>
								<input
									className="font-remote"
									id="medium"
									type="radio"
									name="font-size"
									onClick={() => this.addClassSize("zoom2")}
									defaultChecked={false}
								/>
								<label className="font-remote-label font-remote-label2 label2" htmlFor="medium"></label>
								<input
									className="font-remote"
									id="big"
									type="radio"
									name="font-size"
									onClick={() => this.addClassSize("zoom3")}
									defaultChecked={false}
								/>
								<label className="font-remote-label label3" htmlFor="big"></label>
							</div>
						</div>
					</div>

					<div className="appearance">
						<h3 className="eye-settings__title">{t("ТАСВИРЛАР")}</h3>

						<div className="eye-settings__img">
							<div className="eye-settings__view-img">
								<label className="eye-settings__switch">
									<input type="checkbox" name="checkboks" onChange={e => this.toggleClassImage(e)} />
									<span className="toggle" />
									<span className="off">off</span>
									<span className="on">on</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(ForBlinds);
