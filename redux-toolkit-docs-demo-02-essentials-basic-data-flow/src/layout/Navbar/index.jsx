import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <section>
        <h2>Redux essentials example.</h2>

        <div className="navContent">
          <div className="navLinks">
            <NavLink to="/" className="active">
              Posts
            </NavLink>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default Navbar

