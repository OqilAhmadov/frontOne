import React, { useState } from "react";
import get from "lodash/get";
import Dropzone from "react-dropzone";
import systemActions from "store/actions/system";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Spinner } from "components";
import mountain from "assets/images/icons/mountain-icon.svg";
import deleteSvg from "assets/images/icons/delete.svg";

const UploadFile = ({
	className,
	form: { values, setFieldValue },
	field,
	label,
	labelColor,
	text,
	textColor,
	size,
	isDocument,
	isMulti,
	type,
	maxSize,
	minSize
}) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isFetched, setFetched] = useState(true);
	//eslint-disable-next-line
	const [error, setError] = useState(null);

	const getAccepted = docType => {
		switch (docType) {
			case "all":
				return ".pdf, .jpeg, .png, .jpg, .doc, .docx, .xls,.xlsx,.txt, .mp4, .mvk";
			case "onlyFive":
				return ".jpeg,.png,.jpg,.rar,.zip,.pdf,.doc,.docx,.mp4";
			default:
				return ".jpeg, .png, .jpg, .mp4";
		}
	};

	const getFileType = file => {
		const format = get(file, "ext", "").toLowerCase();
		const fileTypes = ["doc", "docx", "jpg", "jpeg", "mp3", "pdf", "png", "ppt", "xls", "xlsx", "zip", ".mp4", ".mvk"];
		const hasFileType = fileTypes.includes(format);
		return hasFileType ? format : "default";
	};

	const onChange = files => {
		console.log(files);
		setFetched(false);
		setError(false);
		let formData = new FormData();
		files.forEach(file => formData.append("files[]", file));

		const cb = {
			success: (uploadedImages = {}) => {
				const item = Object.values(uploadedImages);
				setFieldValue(field.name, [...item, ...values[field.name]]);
			},
			failure: e => {
				setError(e);
			},
			finally: () => {
				setFetched(true);
			},
			loading: (loaded, total) => {}
		};

		dispatch(systemActions.UploadFile({ files: formData, cb }));
	};

	const handleRemove = id => {
		const cb = {
			success: () => {},
			failure: e => {
				setError(e);
			},
			finally: () => {
				const images = values[field.name].filter(val => val.id !== id);
				setFieldValue(field.name, [...images]);
			}
		};
		dispatch(systemActions.DeleteFile({ id: id, cb }));
	};

	return (
		<>
			<div className={`attach_file ${className}`}>
				{label && (
					<div className="gr" style={{ color: labelColor }}>
						{label}
					</div>
				)}
				<div className="attach_file_container">
					<div className="attach-items">
						{get(values, `${field.name}`, []).length > 0 ? (
							<div className={"file-group"}>
								{get(values, `${field.name}`, []).map((image, key) => {
									return (
										<div className={"file-item-wrapper"} key={key}>
											<div
												className={"file-item has-bg"}
												style={{
													backgroundImage: !isDocument
														? `url(${
																get(image, "ext") === "mp4" || get(image, "ext") === "mvk"
																	? `https://image.shutterstock.com/image-vector/play-video-icon-vector-movie-260nw-1671088150.jpg`
																	: get(image, "thumbnails.normal.src", "")
														  })`
														: null
												}}>
												{isDocument ? <img src={require(`./icons/file_${getFileType(image)}.svg`)} alt={image} /> : null}
												{/* {!isDocument ? <img src={get(image, "thumbnails.normal.src", "")} alt={image} /> : null} */}
												<div className={"delete-image"} onClick={() => handleRemove(get(image, "id", ""))}>
													<img src={deleteSvg} alt="delete icon" />
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : null}
						{get(values, `${field.name}`, "").length < size ? (
							<div className={"position-relative"}>
								<Dropzone onDrop={files => onChange(files)} accept={getAccepted(type)} multiple={isMulti} minSize={minSize} maxSize={maxSize}>
									{({ getRootProps, getInputProps }) => (
										<div {...getRootProps()}>
											<div className="file-upload__dropzone">
												<input {...getInputProps()} />
												<label className="label" htmlFor="file1">
													<div className="label__wrapper">
														<div className="img" style={{ textAlign: "center" }}>
															<img src={mountain} alt="mountain" />
															<p>{t("3 та филе юкланг")}</p>
														</div>
														<p className="info-paragraph">
															{t("Расмни тортиб ўтинг ёки компьютердан юкланг. 30мгдан йукори болмаган филе юкланг")}
														</p>
													</div>
												</label>
											</div>
										</div>
									)}
								</Dropzone>
								{!isFetched && <Spinner position={"absolute"} md />}
							</div>
						) : null}
					</div>
					<span style={{ color: textColor }}>{text}</span>
				</div>
				{error && (
					<div className="error-block" style={{ color: "red", fontWeight: "600" }}>
						{t("Прикрепить файл менше 30 мб")}
					</div>
				)}
			</div>
		</>
	);
};

UploadFile.defaultProps = {
	className: "",
	text: "",
	textColor: "#263A55",
	label: "",
	labelColor: "#263A55",
	size: 1,
	isDocument: false,
	isMulti: false,
	minSize: 0,
	maxSize: 31457280
};

export default UploadFile;
