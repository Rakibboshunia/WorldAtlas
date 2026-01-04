
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="grid navbar-grid">
          
          {/* Logo */}
          <div className="Logo">
            <NavLink to="/">
              <h1>WorldAtlas</h1>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul>
              <li><NavLink to="/countries">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/country">Country</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
