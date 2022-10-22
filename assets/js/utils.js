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
	return `
    <div class="new">
	<i class="${iconClass}" id="${news.id}" data-title="${news.title}"></i>
	<a class="invisibleAnchor" href="${news.url}">
		<img
			src="${news.image || "/assets/img/No_image_available.png"}"
			alt="news images"
			class="new-img"
			srcset=""
		/>
		<div class="new-content">
		    <h4 class="new-title">${news.title}</h4>
			<p class="new-description">
				${news.description.slice(0, 180)}...
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
$goToAccount.addEventListener("click", goToAccount);
$burguerMenu.addEventListener("click", animateBurguerMenu);
$navBar.addEventListener("click", animateBurguerMenu);
