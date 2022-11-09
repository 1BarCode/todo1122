import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
	const { setUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		setUser(null);
		navigate("/", { replace: true });
	};
	return (
		<header>
			<nav>
				<button onClick={handleLogout}>Logout</button>
			</nav>
		</header>
	);
};

export default Navbar;
