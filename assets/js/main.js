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
	if (userData.log) {
		location.href = "/news.html?section=forMe";
	} else {
		location.href = "/login.html";
	}
};

// Funcion para cargar las noticias principales //
const firstNews = async () => {
	const dataArray = await getNews();
	const news = splitProducts(dataArray, 2);
	mapNews(news[0], $newsContainer);
};

const mainInit = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	$yourNews.addEventListener("click", newIsClicked);
	$moreNewsP.addEventListener("click", loadOrLogin);
	firstNews();
	filterNewsForYou(2);
	isLogged();
};

mainInit();
