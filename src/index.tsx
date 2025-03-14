import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter basename="kospi200">
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
