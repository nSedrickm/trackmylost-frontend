import React from "react";
import PropTypes from "prop-types";
import tw from "twin.macro";
import { FiSearch } from "react-icons/fi";

const Container = tw.div`container w-full mx-auto`;
const Input = tw.input`w-full bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const ToggleButton = tw.span`absolute inset-y-0 right-0 px-5 flex items-center rounded-r-lg`;
const SearchInput = tw(Input)`rounded-lg`

const SearchBar = ({ dispatch, resetItems }) => {

    return (
        <Container tw="mb-5">
            <div tw="w-full">
                <div tw="relative">
                    <SearchInput required
                        type="search"
                        placeholder="Search"
                        onChange={(evt) => {
                            if (evt.target.value === "") {
                                dispatch({ type: "loading", payload: true });
                                dispatch({
                                    type: "setData",
                                    payload: resetItems()
                                });
                                dispatch({ type: "paginate" })
                                dispatch({ type: "loading", payload: false });
                            } else {
                                dispatch({ type: "loading", payload: true });
                                dispatch({
                                    type: "filter",
                                    payload: evt.target.value
                                })
                            }
                        }}
                    />
                    <ToggleButton>
                        <FiSearch size={20} />
                    </ToggleButton>
                </div>
            </div>
        </Container>
    )
}

SearchBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    resetItems: PropTypes.func.isRequired
}

export default SearchBar;


