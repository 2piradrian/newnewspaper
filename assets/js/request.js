const API_KEY = "7cb3dd21df2a4ab6be8924402641f78b";

const fetchNew = async (pageSize, page) => {
	const URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&pageSize=${pageSize}&language=es&sortBy=popularity&q=novedades`;
	const res = await fetch(URL);
	const data = await res.json();
	console.log(data);
	return data;
};

fetchNew(2);
