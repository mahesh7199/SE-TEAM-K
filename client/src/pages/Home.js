import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";

export default function Home({notification2}){
    return (
        <>
            <div className="c-container-xxl bg-white p-0">
                <Navbar tab={1} notification2={notification2} />
                <Section2 />
                {/* <Section3 /> */}
                <Section4 />
                <Footer />
            </div>
        </>
    )
}