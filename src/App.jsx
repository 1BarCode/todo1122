import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import Login from "./pages/public/Login";
import PrivateLayout from "./components/layout/PrivateLayout";
import Todos from "./pages/private/Todos";
import NotFound from "./pages/public/NotFound";

function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<PublicLayout />}>
				<Route index element={<Login />} />
				{/* Ideally there would be a home page for the index route and a separate login route */}
				{/* <Route path="login" element={<Login />} /> */}
			</Route>

			{/* Private Routes */}
			<Route element={<PrivateLayout />}>
				<Route path="/todos" element={<Todos />} />
			</Route>

			{/* Catch all */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
