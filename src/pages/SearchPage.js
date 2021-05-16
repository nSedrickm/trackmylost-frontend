import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiSearch } from "react-icons/fi";
import { searchItem } from "services/api.service";
import { Loader } from "rsuite";

import toast from 'react-hot-toast';

const SearchButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl`;
const Form = tw.form`mx-auto md:p-8 rounded-2xl`;
const LoadingContainer = tw.div`h-screen text-center`;


const SearchPage = () => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let formData = {
            first_name: evt.target.elements.search?.value
        }
        console.log(formData);

        setLoading(true);
        searchItem(formData)
            .then(response => {
                console.log(response);
                toast.success(`Search successfull`);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setLoading(false);
                    toast.error("An error occurred Please check your network and try again");
                }
            });
    }

    if (loading) {
        return (
            <LoadingContainer>
                <Loader backdrop size="md" content="processing please wait" vertical />
            </LoadingContainer>
        );
    } else {
        return (
            <AnimationRevealPage>
                <section tw="text-gray-600 relative">
                    <div tw="container py-12 md:py-48  mx-auto">
                        <div tw="flex flex-col text-center w-full mb-12">
                            <h1 tw="sm:text-4xl text-2xl font-black  mb-4 text-primary-500">Search for missing documents</h1>
                            <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">We have put smiles on Faces! TrackMyLost reunites you with your lost documents</p>
                        </div>
                        <div tw="lg:w-1/2 md:w-2/3 mx-auto">

                            <Form onSubmit={(evt) => handleSubmit(evt)}>
                                <div tw="flex flex-wrap -m-2">
                                    <div tw="p-2 w-full">
                                        <div tw="relative">
                                            <Input required
                                                type="search"
                                                name="search"
                                                placeholder="e.g First name on document"
                                            />
                                        </div>
                                    </div>

                                    <div tw="p-2 w-full mt-4">
                                        <SearchButton type="submit">
                                            <FiSearch /> &nbsp; search
                                        </SearchButton>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </section>
            </AnimationRevealPage>
        )
    }
}
export default SearchPage;