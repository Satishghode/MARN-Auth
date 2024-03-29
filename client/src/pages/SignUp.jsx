import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false ) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="UserName"
          id="username"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />

        <button disabled={loading}
          type="submit"
          className="bg-slate-700 p-3 text-white uppercase rounded-xl hover:opacity-90 disabled:opacity-50  "
        >
          { loading ? 'loading...' : 'sign Up'  }
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 pt-5 ">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-600">
          <span>Sign in</span>
        </Link>
      </div>
      <p className="text-red-500 p-3 " >{ error && 'Something went Worng!' }</p>
    </div>
  );
}
