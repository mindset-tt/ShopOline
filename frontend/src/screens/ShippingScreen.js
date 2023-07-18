import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/CartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [username, setUsername] = useState(shippingAddress.username);
  const [address, setAddress] = useState(shippingAddress.address,);
  const [number, setNumber] = useState(shippingAddress.number);
  const [shipping, setShipping] = useState(shippingAddress.shipping);

   const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ username,  address, number, shipping }));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ກະລຸນນາໃສ່ຂໍ້ມູນຂອງທ່ານໃຫ້ຖືກຕ້ອງ ເພື່ອສະດວກໃນການຈັດສົ່ງ</h6>
          <input
            type="text"
            placeholder="ຊື່ ແລະ ນາມສະກຸນ"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="ບ້ານ, ເມືອງ, ແຂວງ"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="ເບີໂທຕິດຕໍ່"
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="ຝາກລົດໂດຍສານ ຫຼື ລົດຂົນໃສ່ (ແຈ້ງໃຫ້ລະອຽດ)"
            value={shipping}
            required
            onChange={(e) => setShipping(e.target.value)}
          />
          <button type="submit">ຕໍ່ໄປ</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;