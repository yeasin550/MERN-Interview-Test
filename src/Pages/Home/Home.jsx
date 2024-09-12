
const Home = () => {
    return (
        <div className="flex items-center min-h-screen justify-center bg-cover bg-center"
        style={{
            backgroundImage: "url('/images/grid.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: window.innerWidth >= 768 ? "60%" : "100%",
            backgroundPosition: "center",
            backgroundPositionX: "45%"
        }}
        >

            <div className="flex flex-col text-center space-y-4 md:space-y-8 px-4 md:px-0 md:w-6/12 mx-auto">
                <h2 className="text-3xl md:text-6xl font-bold font-fira-sans leading-10">Discover Your  <span className="text-purple-700">Creativity</span>
                </h2>
                <p className="text-xl font-fira-sans leading-7">Unlock your artistic potential with our interactive digital whiteboard. Create, collaborate, and inspire within a vibrant community of creators. <br /></p>
                <div className="flex items-center justify-center gap-5">
                    <a href="/createDrawing">
                        
                        <button className="border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-red-100 disabled:text-gray-300" href="/createDrawing">Create Drawing</button>
                    </a>

                    <a href="/exploreDrawings">

                        <button className="border-gray-300 rounded text-gray-900 bg-transparent bg-orange-200 hover:bg-orange-300 py-2 px-3 border-[1px] focus:ring-orange-200 disabled:bg-orange-200 disabled:text-orange-300" href="/drawings/explore">Explore All Drawings</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;