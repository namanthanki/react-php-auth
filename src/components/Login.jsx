import axios from "axios";
import { useState } from "react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost/react-php-auth/php/api/login.php", formData)
			.then((response) => {
				if (response.data.message === "success") {
					sessionStorage.setItem("loggedIn", true);
					sessionStorage.setItem(
						"userData",
						JSON.stringify(response.data.data)
					);
					window.location.href = "/dashboard";
				} else {
					setError(response.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{error && <div>{error}</div>}
			<form onSubmit={handleSubmit}>
				<input
					name="email"
					placeholder="email"
					onChange={handleInputChange}
					type="text"
				/>
				<input
					name="password"
					placeholder="password"
					onChange={handleInputChange}
					type="password"
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
