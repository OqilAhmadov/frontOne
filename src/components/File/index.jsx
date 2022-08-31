import React from "react";
import get from "lodash/get";

const Index = ({ image, handleRemove }) => {
	const format = get(image, "ext", "");
	const size = get(image, "size", "");

	const formatBytes = (bytes, decimals = 2) => {
		if (bytes === 0) return "0 Bytes";

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	};

	const fileTypes = ["doc", "docx", "jpg", "jpeg", "mp3", "pdf", "png", "ppt", "xls", "zip"];
	const hasFileType = fileTypes.includes(format);

	return (
		<div className={"file-item-wrapper"}>
			<div className={"file-item"}>
				{hasFileType ? <img src={require(`./icons/file_${fileTypes[format]}.svg`)} alt="" /> : <img src={require("./icons/file_default.svg")} alt="" />}
				<div className={"delete-image"} onClick={() => handleRemove(get(image, "id", ""))}>
					<img src={require("./icons/delete.svg")} alt="" />
				</div>
			</div>
			{formatBytes(size)}
		</div>
	);
};

export default Index;
