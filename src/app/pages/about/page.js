export default function AboutPage() {
    return (
        <div className=" flex justify-center items-center min-h-screen ">
            <div className="  bg-white p-8 max-w-lg w-full space-y-6 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-sky-500 text-center">
                    About FreeLoop Page
                </h1>
                <p className=" text-sky-700 text-lg leading-relaxed font-medium">
                FreeLoop is a platform designed for people who want to give back to their community and make a positive impact. Whether it's supporting a cause or helping those in need, FreeLoop makes charitable giving simple and meaningful. Join us in creating a world where generosity and kindness drive change, one donation at a time.
                </p>
            </div>
        </div>
    );
}
