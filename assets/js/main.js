// Comprobación de inicio de sesion //
const isLogged = () => {
	if (userData.log) {
		$moreNewsP.textContent = "Cargar mas noticias";
	} else {
		$moreNewsP.textContent = "Ingresar a tu cuenta";
		$yourNews.innerHTML = "<p>Para obtener novedades personalizadas debes iniciar sesión.</p>";
	}
};

// Comprobar si esta cargando noticias o redirigiendo //
const loadOrLogin = () => {
	const categories = yourCategories();
	if (!userData.log) {
		location.href = "/login.html";
	} else if (!categories.length) {
		location.href = "/account.html";
	} else {
		location.href = "/news.html?section=forMe";
	}
};

// Funcion que informa que no se han seleccionado preferencias para mostrar noticias personalizadas
const setPreferences = async () => {
	const categories = yourCategories();
	if (!categories.length && userData.log) {
		$yourNews.innerHTML = "<p>Aún no has configurado tus gustos.</p>";
		$moreNewsP.textContent = "Configurar preferencias";
		return;
	}
};

// Funcion que carga las noticias del inicio
const loadFirstNews = async () => {
	const newsToLoad = await getNews();
	const categories = yourCategories();

	const general = splitProducts(
		newsToLoad.filter((news) => news.category === "general"),
		2
	);
	const forYou = splitProducts(
		newsToLoad.filter((news) => categories.includes(news.category)),
		2
	);

	mapNews(general[0], $newsContainer);
	mapNews(forYou[0], $yourNews);
};

const mainInit = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	$yourNews.addEventListener("click", newIsClicked);
	$moreNewsP.addEventListener("click", loadOrLogin);
	loadFirstNews();
	isLogged();
	setPreferences();
};

mainInit();
