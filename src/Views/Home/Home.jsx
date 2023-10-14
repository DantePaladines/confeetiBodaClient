import React from "react";
import Banner from "../../components/Banner/Banner.jsx";
import Info from "../../components/Info/Info.jsx";
import Form from "../Form/Form.jsx";

const Home = ({socket}) => {

    return(
        <>
            <Banner/>
            <Info/>
            <Form socket={socket} />
        </>
    )
}

export default Home