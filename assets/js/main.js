// Cargar las novedades de hoy //
const loadFirstNews = async () => {
	const firstNews = await fetchNew(2, 0);
	mapNews(firstNews.articles, $newsContainer);
};

// Cargar noticias para ti //
const loadNewsForYou = async () => {
	const firstNews = await fetchNew(2, 2);
	mapNews(firstNews.articles, $yourNews);
};

// Guardar la noticia //
const saveNew = (e) => {
	const filterId = e.target.id;
	const newTitle = e.target.dataset.title;
	newSaved = [...newSaved, newTitle];
	saveLocalStorage("newSaved", newSaved);
	changeStatus(filterId, true);
};

// Borrar la noticia //
const deleteNew = (e) => {
	const filterId = e.target.id;
	const newTitle = e.target.dataset.title;
	newSaved = newSaved.filter((news) => newTitle != news);
	saveLocalStorage("newSaved", newSaved);
	changeStatus(filterId, false);
};

// Comprobar si hay que guardar o borrar la noticia//
const newIsClicked = (e) => {
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-regular")) return saveNew(e);
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-solid")) return deleteNew(e);
};

// Guardar noticias //
const changeStatus = (newId, isSaved) => {
	const icon = document.getElementById(newId);
	if (isSaved) {
		icon.classList.remove("fa-regular");
		icon.classList.add("fa-solid");
	} else {
		icon.classList.add("fa-regular");
		icon.classList.remove("fa-solid");
	}
};

// Comprobación de inicio de sesion //
const isLogged = () => {
	if (userData.log) {
		loadNewsForYou();
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

const init = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	$moreNewsP.addEventListener("click", loadOrLogin);
	loadFirstNews();
	isLogged();
};

init();
