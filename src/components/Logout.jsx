import axios from "axios";

const Logout = () => {
	axios.get("http://localhost/react-php-auth/php/api/logout.php").then(() => {
		sessionStorage.clear();
		window.location.href = "/login";
	});
};

export default Logout;
