import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const loginUrl = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";

const LoginForm = () => {
	const userRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/todos";
	const { setUser } = useAuth();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email) && email.length <= 50);
		setValidPwd(pwd.length >= 4 && pwd.length <= 16);
	}, [email, pwd]);

	useEffect(() => {
		setErrMsg("");
	}, [email, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrMsg("");
		setIsLoading(true);

		// final validation
		const t1 = EMAIL_REGEX.test(email) && email.length <= 50;
		const t2 = pwd.length >= 4 && pwd.length <= 16;

		if (!t1 || !t2) {
			setErrMsg("Invalid Inputs");
			setIsLoading(false);
			return;
		}

		try {
			console.log("try block");
			// test@rapptrlabs.com
			// Test123

			// const body = { email, pwd };
			// const { data } = await axios.post(loginUrl, body);

			// const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/1");
			const data = await new Promise((res, rej) => {
				setTimeout(() => {
					res({
						user_id: 16,
						user_email: "test@rapptrlabs.com",
						user_username: "testuser",
						user_is_active: 1,
						user_profile_image: "http://dev.rapptrlabs.com/Tests/images/taylor_avatar.png",
						user_last_active_epoch: 1544680026,
						user_creation_epoch: 1544713200,
						user_is_new: 1,
						user_token: "6dd4737a8b7ec61313ae5e900420d46815e1d13b2902be71b97a8fbf1f421a3e",
					});
				}, 800);
			});
			setUser(data);
			navigate(from, { replace: true });
		} catch (err) {
			setErrMsg("The server could not be reached. Please try again later.");
			setIsLoading(false);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">
					Email
					<div className="input-container">
						<FontAwesomeIcon icon={faUser} />
						<input
							id="email"
							type="email"
							placeholder="user@rapptrlabs.com"
							ref={userRef}
							required
							onChange={(e) => setEmail(e.target.value)}
							className={!validEmail && email.length > 0 ? "invalid-entry" : ""}
						/>
						{!validEmail && email.length > 0 && <p className="instructions">Not a valid email</p>}
					</div>
				</label>

				<label htmlFor="password">
					Password
					<div className="input-container">
						<FontAwesomeIcon icon={faLock} />
						<input
							id="password"
							type="password"
							placeholder="Must be at least 4 characters"
							required
							onChange={(e) => setPwd(e.target.value)}
							className={!validPwd && pwd.length > 0 ? "invalid-entry" : ""}
						/>
						{!validPwd && pwd.length > 0 && <p className="instructions">Not a valid password</p>}
					</div>
				</label>

				<button
					type="submit"
					disabled={isLoading || !validEmail || !validPwd}
					className={`submit ${validEmail && validPwd ? "" : "invalid-submit"}`}
				>
					Login
				</button>
			</form>
			{errMsg && <p className="err-msg">{errMsg}</p>}
		</>
	);
};

export default LoginForm;
