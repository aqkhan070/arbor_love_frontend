"use client";
import { Inter } from "next/font/google";
import GlobalState from "@/GlobalState/GlobalState";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gradient-to-t from-darkgreen">
      <body className={inter.className}>
        <GlobalState>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#ffffff98",
                color: "#363636",
                fontWeight: 500
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <Provider store={store}>
            {/* <Header /> */}
            {children}
          </Provider>
        </GlobalState>
      </body>
    </html>
  );
}
