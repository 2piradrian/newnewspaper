const API_KEY = "354ad7b1e12d5e21963e7534624e8151";

const fetchNew = async (page) => {
	const URL = `https://api.mediastack.com/v1/news?access_key=${API_KEY}&sources=es&limit=6`;
	const res = await fetch(URL);
	const data = await res.json();
	console.log(data);
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
	<a class="invisibleAnchor" href="${news.url}">
    <div class="new">
		<i class="${iconClass}" id="${news.author}${news.published_at}" data-title="${news.title}"></i>
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
	</div>
	</a>
    `;
};

// Enviar noticias a ser renderizadas //
const mapNews = (articles, container) => {
	container.innerHTML += articles.map((article) => renderNews(article)).join("");
};
