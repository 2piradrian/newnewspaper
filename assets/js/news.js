// Funcion que obtine los parametros de busqueda de news.html
const getQueryParams = () => {
	const urlQuery = window.location.search;
	const urlParams = new URLSearchParams(urlQuery);
	// < --- --- --- --- > //
	queryParams.section = urlParams.get("section");
};

// Funcion que carga noticias al hacer scroll
const scrollLoad = async (e) => {
	const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
	const bottom = scrollTop + clientHeight >= scrollHeight - 1;
	if (bottom && !load.isFetching) {
		load.next++;
		load.isFetching = false;
		if (load.next < load.limit) {
			const newsToLoad = await filterNews();
			mapNews(newsToLoad[load.next], $newsContainer);
		}
	}
};

const newsInit = async () => {
	getQueryParams();
	const categories = yourCategories();
	if (!categories.length && queryParams.section == "forMe") {
		$newsContainer.innerHTML = '<h2 class="noSetting">Aún no has configurado tus gustos.</h2>';
		return;
	}
	const newsToLoad = await filterNews();

	mapNews(newsToLoad[0], $newsContainer);

	load.limit = newsToLoad.length;

	// Eventos
	$newsContainer.addEventListener("click", newIsClicked);
	window.addEventListener("scroll", scrollLoad);
};

newsInit();
