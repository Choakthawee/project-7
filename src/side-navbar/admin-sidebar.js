// Sidebar.js

// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {/* Sidebar for Admin */}
      {pathname === "/insertuser" ||
      pathname === "/time-set" ||
      pathname === "/userinfo" ? (
        <nav>
          <ul>
            <li>
              <Link to="/insertuser">Insert User</Link>
            </li>
            <li>
              <Link to="/time-set">Time Set</Link>
            </li>
            <li>
              <Link to="/userinfo">User Info</Link>
            </li>
          </ul>
        </nav>
      ) : null}

      {/* Sidebar for Teacher */}
      {pathname === "/regcourse" ||
      pathname === "/regcourse_edit" ||
      pathname === "/regresults_t" ||
      pathname === "/schedule" ||
      pathname === "/schedule_edit" ? (
        <nav>
          <ul>
            <li>
              <Link to="/regcourse">regcourse</Link>
            </li>
            <li>
              <Link to="/regcourse_edit">regcourse_edit</Link>
            </li>
            <li>
              <Link to="/regresults_t">regresults_t</Link>
            </li>
            <li>
              <Link to="/schedule">schedule</Link>
            </li>
            <li>
              <Link to="/schedule_edit">schedule_edit</Link>
            </li>
          </ul>
        </nav>
      ) : null}

      {/* Sidebar for Education */}
      {pathname === "/imcourse" ||
      pathname === "/imsyl" ||
      pathname === "/regresults_ed" ||
      pathname === "/regstatus" ||
      pathname === "/sub-open" ? (
        <nav>
          <ul>
            <li>
              <Link to="/imcourse">imcourse</Link>
            </li>
            <li>
              <Link to="/imsyl">imsyl</Link>
            </li>
            <li>
              <Link to="/regresults_ed">regresults_ed</Link>
            </li>
            <li>
              <Link to="/regstatus">regstatus</Link>
            </li>
            <li>
              <Link to="/sub-open">sub-open</Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Sidebar;
