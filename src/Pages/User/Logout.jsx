import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Slices/UserSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    window.localStorage.removeItem("VN_token");
    dispatch(setLogout());
    navigate("/");
    console.log("Deconnecté !!!")
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Deconnexion en cours...</h1>
    </div>
  );
};

export default Logout;