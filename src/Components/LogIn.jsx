import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";

const LogIn = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const password = e.target.password.value;

    console.log(email, password);

    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("You have successfully logged in");
      })
      .catch((error) => {
        console.error(error.message);
        setError("Please Enter Valid Email and Password");
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Please Provide an Email");
      return;
    } else if (!emailPattern.test(email)) {
      setError("Please enter a valid Email");
      return;
    }

    // Send Reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("check your email");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {success && (
              <p className="text-green-600 text-center mb-2">{success}</p>
            )}
            {error && <p className="text-red-600 text-center mb-2">{error}</p>}

            <p className="text-center mb-2">
              New Here? Please{" "}
              <Link className="text-purple-700" to={"/heroRegister"}>
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
