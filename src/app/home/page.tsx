'use client';

import Card from "./components/card";

const Home = () => {
    return (
        <div className="bg-white text-black">
            <div className=" p-32">
                <div className="flex justify-between">
                    <div>
                        <p className="text-black font-black text-5xl mb-5">
                            Welcome<br />to <span className="text-dark-yellow font-bold">Ingredish</span>!
                        </p>
                        <p>
                            Discover a world of delicious, customizable<br />recipes perfect for every palate. Our platform<br />offers AI and user-generated food ideas tailored<br />to your tastes and dietary preferences.
                        </p>
                        <button type="button" className="bg-dark-yellow rounded-md px-4 py-2 font-bold my-5">
                            Get Started!
                        </button>
                        <button type="button" className="bg-gray-300 rounded-md px-4 py-2 font-bold">
                            Explore Recipes
                        </button>
                    </div>
                    <img src="/landing-food.jpg" alt="" width={600} height={600} />
                </div>
                <div className="text-center my-20">
                    <h1 className="text-4xl">Trusted by Thousands of Home Cooks</h1>
                    <p className="my-5">Our AI engine has enhanced the cooking experience for countless food enthusiasts, bringing innovation and<br />delicious results to every kitchen, and you can select ingredient from users.</p>
                    <div className="bg-gray-100 mx-36 flex justify-evenly p-7">
                        <div>
                            <h2 className="font-bold text-3xl">2000</h2>
                            <p>Ai-Recipes Created</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-3xl">100000</h2>
                            <p>Users</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-3xl">5000</h2>
                            <p>Recipes Created</p>
                        </div>
                    </div>
                </div>
                <h1 className="font-black text-4xl">Last Recipes</h1>
                <div className="flex justify-around my-11">
                    <Card imageSrc="/ai-cook.jpg" author="กร มีความสุข" name="ไข่ข้นปู" rating={4.4} isAIGenarated={true} />
                    <Card imageSrc="/ai-cook.jpg" author="กร มีความสุข" name="ไข่ข้นปู" rating={4.4} isAIGenarated={false} />
                    <Card imageSrc="/ai-cook.jpg" author="กร มีความสุข" name="ไข่ข้นปู" rating={4.4} isAIGenarated={true} />
                    <Card imageSrc="/ai-cook.jpg" author="กร มีความสุข" name="ไข่ข้นปู" rating={4.4} isAIGenarated={false} />
                </div>
            </div>
            <div className="flex bg-gray-100 p-5 w-3/4 justify-between">
                <div>
                    <h2 className="font-black text-3xl my-3">Our Features</h2>
                    <p>Ingredish offers a suite of innovative tools to make your cooking</p>
                    <p>journey effortless, fun, and delicious through AI and our<br />communicaation</p>
                    <div className="flex my-3">
                        <img src="/tabler_file-text-ai-black.png" alt="" className="w-auto h-7 mr-3" />
                        <p className="font-bold text-base">Smart Recipes<br /><span className="font-normal text-sm">Generate customized recipes based on your dietary<br />preferences, ingredients at hand, and cooking style.</span> </p>
                    </div>
                    <div className="flex my-3">
                        <img src="/basil_group-151-outline-black.png" alt="" className="w-auto h-7 mr-3" />
                        <p className="font-bold text-base">Communication<br /><span className="font-normal text-sm">Generate customized recipes based on your dietary<br />preferences, ingredients at hand, and cooking style.</span> </p>
                    </div>
                    <div className="flex my-3">
                        <img src="/basil_shopping-bag-outline-black.png" alt="" className="w-auto h-7 mr-3" />
                        <p className="font-bold text-base">User's Shop<br /><span className="font-normal text-sm">Generate customized recipes based on your dietary<br />preferences, ingredients at hand, and cooking style.</span> </p>
                    </div>
                </div>
                <img src="/spaghetti.png" alt="spaghetti" />
            </div>
        </div>
    );
}

export default Home;