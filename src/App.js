// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import OtpVerification from "./components/auth/OtpVerification";
import NewPassword from "./components/auth/NewPassword";
import { GlobalProvider } from "./utils/contextApi/GlobalContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PrivateRoutes from "./routes/PrivateRoutes";
// import SellerProfile from "./pages/sellerProfile/SellerProfile";

function App() {
  return (
    <GlobalProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Body />
                </PrivateRoutes>
              }
            />
            {/* <Route path="/seller-profile" element={<SellerProfile />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route
              path="/new-password"
              element={
                <PrivateRoutes>
                  <NewPassword />
                </PrivateRoutes>
              }
            />
          </Routes>
        </Router>
      </Provider>
    </GlobalProvider>
  );
}

export default App;
