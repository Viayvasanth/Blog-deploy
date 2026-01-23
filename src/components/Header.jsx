import React from 'react'
import { Link } from 'react-router-dom';


const Header = ({ menuOpen, setMenuOpen, activeTab, setActiveTab, tabs }) => {

    

  return (


    <header>
        {/* Navbar */}
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
         <Link to={'/'}><h1 className="text-2xl font-bold cursor-pointer">My Blog</h1></Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>
        

        {/* Dropdown menu */}
        {menuOpen && tabs && (
          <div className="bg-gray-800 text-white px-6 py-4">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMenuOpen(false); // Close menu after selecting
                  }}
                  className={`px-4 py-2 rounded text-left font-semibold ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
        </header>
  )
}

export default Header
