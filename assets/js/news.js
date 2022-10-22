let queryParams = {
	section: "search",
	since: undefined,
	until: undefined,
	keywords: undefined,
	lang: undefined,
};

// Funcion que oculta el menu de busqueda si no estamos en la seccion buscar
const hideSearchMenu = () => {
	if (queryParams.section === "search") {
		$formFilterMenu.style.display = "flex";
	} else {
		$formFilterMenu.style.display = "none";
	}
};

// Funcion que se encarga de buscar por categorias
const searchByCategory = () => {};

// Funcion que obtine los parametros de busqueda de news.html
const getQueryParams = (firstLoad) => {
	const urlQuery = window.location.search;
	const urlParams = new URLSearchParams(urlQuery);
	// < --- --- --- --- > //
	if (firstLoad) {
		queryParams.section = urlParams.get("section");
	} else {
		queryParams.since = urlParams.get("since");
		queryParams.until = urlParams.get("until");
		queryParams.keywords = urlParams.get("keywords");
		queryParams.lang = urlParams.get("lang");
	}
};

const initNews = () => {
	getQueryParams(true);
	hideSearchMenu();
};

initNews();
