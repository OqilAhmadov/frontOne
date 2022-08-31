import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { api, queryBuilder } from "services";
import { t } from "i18next";

// const load = async(search, prevOptions, { page }, url, filterParams, params, loadOptionsKey) => {
// 	const { data } = await api.request.get(
// 		queryBuilder(url, { page, filter: filterParams(search), ...params })
// 	);

// 	return {
// 		options: loadOptionsKey
// 			? typeof loadOptionsKey === "function"
// 				? loadOptionsKey(data)
// 				: get(data, loadOptionsKey, [])
// 			: data,
// 		hasMore: get(data, "_meta.currentPage", 1) < get(data, "_meta.pageCount", 1),
// 		additional: { page: get(data, "_meta.currentPage", 1) + 1 }
// 	};
// };

class AsyncSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	static propTypes = {
		disabled: PropTypes.bool,
		type: PropTypes.oneOf(["normal", "small"]),
		title: PropTypes.string.isRequired,
		className: PropTypes.string,
		optionValue: PropTypes.string,
		optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		isSearchable: PropTypes.bool,
		menuPlacement: PropTypes.string,
		filterParams: PropTypes.object,
		extraOptions: PropTypes.array,
		onChange: PropTypes.func,
		loadOptionsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		loadOptionsParams: PropTypes.func,
		optionRenderer: PropTypes.func,
		isRequired: PropTypes.bool,
		isClearable: PropTypes.bool
	};

	static defaultProps = {
		title: "",
		className: null,
		optionValue: "id",
		optionLabel: "title",
		isSearchable: false,
		menuPlacement: "bottom",
		disableOptions: [],
		loadOptionsKey: "data",
		extraOptions: [],
		filterParams: {},
		loadOptionsParams: () => {},
		optionRenderer: () => {},
		onChange: () => {},
		type: "normal",
		isRequired: false,
		isClearable: false
	};

	load = async (search, prevOptions, { page }, url, filterParams, loadOptionsParams, loadOptionsKey, extraOptions) => {
		const { data } = await api.request.get(queryBuilder(url, { page, filter: filterParams, ...loadOptionsParams(search) }));

		return {
			options: loadOptionsKey
				? typeof loadOptionsKey === "function"
					? [...extraOptions, ...loadOptionsKey(data)]
					: [...extraOptions, ...get(data, loadOptionsKey, [])]
				: data,
			hasMore: get(data, "current_page", 1) < get(data, "last_page", 1),
			additional: { page: get(data, "current_page", 1) + 1 }
		};
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.loadOptionsUrl && prevProps.loadOptionsUrl !== this.props.loadOptionsUrl) {
			this.setState({ isLoading: true }, () => this.setState({ isLoading: false }));
		}
		if (!isEqual(prevProps.filterParams, this.props.filterParams)) {
			this.setState({ isLoading: true }, () => this.setState({ isLoading: false }));
		}

		if (prevProps.canUpdate !== this.props.canUpdate) {
			this.setState({ isLoading: true }, () => this.setState({ isLoading: false }));
		}
	}

	render() {
		const {
			disableOptions,
			label,
			isMulti,
			loadOptionsKey,
			placeholder,
			options,
			field,
			optionLabel,
			optionValue,
			form: { errors, setFieldValue, setFieldTouched, touched },
			isSearchable,
			menuPlacement,
			loadOptionsUrl,
			extraOptions,
			filterParams,
			onChange,
			isClearable,
			loadOptionsParams,
			type,
			disabled,
			isRequired,
			containerClassName
		} = this.props;

		const customStyle = {
			control: (provided, { isFocused }) => ({
				...provided,
				position: "relative",
				cursor: "pointer",
				border:
					touched[field.name] && errors[field.name]
						? "1px solid red"
						: isFocused
						? "1px solid rgba(30, 114, 231, 0.6)"
						: "1px solid rgba(23, 31, 38, 0.2)",
				padding: `${type === "normal" ? "0px 5px" : "10px 5px"}`,
				boxShadow: `none`,
				fontSize: "18px",
				borderRadius: "10px",
				color: "#000",
				height: "58px",
				maxHeight: "58px",

				backgroundColor: `${disabled ? "rgba(255,255,255,0.57)" : "#fff"}`,
				"&:hover": {
					borderColor: isFocused ? "rgba(30, 114, 231, 0.6)" : "rgba(23, 31, 38, 0.2)"
				},

				"@media(max-width: 680px)": {
					padding: type === "normal" ? "0px 2px" : "3px",
					fontSize: "16px"
				}
			}),
			container: provided => ({
				...provided,
				minWidth: "150px"
			}),
			valueContainer: provided => ({
				...provided,
				paddingTop: 0
			}),
			indicatorSeparator: provided => ({
				...provided,
				display: "none"
			}),
			indicatorsContainer: provided => ({
				...provided,
				height: "100%"
			}),
			option: (provided, { isSelected }) => ({
				...provided,
				fontSize: "20px",
				color: isSelected ? "#fff" : "#000",
				transition: "all 0.2s linear",
				backgroundColor: isSelected ? "rgba(30, 114, 231, 0.6)" : "#f8f8f8",
				"&:hover": {
					backgroundColor: "rgba(30, 114, 231, 0.4)"
				},

				"@media(max-width: 768px)": {
					fontSize: "16px"
				}
			}),
			placeholder: provided => ({
				...provided,
				fontSize: "20px",
				fontFamily: "Proxima Nova",
				whiteSpace: "nowrap",
				overflow: "hidden",

				fontWeight: "500",
				textOverflow: "ellipsis",
				color: "rgba(50, 50, 50, 0.3)",
				"@media(max-width: 768px)": {
					fontSize: "16px"
				}
			}),
			menu: base => ({
				...base,
				zIndex: "5",
				fontFamily: "Proxima Nova"
			})
		};

		const { isLoading } = this.state;

		return (
			<div className={`simple-select ${containerClassName}`}>
				<div>
					{label && (
						<label className="form-label">
							{label}
							{isRequired && <span className="form-require">*</span>}
						</label>
					)}
					{!isLoading && (
						<AsyncPaginate
							styles={customStyle}
							id={field.name}
							name={field.name}
							debounceTimeout={300}
							onChange={option => {
								onChange(option);
								setFieldValue(field.name, option);
							}}
							onBlur={() => setFieldTouched(field.name, true)}
							getValue={option => option[optionValue]}
							getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
							getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
							value={field.value}
							additional={{ page: 1 }}
							isDisabled={disabled}
							isClearable={isClearable}
							loadOptions={(search, prevOptions, { page }) =>
								this.load(search, prevOptions, { page }, loadOptionsUrl, filterParams, loadOptionsParams, loadOptionsKey, extraOptions)
							}
							isOptionDisabled={option => disableOptions.reduce((prev, curr) => [...prev, curr.id], []).includes(option.id)}
							{...{ isMulti, options, placeholder: t(placeholder), isSearchable, menuPlacement }}
						/>
					)}
					{touched[field.name] && errors[field.name] && (
						<span className="simple-select__error" style={{ color: "red" }}>
							{errors[field.name]}
						</span>
					)}
				</div>
			</div>
		);
	}
}

export default AsyncSelect;
