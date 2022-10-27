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

// Funcion para cargar las noticias principales //
/* const firstNews = async () => {
	const dataArray = await getNews();
	const news = splitProducts(dataArray, 2);
	mapNews(news[0], $newsContainer);
}; */

// Funcion que informa que no se han seleccionado preferencias para mostrar noticias personalizadas
const setPreferences = async () => {
	const categories = yourCategories();
	if (!categories.length) {
		$yourNews.innerHTML = "<p>Aún no has configurado tus gustos.</p>";
		$moreNewsP.textContent = "Configurar preferencias";
	}
};

const mainInit = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	$yourNews.addEventListener("click", newIsClicked);
	$moreNewsP.addEventListener("click", loadOrLogin);
	/* firstNews();
	filterNewsForYou(2); */
	isLogged();
	setPreferences();
};

mainInit();
