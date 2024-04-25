import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormField = {
  [key: string]: string;
};

type Action<T> = (
  formData: T
) => Promise<{ message: string; success: boolean }>;

interface UseFormProps<T extends FormField> {
  action: Action<T>;
  initialFormData: T;
  redirectPath: string;
}

const useForm = <T extends FormField>({
  initialFormData,
  redirectPath,
  action,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...initialFormData });
  const [errors, setErrors] = useState<FormField>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const { success, message } = await action(formData);

    if (success) navigate(redirectPath);
    else
      setErrors((prevData) => ({
        ...prevData,
        message,
      }));

    setLoading(false);
  };

  const validateForm = () => {
    let validationErrors: FormField = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /\S+@\S+\.\S+/g;

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim())
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
    });

    if (!validationErrors.email && !emailRegex.test(formData.email.trim()))
      validationErrors.email = "Invalid Email";

    if (
      !validationErrors.password &&
      !passwordRegex.test(formData.password.trim())
    )
      validationErrors.password =
        "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one digit, and one special character";


    return validationErrors;
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};

export default useForm;
