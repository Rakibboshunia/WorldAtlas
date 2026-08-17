import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import { ToasterClient } from "../components/UI/ToasterClient";
import "./globals.css";

export const metadata = {
  title: "WorldAtlas - Explore the World",
  description: "Comprehensive data for every country and territory on Earth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToasterClient />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
