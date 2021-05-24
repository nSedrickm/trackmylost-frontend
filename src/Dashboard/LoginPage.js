import React, { useState } from 'react';
import tw from 'twin.macro';
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiLogIn } from "react-icons/fi";

import { userLogin, setToken } from "services/auth.service";
import { Loader } from "rsuite";
import toast from 'react-hot-toast';

const SubmitButton = tw.button`flex mx-auto items-center text-white bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-700 rounded-4xl text-lg`;
const Input = tw.input`w-full rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out rounded-4xl placeholder-gray-400`;
const Label = tw.label`leading-7 text-xs text-gray-600 uppercase tracking-wide font-medium block mb-2`;
const Form = tw.form`mx-auto md:w-2/5 md:p-10 md:border border-primary-500 rounded-2xl`;
const LoadingContainer = tw.div`h-screen text-center`;


const LoginPage = () => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let formData = {
            phone_number: evt.target.elements.phone_number?.value,
            password: evt.target.elements.password?.value,
        }
        console.log(formData);

        setLoading(true);
        userLogin(formData)
            .then(response => {
                console.log(response.data);
                setToken("Logged in");
                toast.success(response.data.message);
                setTimeout(() => {
                    window.location.replace("/agent/dashboard")
                }, 1000)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setLoading(false);
                    toast.error(error.response.data.message);
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
                    <div tw="container py-12 mx-auto">
                        <div tw="flex flex-col text-center w-full mb-12">
                            <h1 tw="sm:text-4xl text-2xl font-black mb-4 text-primary-500">Agent Login</h1>
                            <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">TrackMyLost agent portal</p>
                        </div>

                        <Form onSubmit={(evt) => handleSubmit(evt)}>
                            <div tw="flex flex-wrap -m-2">
                                <div tw="p-2 w-full">
                                    <div tw="relative">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input
                                            required
                                            type="tel"
                                            id="phone_number"
                                            name="phone_number"
                                            placeholder="e.g 670020023"
                                            size="9"
                                            maxLength="9"
                                            minLength="9"
                                            pattern="(6|2)(2|3|[5-9])[0-9]{7}"
                                        //with areacode pattern="(\+237|237)\s(6|2)(2|3|[5-9])[0-9]{7}"
                                        />
                                    </div>
                                </div>
                                <div tw="p-2 w-full">
                                    <div tw="relative">
                                        <Label htmlFor="password">Password</Label>
                                        <Input required
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div tw="p-2 w-full mt-2">
                                <SubmitButton type="submit">
                                    <FiLogIn /> &nbsp; login
                                </SubmitButton>
                            </div>
                        </Form>
                    </div>
                </section>
            </AnimationRevealPage>
        )
    }
};

export default LoginPage;