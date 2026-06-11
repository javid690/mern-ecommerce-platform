import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { cart } = useSelector((state) => state.cart)
    return (
        <nav className="navbar">
            <div className="logo">
                <NavLink to='/'>
                    <img src={logo} alt="" /></NavLink>
            </div>
            {/* searc input */}
            <div className="search-box">
                <form>
                    <input type="text" name="" id="" placeholder='Search Products' />
                    <button>Search</button>
                </form>
            </div>
            <ul className="nav-list">
                <li className="nav-li">
                    <NavLink to="/">Shop</NavLink>
                </li>

                <li className="nav-li">
                    <NavLink to="/pages/cartpage">
                        Cart({cart.length})
                    </NavLink>
                </li>

                <li className="nav-li">
                    <NavLink to="/pages/registerpage">
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar