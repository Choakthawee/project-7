import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// login
import Login from "./pages/login-page/login";

// อาจารย์
import RegCourse from "./pages/teacher-pages/regcourse";
import RegCourseEdit from "./pages/teacher-pages/regcourse_edit";
import RegResultT from "./pages/teacher-pages/regresults_t";
import Schedule from "./pages/teacher-pages/schedule";
import ScheduleEdit from "./pages/teacher-pages/schedule_edit";

// แอดมิน
import InsertUser from "./pages/admin-pages/insertuser";
import TimeSet from "./pages/admin-pages/time-set";
import UserInfo from "./pages/admin-pages/userinfo";

function App() {
  return (
    <Router>
      <Routes>
        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* อาจารย์ */}
        <Route path="/regcourse" element={<RegCourse />} />
        <Route path="/regcourse_edit" element={<RegCourseEdit />} />
        <Route path="/regresults_t" element={<RegResultT />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule_edit" element={<ScheduleEdit />} />

        {/* แอดมิน */}
        <Route path="/insertuser" element={<InsertUser />} />
        <Route path="/time-set" element={<TimeSet />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
