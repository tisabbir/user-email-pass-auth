import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Root = () => {
  return (
    <div>
      <h1 className="text-red-600 font-bold">Hello World. This is Root</h1>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
