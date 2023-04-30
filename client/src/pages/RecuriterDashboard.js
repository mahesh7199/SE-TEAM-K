import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const RecruiterDashboard = () => {
    return (
        <>
            <div className="c-container-xxl bg-white p-0">
                <Navbar type={1} />
                <div className="w-100 bg-warning h-100" style={{height: "100vh"}}>
                    
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default RecruiterDashboard;