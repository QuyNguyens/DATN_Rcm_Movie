import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import Header from "../Component/Header";

function DefaultLayout() {
    return ( <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div> );
}

export default DefaultLayout;