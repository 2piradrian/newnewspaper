// Traer informacion del usuario.
let newSaved = JSON.parse(localStorage.getItem("newSaved")) || [];
let userData = JSON.parse(localStorage.getItem("userData")) || { log: false, saved: [] };
let accounts = JSON.parse(localStorage.getItem("accounts")) || { email: undefined, pass: undefined, name: undefined };
// Guardar elementos en local storage.
const saveLocalStorage = (key, userInfo) => {
	localStorage.setItem(key, JSON.stringify(userInfo));
};

const renderNews = (news) => {
	let iconClass = "fa-regular fa-bookmark";
	// Si la noticia esta en las guardadas entonces carga la marca oscura
	if (newSaved.includes(news.title)) {
		iconClass = "fa-solid fa-bookmark";
	}
	return `
    <div class="new">
		<i class="${iconClass}" id="${news.publishedAt}" data-title="${news.title}"></i>
		<img
			src="${news.urlToImage}"
			alt="news images"
			class="new-img"
			srcset=""
		/>
		<div class="new-content">
		    <h4 class="new-title">${news.title}</h4>
			<p class="new-description">
				${news.description}
			</p>
		</div>
		<button class="showNew">Ver más</button>
		<p>•</p>
	</div>
    `;
};

const mapNews = (articles) => {
	$newsContainer.innerHTML += articles.map((article) => renderNews(article)).join("");
};

const loadFirstNews = async () => {
	const firstNews = await fetchNew(2, 0);
	mapNews(firstNews.articles);
};

const saveNew = (e) => {
	const filterId = e.target.id;
	const newTitle = e.target.dataset.title;
	newSaved = [...newSaved, newTitle];
	saveLocalStorage("newSaved", newSaved);
	changeStatus(filterId, true);
};

const deleteNew = (e) => {
	const filterId = e.target.id;
	const newTitle = e.target.dataset.title;
	newSaved = newSaved.filter((news) => newTitle != news);
	saveLocalStorage("newSaved", newSaved);
	changeStatus(filterId, false);
};

const newIsClicked = (e) => {
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-regular")) return saveNew(e);
	if (e.target.classList.contains("fa-bookmark") && e.target.classList.contains("fa-solid")) return deleteNew(e);
};

const init = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	loadFirstNews();
};

init();
