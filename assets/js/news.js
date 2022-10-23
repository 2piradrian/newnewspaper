// Funcion que obtine los parametros de busqueda de news.html
const getQueryParams = () => {
	const urlQuery = window.location.search;
	const urlParams = new URLSearchParams(urlQuery);
	// < --- --- --- --- > //
	queryParams.section = urlParams.get("section");
};

const initNews = () => {
	getQueryParams(true);
};

initNews();
