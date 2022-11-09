import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Layout from "./Layout";

const PrivateLayout = () => {
	const { user } = useAuth();
	const location = useLocation();

	return user ? (
		<Layout>
			<main>
				<Outlet />
			</main>
		</Layout>
	) : (
		// Navigate should point to "/login" - in this case it is our root path
		<Navigate to="/" state={{ from: location }} replace />
	);
};

export default PrivateLayout;
