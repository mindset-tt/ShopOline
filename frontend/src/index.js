import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";



ReactDOM.render(
  
    <Provider store={store}>
      <App />
    </Provider>,
  
    document.getElementById("root")
  );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import ImageClassifier from './App';


// ReactDOM.render(
//   <React.StrictMode>
//     <ImageClassifier />
//   </React.StrictMode>,
//   document.getElementById('root')
// );