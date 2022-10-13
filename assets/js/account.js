// Funcion para verificar que el email sea valido
const checkEmail = () => {
	let valid = false;
	const email = $email.value.trim();
	if (!email.length) {
		renderError($emailError, "El email es obligatorio");
	} else if (!isEmailValid(email)) {
		renderError($emailError, "El email no es valido");
	} else {
		$emailError.style.visibility = "hidden";
		valid = true;
	}
	return valid;
};
// Funcion para verificar que la contraseña sea valida
const checkPassword = () => {
	let valid = false;
	const password = $password.value.trim();
	if (!password.length) {
		renderError($passwordError, "La contraseña es obligatoria");
	} else if (!isPasswordValid(password)) {
		renderError($passwordError, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, y un número");
	} else {
		$passwordError.style.visibility = "hidden";
		valid = true;
	}
	return valid;
};
// Funcion para comprobar que lo ingresado sea un email
const isEmailValid = (email) => {
	const regEx =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regEx.test(email);
};
// Funcion para comprobar que lo ingresado sea una contraseña
const isPasswordValid = (pass) => {
	const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return regEx.test(pass);
};
// Funcion que muestra el error especificado
const renderError = (input, text) => {
	input.style.visibility = "visible";
	input.textContent = text;
};
// Funcion que determina si nos estamos registrando o loggeando
const isLoginOrRegister = () => {
	if ($login) {
		console.log(1);
	} else if ($register) {
		console.log(2);
	} else {
		console.log(3);
	}
};
// Funcion que inicia la validación del formulario
const validateForm = (e) => {
	e.preventDefault();
	if (checkEmail() && checkPassword()) {
		isLoginOrRegister();
	} else {
		return;
	}
};
/* 
El signo de pregunta previene el null error en caso de no existir el formulario, debido a que 
este archivo js contendrá todas las funciones relacionadas con la administración de usuarios, y no solo 
la generacion de cuentas
pd: lo aprendi cuando kotlin me hacia llorar
*/
$form?.addEventListener("submit", validateForm);
