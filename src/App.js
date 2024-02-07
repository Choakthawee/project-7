// app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/side-navbar/admin-sidebar";

import Login from "./pages/login-page/login";

// Admin Pages
import InsertUser from "./pages/admin-pages/insertuser";
import TimeSet from "./pages/admin-pages/time-set";
import UserInfo from "./pages/admin-pages/userinfo";

// Teacher Pages
import RegCourse from "./pages/teacher-pages/regcourse";
import RegCourseEdit from "./pages/teacher-pages/regcourse_edit";
import RegResultT from "./pages/teacher-pages/regresults_t";
import Schedule from "./pages/teacher-pages/schedule";
import ScheduleEdit from "./pages/teacher-pages/schedule_edit";

// Education Pages
import ImportCourse from "./pages/ed-pages/imcourse";
import ImportSyl from "./pages/ed-pages/imsyl";
import RegResultED from "./pages/ed-pages/regresults_ed";
import RegStatus from "./pages/ed-pages/regstatus";
import SubOpen from "./pages/ed-pages/sub-open";
import Test01 from "./pages/admin-pages/test-insertuser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar /> {/* แสดง Sidebar ทุกๆ หน้า */}
              <Routes>
                <Route path="/test01" element={<Test01 />} />

                {/* Admin Pages */}
                <Route path="/insertuser" element={<InsertUser />} />
                <Route path="/time-set" element={<TimeSet />} />
                <Route path="/userinfo" element={<UserInfo />} />

                {/* Teacher Pages */}
                <Route path="/regcourse" element={<RegCourse />} />
                <Route path="/regcourse_edit" element={<RegCourseEdit />} />
                <Route path="/regresults_t" element={<RegResultT />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/schedule_edit" element={<ScheduleEdit />} />

                {/* Education Pages */}
                <Route path="/imcourse" element={<ImportCourse />} />
                <Route path="/imsyl" element={<ImportSyl />} />
                <Route path="/regresults_ed" element={<RegResultED />} />
                <Route path="/regstatus" element={<RegStatus />} />
                <Route path="/sub-open" element={<SubOpen />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
