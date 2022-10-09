// Burguer menu //
const animateBurguerMenu = () => {
	$burguerBar1.classList.toggle("lineBarsMenu1-On");
	$burguerBar2.classList.toggle("lineBarsMenu2-On");
	$burguerBar3.classList.toggle("lineBarsMenu3-On");

	if (screen.width < 900) {
		$navBar.classList.toggle("nav-On");
		$burguerMenu.classList.toggle("barsMenuFix");
	}
};

$burguerMenu.addEventListener("click", animateBurguerMenu);
$navBar.addEventListener("click", animateBurguerMenu);
