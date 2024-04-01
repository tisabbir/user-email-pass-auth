import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../firebase/firebase.config";

const Register = () => {
  const [registerError, setRegisterError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(`Email : ${email}
    Password : ${password}`);

    // reset error
    setRegisterError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        const errorMsg = error.message;
        setRegisterError(errorMsg);
      });
  };
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-4 mt-12">
        Registration Form
      </h1>
      <form onSubmit={handleRegister} className="w-1/2 mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            name="email"
            className="grow"
            placeholder="daisy@site.com"
          />
        </label>
        <br />

        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="$sl8&*#sda87..."
          />
        </label>
        <br />
        <input
          className="btn btn-secondary w-full"
          type="submit"
          value="Register"
        />
      </form>

      {registerError && (
        <p className="text-red-400 text-center my-4">{registerError}</p>
      )}
    </div>
  );
};

export default Register;
