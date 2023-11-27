import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <NavLink to="/" className="active">Posts</NavLink>
          </div>
        </div>
      </section>
    </nav>
  )
}
