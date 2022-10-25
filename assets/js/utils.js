// Guardar elementos en local storage.
const saveLocalStorage = (key, userInfo) => {
	localStorage.setItem(key, JSON.stringify(userInfo));
};

// Renderizar noticias //
const renderNews = (news) => {
	let iconClass = "fa-regular fa-bookmark";
	// Si la noticia esta en las guardadas entonces carga la marca oscura
	if (newSaved.includes(news.title)) {
		iconClass = "fa-solid fa-bookmark";
	}
	// Si la noticia esta incompleta la omite
	if (!news.content && !news.description) return;

	return `
    <div class="new">
	<i class="${iconClass}" id="${news.id}" data-title="${news.title}"></i>
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
	container.innerHTML += articles.map((article) => renderNews(article)).join("");
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
const newsForYou = () => {
	const categories = [];
	for (let key in userData.preferences.category) {
		const route = userData["preferences"]["category"][key];
		if (route) {
			categories.push(key);
		}
	}
	return categories;
};

// Funcion que filtra noticias segun parametros
const filterNewsForYou = async (size) => {
	let dataArray = await getNews();
	const categories = newsForYou();
	dataArray = dataArray.filter((news) => categories.includes(news.category));
	const news = splitProducts(dataArray, size);
	mapNews(news[0], $yourNews || $newsContainer);
};

// Funcion para dividir los productos en subarrays
const splitProducts = (data, size) => {
	let dividedProducts = [];
	for (let i = 0; i < data.length; i += size) {
		dividedProducts.push(data.slice(i, i + size));
	}
	return dividedProducts;
};

// Controlador de paginación
const productsController = {
	dividedProducts: splitProducts(6),
	nextProductsIndex: 1,
	productsLimit: splitProducts(6).length,
};

// LLamada a la base de datos
const getNews = async () => {
	const url = `/assets/database.txt`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

$goToAccount.addEventListener("click", goToAccount);
$burguerMenu.addEventListener("click", animateBurguerMenu);
$navBar.addEventListener("click", animateBurguerMenu);
