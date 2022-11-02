// Traer informacion del usuario.
let newSaved = JSON.parse(localStorage.getItem("newSaved")) || [];
let accounts = JSON.parse(localStorage.getItem("accounts")) || { email: undefined, pass: undefined };
let userData = JSON.parse(localStorage.getItem("userData")) || {
	log: false,
	preferences: {
		category: {
			general: false,
			business: false,
			entertainment: false,
			health: false,
			science: false,
			sports: false,
			technology: false,
		},
	},
};

const queryParams = {
	section: undefined,
};

let news = [];

const load = {
	next: 1,
	limit: undefined,
	isFetching: false,
};

// Nav //
const $burguerMenu = document.getElementById("barsMenu");
const $burguerBar1 = document.querySelector(".lineBarsMenu1");
const $burguerBar2 = document.querySelector(".lineBarsMenu2");
const $burguerBar3 = document.querySelector(".lineBarsMenu3");
const $navBar = document.querySelector("nav");

// News Container //
const $newsContainer = document.getElementById("newsContainer");

// Your News //
const $yourNews = document.getElementById("yourNews");
const $moreNewsP = document.getElementById("moreNewsP");

// Accounts //
const $goToAccount = document.getElementById("goToAccount");
const $form = document.getElementById("forms");

const $login = document.getElementById("login");
const $register = document.getElementById("register");

const $email = document.getElementById("email");
const $password = document.getElementById("password");

const $emailError = document.getElementById("emailError");
const $passwordError = document.getElementById("passError");

const $formSttings = document.getElementById("formSttings");

const $savedNews = document.getElementById("savedNews");

// Modal //
const $modalConfirm = document.querySelector(".modalConfirm");

const $registerModal = document.getElementById("registerModal");
const $iconCloseModal = document.getElementById("iconCloseModal");
const $showRegister = document.querySelector(".showRegister");

// News //
const $formFilterMenu = document.getElementById("formFilterMenu");
