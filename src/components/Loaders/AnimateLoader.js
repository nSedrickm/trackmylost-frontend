import React from "react";
import tw from "twin.macro";
import { Loader } from "rsuite";

const LoadingContainer = tw.div`h-screen text-center`;

const AnimateLoader = () => {
    return (
        <LoadingContainer>
            <Loader backdrop size="md" content="processing please wait" vertical />
        </LoadingContainer>
    );
}

export default AnimateLoader;