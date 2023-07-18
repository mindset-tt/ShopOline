import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="ຊື່"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="ອີເມວ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="ລະຫັດຜ່ານ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="ສົ່ງ">ລົງທະບຽນຜູ້ໃຊ້</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              ຂ້ອຍມີບັນຊີຢູ່ແລ້ວ <strong>ເຂົ້າສູ່ລະບົບ</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
