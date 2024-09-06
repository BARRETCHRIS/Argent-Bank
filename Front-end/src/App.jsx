import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import UserCpt from "./pages/UserCpt";
import Error404 from "./pages/errors/Error404";
import Error500 from "./pages/errors/Error500";

import SwaggerViewer from "./swaggerViewer/swaggerViewer";

function App() {
  	return (
		<Router>
			<Nav />
			<Routes>
				{/* Redirections : Redirect old or alternative paths to the updated paths */}
				<Route path="/accueil" element={<Navigate to="/" />} />
				<Route path="/home" element={<Navigate to="/" />} />
				<Route path="/login" element={<Navigate to="/sign-in" />} />
				<Route path="/connexion" element={<Navigate to="/sign-in" />} />
				<Route path="/acount" element={<Navigate to="/profile" />} />
				<Route path="/user" element={<Navigate to="/profile" />} />
				<Route path="/cpt" element={<Navigate to="/profile" />} />
				<Route path="/user-cpt" element={<Navigate to="/profile" />} />

				{/* Routes normales : Define the routes for the application */}
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/profile" element={<UserCpt />} />
				<Route path="*" element={<Error404 />} />
				<Route path="error500" element={<Error500 />} />
				<Route path="swaggerTransaction" element={<SwaggerViewer />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App
