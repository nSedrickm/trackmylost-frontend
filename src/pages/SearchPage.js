import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiSearch } from "react-icons/fi";

const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl`;
const SearchPage = () => {
    return (
        <AnimationRevealPage>
            <section tw="text-gray-600 relative">
                <div tw="container py-12 mx-auto">
                    <div tw="flex flex-col text-center w-full mb-12">
                        <h1 tw="sm:text-4xl text-2xl font-medium  mb-4 text-primary-500">Search for missing documents</h1>
                        <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">We have put smiles on Faces! TrackMyLost reunites you with your lost documents</p>
                    </div>
                    <div tw="lg:w-1/2 md:w-2/3 mx-auto">
                        <div tw="flex flex-wrap -m-2">
                            <div tw="p-2 w-full">
                                <div tw="relative">
                                    <Input
                                        type="search"
                                        placeholder="e.g Persons Name"
                                    />
                                </div>
                            </div>
                            <div tw="p-2 w-full">
                                <SearchButton>
                                    <FiSearch /> &nbsp; search
                                </SearchButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AnimationRevealPage>
    )
}

export default SearchPage;