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
