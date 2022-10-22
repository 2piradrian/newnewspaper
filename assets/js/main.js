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
		location.href = "/news.html";
	} else {
		location.href = "/login.html";
	}
};

const mainInit = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	$moreNewsP.addEventListener("click", loadOrLogin);
	loadFirstNews();
	isLogged();
};

mainInit();
