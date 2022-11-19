// Guardar elementos en local storage.
const saveLocalStorage = (key, userInfo) => {
	localStorage.setItem(key, JSON.stringify(userInfo));
};

// Renderizar noticias //
const renderNews = (news) => {
	let iconClass = "fa-regular fa-bookmark";
	// Si la noticia esta en las guardadas entonces carga la marca oscura
	if (newSaved.some((n) => news.id === n.id)) {
		iconClass = "fa-solid fa-bookmark";
	}
	// Si la noticia esta incompleta la omite
	if (!news.content && !news.description) return;

	return `
    <div class="new">
	<i class="${iconClass}" id="${news.title}" data-title="${news.title}"></i>
	<a class="invisibleAnchor" href="${news.url}">
		<img
			src="${news.urlToImage || "/assets/img/No_image_available.png"}"
			alt="news images"
			class="new-img"
			srcset=""
		/>
		<div class="new-content">
		    <h4 class="new-title">${news.title}</h4>
			<p class="new-description">
				${news.content?.slice(0, 180) || news.description}...
			</p>
		</div>
		<button class="showNew">Ver más</button>
		<p>•</p>
		</a>
	</div>
    `;
};

// Enviar noticias a ser renderizadas //
const mapNews = (articles, container) => {
	console.log(articles);
	container.innerHTML += articles.map((article) => renderNews(article)).join("");
};

// Funcion que filtra las noticias
const filterNews = async () => {
	let dataArray = await getNews();
	load.isFetching = false;
	// Si nos encontramos en la seccion "Para ti" ->
	if (queryParams.section == "forMe") {
		const categories = yourCategories();
		dataArray = dataArray.filter((news) => categories.includes(news.category));
	}
	// Si nos encontramos en otra seccion ->
	else {
		dataArray = dataArray.filter((news) => news.category == queryParams.section);
	}
	return splitProducts(dataArray, 2);
};

// Funcion para dividir los productos en subarrays
const splitProducts = (data, size) => {
	let dividedProducts = [];
	for (let i = 0; i < data.length; i += size) {
		dividedProducts.push(data.slice(i, i + size));
	}
	return dividedProducts;
};

// Guardar la noticia //
const saveNew = (e) => {
	if (!userData.log) {
		openModal();
		return;
	}
	const filterId = e.target.id;
	const newToBeSaved = news.filter((news) => news.title === filterId);
	newSaved.push(newToBeSaved[0]);
	changeStatus(filterId, true);
	saveLocalStorage("newSaved", newSaved);
};

// Borrar la noticia //
const deleteNew = (e) => {
	const filterId = e.target.id;
	newSaved = newSaved.filter((n) => n.title !== filterId);
	saveLocalStorage("newSaved", newSaved);
	changeStatus(filterId, false);
};

// Comprobar si hay que guardar o borrar la noticia//
const newIsClicked = (e) => {
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-regular")) return saveNew(e);
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-solid")) return deleteNew(e);
};

// Cambia el icono
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

// Burguer menu //
const animateBurguerMenu = () => {
	$burguerBar1.classList.toggle("lineBarsMenu1-On");
	$burguerBar2.classList.toggle("lineBarsMenu2-On");
	$burguerBar3.classList.toggle("lineBarsMenu3-On");

	if (visualViewport.width < 900) {
		$navBar.classList.toggle("appHeaderMenu-On");
		$burguerMenu.classList.toggle("barsMenuFix");
	}
};

// Comprobar si existe una cuenta
const goToAccount = () => {
	if (userData.log) {
		location.href = "/account.html";
	} else {
		location.href = "/register.html";
	}
};

// Guardamos en un array cuales son las categorias deseadas
const yourCategories = () => {
	const categories = [];
	for (let key in userData.preferences.category) {
		const route = userData["preferences"]["category"][key];
		if (route) {
			categories.push(key);
		}
	}
	return categories;
};

// Abrir modal
const openModal = () => {
	$registerModal.style.display = "flex";
	disableScroll();
};
// Cerrar modal
const closeModal = () => {
	$registerModal.style.display = "none";
	enableScroll();
};
const showBeneficts = () => {
	closeModal();
	console.log(1);
	location.href = "/index.html#beMember";
};

const disableScroll = () => {
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	(scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
		(window.onscroll = () => {
			window.scrollTo(scrollLeft, scrollTop);
		});
};

function enableScroll() {
	window.onscroll = () => {};
}

// LLamada a la base de datos
const getNews = async () => {
	const url = `/assets/database.txt`;
	const response = await fetch(url);
	const data = await response.json();
	news = data;
	return data;
};

$goToAccount.addEventListener("click", goToAccount);
$burguerMenu.addEventListener("click", animateBurguerMenu);
$navBar.addEventListener("click", animateBurguerMenu);

$iconCloseModal?.addEventListener("click", closeModal);
$showRegister?.addEventListener("click", showBeneficts);
