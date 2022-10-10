// Traer informacion del usuario.
let userData = JSON.parse(localStorage.getItem("userData")) || { log: false, saved: [] };
let accounts = JSON.parse(localStorage.getItem("accounts")) || { email: undefined, pass: undefined, name: undefined };
// Guardar elementos en local storage.
const saveLocalStorage = (key, userInfo) => {
	localStorage.setItem(key, JSON.stringify(userInfo));
};

const renderNews = (news) => {
	return `
    <div class="new">
		<i class="fa-regular fa-bookmark" id="${news.publishedAt}"></i>
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
	//const firstNews = await fetchNew(2, 0);
	mapNews(firstNews.articles);
};

const saveNew = (e) => {
	const filterId = e.target.id;
	changeStatus(filterId);
};

const newIsClicked = (e) => {
	if (e.target.classList.contains("fa-bookmark")) return saveNew(e);
};

const init = () => {
	$newsContainer.addEventListener("click", newIsClicked);
	loadFirstNews();
};

init();
