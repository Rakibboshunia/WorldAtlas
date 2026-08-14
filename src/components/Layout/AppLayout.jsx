import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import Footer from "../UI/Footer";
import { Toaster } from "react-hot-toast";

export const AppLayout = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(9,20,40,0.96)",
            color: "#f0f6ff",
            border: "1px solid rgba(59,130,246,0.3)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            backdropFilter: "blur(16px)",
            borderRadius: "0.875rem",
            boxShadow: "0 0 30px rgba(59,130,246,0.2), 0 10px 30px rgba(0,0,0,0.5)",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#f43f5e", secondary: "#fff" },
          },
        }}
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
