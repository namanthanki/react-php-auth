import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	const userData = JSON.parse(sessionStorage.getItem("userData"));
	const username = userData?.username;

	useEffect(() => {
		if (sessionStorage.getItem("loggedIn") == false) {
			navigate("/login");
		}
	}, [navigate]);

	return <div>Welcome {username}</div>;
};

export default Dashboard;
