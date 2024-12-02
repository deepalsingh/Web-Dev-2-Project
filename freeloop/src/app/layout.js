"use client"

// import localFont from "next/font/local";
import { AuthContextProvider } from "./_utils/auth-context";
import "../assets/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FreeLoop: Make a Difference Looping Back</title>
      </head>
      <body        
        className="font-geistsans antialiased m-5 bg-gradient-to-br from-emerald-100 via-emerald-200 to-indigo-100 "  
      >
        <AuthContextProvider>          
          <Header/>                
          {children} {/* All the content from pages will be injected here */}
          <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  );
}
