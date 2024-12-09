export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white shadow-md z-50 py-4 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-center sm:text-left">
                        &copy; {new Date().getFullYear()} Freeloop. All Rights Reserved.
                    </p>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                        <a href="#" className="hover:text-orange-300 transition duration-300">About Us</a>
                        <a href="#" className="hover:text-orange-300 transition duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-300 transition duration-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}