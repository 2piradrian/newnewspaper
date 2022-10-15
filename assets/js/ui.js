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

$burguerMenu.addEventListener("click", animateBurguerMenu);
$navBar.addEventListener("click", animateBurguerMenu);

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

// Comprobación de inicio de sesion
const isLogged = () => {
	if (userData.log) {
		loadNewsForYou();
		$moreNewsP.style.visibility = "visible";
	} else {
		$moreNewsP.style.visibility = "hidden";
		$yourNews.innerHTML = "<p>Para obtener novedades personalizadas debes iniciar sesión.</p>";
	}
};

// Comprobar si existe una cuenta
const goToAccount = () => {
	if (userData.log) {
		location.href = "/login.html";
	} else {
		location.href = "/register.html";
	}
};
$goToAccount.addEventListener("click", goToAccount);

isLogged();
