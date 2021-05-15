import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { FiArrowLeft } from "react-icons/fi";

const Button = tw.a`flex mx-auto justify-center md:w-1/6 p-4 items-center text-white text-primary-500 border-0 border border-primary-500 rounded-4xl text-lg `;

const NotFoundPage = () => {
    return (
        <AnimationRevealPage>
            <section tw="text-gray-600 relative">
                <div tw="container pt-24 mx-auto">
                    <div tw="flex flex-col text-center w-full mb-12">
                        <h1 tw="sm:text-6xl text-3xl font-black  mb-8 text-primary-500">Comming Soon !!!</h1>
                        <p tw="lg:w-2/3 mx-auto leading-relaxed text-base">This feature is still in development. Please check back soon</p>
                    </div>
                    <Button href="/">
                        <FiArrowLeft /> &nbsp; home
                    </Button>
                </div>
            </section>
        </AnimationRevealPage>
    )
}

export default NotFoundPage;