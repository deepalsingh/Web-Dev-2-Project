export default function AboutPage() {
    return (
        <div className="flex justify-center items-center min-h-screen p-8"> {/* Ensures full viewport height */}
            <div className="flex flex-col w-full sm:w-96 lg:w-1/2 justify-center items-center bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl border-4 border-gradient-to-r from-teal-400 to-sky-500 p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-sky-600 text-center mb-4">
                    About <span className="text-teal-500">FreeLoop</span>
                </h1>
                <p className="text-lg text-gray-700 text-center">
                    Freeloop is a platform designed to make connections within people. This platform is for the people who want to help others and gain good deeds. 
                </p>
                <p className="text-lg text-gray-700 text-center">
                    Join us in creating a world where giving and sharing are easy and accessible to everyone. 
                    Together, we can make a difference. <span className="text-2xl">∞</span>
                </p>
            </div>
        </div>
    );
}


