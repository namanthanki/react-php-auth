import axios from "axios";
import { useState } from "react";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [response, setResponse] = useState("");

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				"http://localhost/react-php-auth/php/api/register.php",
				formData
			)
			.then((response) => {
				setResponse(response.data.message);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			{response && <div>{response}</div>}
			<form onSubmit={handleSubmit}>
				<input
					name="username"
					placeholder="username"
					onChange={handleInputChange}
					type="text"
				/>
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

				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
