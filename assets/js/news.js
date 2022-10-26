// Funcion que obtine los parametros de busqueda de news.html
const getQueryParams = () => {
	const urlQuery = window.location.search;
	const urlParams = new URLSearchParams(urlQuery);
	// < --- --- --- --- > //
	queryParams.section = urlParams.get("section");
};

// Funcion que carga las noticias segun la seccion elegida
const loadNews = async (size) => {
	let dataArray = await getNews();
	dataArray = dataArray.filter((news) => news.category == queryParams.section);
	// Pendiente hacer que cargue con scroll
	const news = splitProducts(dataArray, size);
	mapNews(news[0], $newsContainer);
};

const newsInit = async () => {
	getQueryParams();

	if (queryParams.section !== "forMe") {
		loadNews(20);
	} else {
		const categories = newsForYou();
		if (!categories.length) {
			$newsContainer.innerHTML = "<h2>Aún no has configurado tus gustos.</h2>";
		}
	}

	$newsContainer.addEventListener("click", newIsClicked);
};

newsInit();
