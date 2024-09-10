'use client';

import Card from "./components/card";
import Link from 'next/link';

const Home = () => {
    return (
        <div className="bg-white">
            <div
                className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: 'url(/welcome.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <p className="text-yellow-400 font-bold text-3xl">
                    Don't Know How <br/>To <span className="text-white font-bold">COOK?</span>
                </p>
                <Link
                    href="/signup"

                >
                    <button className="w-full bg-dark-yellow p-5 rounded-3xl text-black font-bold">Let's get it!</button>

                </Link>
            </div>
            <div className="p-40">
                <h1 className="text-2xl font-bold text-black mb-10">Features</h1>
                <div className="flex justify-evenly">
                    <Card
                        imageSrc="/cook.svg"
                        description="create your own menu"
                    />
                    <Card
                        imageSrc="/idea.svg"
                        description="share your ideas"
                    />
                    <Card
                        imageSrc="/shopping.svg"
                        description="shopping"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;