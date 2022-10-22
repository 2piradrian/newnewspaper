// Funcion que oculta el menu de busqueda si no estamos en la seccion buscar
const hideSearchMenu = () => {
	if (queryParams.section === "search") {
		$formFilterMenu.style.display = "flex";
	} else {
		$formFilterMenu.style.display = "none";
	}
};

// Funcion que renderiza las noticias segun categoria
const renderByCategory = async (page) => {
	const firstNews = await searchByCategory(page);
	mapNews(firstNews.results, $newsContainer);
};

// Funcion que se encarga de buscar por categorias
const searchByCategory = async (page) => {
	const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&page=${page}&category=${queryParams.section}`;
	const res = await fetch(URL);
	const data = await res.json();
	console.log(data);
	return data;
};

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
	renderByCategory(2);
};

initNews();
