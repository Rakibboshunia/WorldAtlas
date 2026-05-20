
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
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            fontFamily: 'var(--font-main)',
          },
        }}
      />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
