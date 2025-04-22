import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { changePasswordRequest } from "../store/reducers/authSlice";
import ChangePassword from "../pages/ChangePassword";

const ChangePasswordContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await dispatch(changePasswordRequest(values));
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChangePassword
      loading={loading}
      error={error}
      success={success}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/profile")}
    />
  );
};

export default ChangePasswordContainer;
