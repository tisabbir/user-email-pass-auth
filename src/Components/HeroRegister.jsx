import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";

const HeroRegister = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checked = e.target.terms.checked;

    // Reset Error Msg

    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should contain at least one Upper Case character"
      );
      return;
    } else if (!checked) {
      setRegisterError("Please Accept Our Terms and Conditions");
      return;
    }

    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("You are successfully registered");

        // Update Profile Information
        // updateProfile(auth.currentUser, {
        //   displayName: name,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
        // })
        //   .then(() => {
        //     console.log("Profile Updated");
        //   })
        //   .error((error) => {
        //     console.log(error.message);
        //   });

        // Send email verification
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.error(error);
        setRegisterError(errorMsg);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                  />
                  <span
                    className="absolute top-1/3 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" name="terms" id="term" />
                <label htmlFor="term">
                  Accept our <a href="#">terms & conditions</a>{" "}
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>

            {registerError && (
              <p className="text-red-700 text-center mb-4">{registerError}</p>
            )}
            {success && (
              <p className="text-green-700 text-center mb-4">{success}</p>
            )}
            <p className="text-center mb-2">
              Already have an account? Please{" "}
              <Link className="text-purple-700" to={"/login"}>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
