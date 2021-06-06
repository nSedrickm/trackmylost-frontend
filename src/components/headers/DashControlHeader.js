import React from "react";
import PropTypes from "prop-types";
import { FiLoader, FiPlusCircle, FiSearch, FiX } from "react-icons/fi";
import { SearchBar } from "components";
import { Header, HeaderItem, Heading, Description, Button } from "components/General";

const DashControlHeader = ({ heading, description, state, dispatch, resetItems, refreshFunc }) => {

    return (
        <>
            <Header>
                <HeaderItem tw="text-center md:text-left mb-8 sm:mb-0">
                    <Heading>{heading}</Heading>
                    <Description>{description}</Description>
                </HeaderItem>
                <HeaderItem tw="space-x-2 sm:space-x-0 inline-flex">
                    <Button onClick={() => dispatch({
                        type: "addItem",
                        payload: true
                    })}
                    >
                        <FiPlusCircle size={16} /> &nbsp; add
                    </Button>
                    <Button onClick={() => refreshFunc()}>
                        <FiLoader size={16} /> &nbsp; refresh
                    </Button>
                    <Button onClick={() => dispatch({
                        type: "toggleFilter",
                        payload: !state.filter
                    })}
                    >
                        {state.filter ? (
                            <><FiX size={16} /> &nbsp; close</>
                        ) : (
                            <><FiSearch size={16} /> &nbsp; search</>
                        )}
                    </Button>
                </HeaderItem>
            </Header>
            {
                state.filter && (
                    <SearchBar
                        dispatch={dispatch}
                        resetItems={resetItems}
                    />
                )
            }
        </>
    );
}

DashControlHeader.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    resetItems: PropTypes.func.isRequired,
    refreshFunc: PropTypes.func.isRequired,
}

export default DashControlHeader;


