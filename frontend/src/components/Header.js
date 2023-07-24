import React, { useState ,useRef} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import ml5 from 'ml5';

const Header = () => {


  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Check if there's a prediction value and append it to the search URL
      const searchURL = prediction
        ? `/search/${keyword}/${prediction}`
        : `/search/${keyword}`;

      history.push(searchURL);
    } else {
      history.push("/");
    }
  };

  const [prediction, setPrediction] = useState('');
  const classifierRef = useRef(null);
  const imageModelURL = '../model/';

  const setupClassifier = async () => {
    classifierRef.current = await ml5.imageClassifier(imageModelURL + 'model.json');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
      classifyImage(file);
    } else {
      console.error('Invalid file type. Please upload an image file.');
    }
  };

  const classifyImage = (file) => {
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
  
    // Set width and height for the image
    imageElement.width = 300; // Set your desired width here
    imageElement.height = 300; // Set your desired height here
  
    classifierRef.current.classify(imageElement, gotResult);
  };

  const gotResult = (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    const predictedLabel = results[0].label;
    setPrediction(predictedLabel); // Set prediction directly without "Prediction: "

    console.log(predictedLabel);

    // Use the predicted label to navigate to the search results page
    if (predictedLabel.trim()) {
      history.push(`/search/${predictedLabel}`);
    } else {
      history.push("/");
    }
  };

  // Initialize the classifier when the component mounts
  React.useEffect(() => {
    setupClassifier();
  }, []);

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);


  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+856 20 56 640 112</p>
              <p>joyBL1225@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          ໂປຣໄຟລ໌
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          ອອກຈາກລະບົບ
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          ເຂົ້າສູ່ລະບົບ
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          ລົງທະບຽນຜູ້ໃຊ້
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      ຄົ້ນຫາ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                   <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    </div>
                    <button onClick={handleUploadButtonClick} type="button" className="upload-button">
                      <i className="fas fa-camera"></i> ຄົ້າຫາດ້ວຍຮູບ
                    </button>
                  <button type="submit" className="search-button">
                    ຄົ້ນຫາ
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      ສະບາຍດີ, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                      ໂປຣໄຟລ໌
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        ອອກຈາກລະບົບ
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">ລົງທະບຽນຜູ້ໃຊ້</Link>
                    <Link to="/login">ເຂົ້າສູ່ລະບົບ</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
