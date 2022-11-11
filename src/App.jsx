import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./components/layout/PublicRoutes";
import Login from "./pages/public/Login";
import PrivateRoutes from "./components/layout/PrivateRoutes";
import Todos from "./pages/private/Todos";
import NotFound from "./pages/public/NotFound";

function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<PublicRoutes />}>
				<Route index element={<Login />} />
			</Route>

			{/* Private Routes */}
			<Route element={<PrivateRoutes />}>
				<Route path="/todos" element={<Todos />} />
			</Route>

			{/* Catch all */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
