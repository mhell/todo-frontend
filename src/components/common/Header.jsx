import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ title, subtitle, onToggleSidebar, actions }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollPosition = event.target.scrollTop;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="header" className={`dashboard-header sticky-top ${isScrolled ? "scrolled" : ""}`}>
      <div className="mobile-brand d-md-none">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <div className="brand-content">
          <i className="bi bi-card-checklist"></i>
          <h4>To-do App</h4>
        </div>
      </div>

      <div className="header-content">
        <div className="header-left">
          <h1>{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
        {actions && <div className="header-actions">{actions}</div>}
      </div>
    </div>
  );
};

export default Header;
