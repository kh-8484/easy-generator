import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";
import { register } from "../../actions/login";
import emailIcon from "./../../static/images/mail-icon.svg";
import passwordIcon from "./../../static/images/password-icon.svg";
import bg from "./../../static/images/sign-up-bg.png";

const Register = () => {
  const initialData = {
    email: "",
    password: "",
    name: "",
  };

  const { formData, errors, loading, handleChange, handleSubmit } = useForm({
    initialFormData: { ...initialData },
    redirectPath: "/",
    action: register,
  });

  return (
    <div className="login-container">
      <div className="bg-container">
        <img src={bg} alt="bg" className="bg-img" loading="eager" />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="flex-start">
            <h2 className="font-Poppins-SemiBold-600-normal title-text">
              Sign up
            </h2>

            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              icon={passwordIcon}
              value={formData.name}
              onChange={handleChange}
              errorMessage={errors.name}
              length={60}
              className="m-b-2"
            />

            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              icon={emailIcon}
              value={formData.email}
              onChange={handleChange}
              errorMessage={errors.email}
              length={60}
            />

            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              icon={passwordIcon}
              value={formData.password}
              onChange={handleChange}
              errorMessage={errors.password}
              length={60}
              className="m-t-2"
            />


            <Button
              type="submit"
              title="Sign up"
              btn={loading ? "loading" : "primary"}
              className="login-btn m-b-1"
            />
            {errors.message && (
              <div className="flex-start m-b-1 flex-end font-Poppins-SemiBold-600-normal error-message">
                {errors.message}
              </div>
            )}
          </div>
        </form>
        <div className="font-Poppins-Regular-regular-normal description m-t-3">
          Already have an account? &nbsp;
          <Link
            to={"/login"}
            className="font-Poppins-SemiBold-600-normal link-tag"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
