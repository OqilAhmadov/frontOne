import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import cx from "classnames";

import { ReactComponent as ArrowDown } from "assets/images/icons/arrow-down.svg"


const SimpleValue = ({ options, value, optionValue, children, ...rest }) => {
    value = value ? options.find(option => typeof optionValue === "string" && option[optionValue] === value) : value;
    return children({ options, value, ...rest });
};

const SelectComponent = props => {
    const { t } = useTranslation();
    const {
        isClearable = false,
        isDisabled = false,
        isMulti = false,
        isSearchable = false,
        disableOptions,
        className,
        label,
        placeholder,
        options,
        field,
        optionLabel,
        optionValue = "id",
        form: { touched, errors, setFieldValue, setFieldTouched },
        menuPlacement,
        initialValue,
        menuPortalTarget,
        handleChange = () => { },
        ...otherProps
    } = props;
    const classes = cx(
        "form-field-select mb-5",
        touched[field.name] && errors[field.name] && "form-field-select--error",
        field.value && "form-field-select--active",
        className ? className : ""
    );

    const customStyle = {
        menu: props => ({
            ...props,
            zIndex: 10
        }),
        control: props => ({
            ...props,
            height: "50px",
            cursor: "pointer",
            border: "1px solid #C9D0EB",
            borderRadius: "10px",

            "&:hover": {
                border: "1px solid #C9D0EB",
            }
        }),
        indicatorSeparator: provided => ({
            ...provided,
            display: "none"
        }),
        placeholder: props => ({
            ...props,
            whiteSpace: "nowrap"
        }),
        indicatorsContainer: provided => ({
            ...provided,
            display: "none"
        }),
    };

    useEffect(() => {
        if (initialValue) {
            setFieldValue(field.name, initialValue);
        }
    }, [field, initialValue, setFieldValue]);

    return (
        <div className={classes}>
            {label && <div className="form-field-select__label">{t(label)}</div>}
            <SimpleValue
                id={field.name}
                name={field.name}
                onChange={(option, action) => {
                    setFieldValue(field.name, option ? option[optionValue] : null);
                    handleChange(option);
                }}
                onBlur={() => setFieldTouched(field.name, true)}
                options={options}
                optionValue={optionValue}
                getValue={option => typeof optionValue === "string" && option[optionValue]}
                getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
                getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
                placeholder={t(placeholder)}
                styles={customStyle}
                menuPortalTarget={menuPortalTarget}
                value={field.value}
                isDisabled={isDisabled}
                isMulti={isMulti}
                isSearchable={isSearchable}
                isClearable={isClearable}
                menuPlacement={menuPlacement}
                {...otherProps}>
                {simpleProps => <Select {...simpleProps} />}
            </SimpleValue>
            {touched[field.name] && errors[field.name] && (
                <div className="text-theme-24 absolute left-0">
                    <span>{t(errors[field.name])}</span>
                </div>
            )}
            <ArrowDown style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-42%)",
                right: "20px",
                pointerEvents: "none"
            }} />
        </div>
    );
};

export default SelectComponent;
