// Funcion que obtine los parametros de busqueda de news.html
const getQueryParams = () => {
	const urlQuery = window.location.search;
	const urlParams = new URLSearchParams(urlQuery);
	// < --- --- --- --- > //
	queryParams.section = urlParams.get("section");
};

// Funcion que carga noticias al hacer scroll
const scrollLoad = async () => {
	const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
	const bottom = scrollTop + clientHeight >= scrollHeight - 1;
	if (bottom && !load.isFetching) {
		load.isFetching = false;
		if (load.next < load.limit) {
			const newsToLoad = await filterNews();
			setTimeout(mapNews(newsToLoad[load.next], $newsContainer), 800);
			load.next++;
		}
	}
};

const newsInit = async () => {
	getQueryParams();
	const categories = yourCategories();
	if (!categories.length && queryParams.section == "forMe") {
		$newsContainer.innerHTML = `
		<div class="forMeBox">
			<h2 class="noSetting">Aún no has configurado tus gustos.</h2>
			<p>Cuentanos que tipo de noticias te gustan para mejorar tu experiencia.</p>
			<p class="forMeBox-p">¿O acaso querés ver noticias del tio del marido de Pampita?</p>
			<small></small>
			<a 
				href="${userData.log ? "/account.html" : "/register.html"}" 
				class="invisibleAnchor">
			<button>
				Configurar mi cuenta.
			</button>
			</a>
		</div>
		`;
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
