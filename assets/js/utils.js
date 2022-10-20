const API_KEY = "7cb3dd21df2a4ab6be8924402641f78b";

const fetchNew = async (pageSize, page) => {
	const URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&pageSize=${pageSize}&page${page}&language=es&sortBy=relevancy&category=general&country=ar`;
	const res = await fetch(URL);
	const data = await res.json();
	return data;
};

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

// Enviar noticias a ser renderizadas //
const mapNews = (articles, container) => {
	container.innerHTML += articles.map((article) => renderNews(article)).join("");
};
