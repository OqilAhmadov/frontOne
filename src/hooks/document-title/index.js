import { useEffect, useState } from "react";

const useDocumentTitle = (title = "Industria") => {
	const [document_title, setDocumentTitle] = useState(title);
	useEffect(() => {
		document.title = document_title;
	}, [document_title]);

	return setDocumentTitle;
};

export default useDocumentTitle;
