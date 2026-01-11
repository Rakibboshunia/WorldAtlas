
import footerContact from "../../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";

import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const footerIcon = {
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />,
  };

  return (
    <footer className="footer-section">
      <div className="container grid grid-three-cols">
        {footerContact.map((curData, index) => (
          <div className="footer-contact" key={index}>
            <div className="icon">{footerIcon[curData.icon]}</div>
            <div>
              <p>{curData.title}</p>
              <p>{curData.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="copyright-area">
        <div className="container grid grid-two-cols">
          <p>
            © 2024 WorldAtlas |{" "}
            <NavLink to="https://thapatechnical.shop/" target="_blank">
              ThapaTechnical
            </NavLink>
          </p>

          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
