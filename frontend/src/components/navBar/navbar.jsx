import React, { useState } from 'react';
import "./navbar.css"
const Navbar = ({formData,setFormData}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div className='container-fluid'>
        <nav className="navbar">
      <div className="navbar-brand">
        <a href="/"><h1>MY Note Maker</h1></a>
        <button onClick={handleToggle} className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/home" className="nav-link">HOME</a>
          </li>
          <li className="nav-item">
            <a href="/createNote" className="nav-link" >Add Note</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Delete Note</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    
  );
};

export default Navbar;
