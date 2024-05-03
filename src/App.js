import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginAdmin from './components/AuthComponents/LoginAdmin';
import Webinars from './pages/Webinars/Webinars';
import CreateWebinars from './pages/Webinars/CreateWebinars';
import Courses from './pages/Courses/Courses';
import { CreateCourse } from './pages/Courses/CreateCourse';
import Instructors from './pages/Instructors/Instructors';
import AdminHome from './pages/Auth/AdminHome';
import AdminUsers from './components/AuthComponents/AdminUsers';
import FooterUtil from './utils/Footer/FooterUtil';
import NavbarUtil from './utils/Navbar/NavbarUtil';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateInstructor from './pages/Instructors/CreateInstructors';

function App() {
  return (
    <>
      {/* Admin Routes */}
      <BrowserRouter>
      <NavbarUtil />
        <Routes>

          <Route path='/' element={<Home />} />
          
          {/* Courses Routes */}
          <Route path='/admin/course' element={<Courses />} />
          <Route path='/admin/course/create-course' element={<CreateCourse />}/>


          {/* Instructors Routes */}
          <Route path='/admin/instructor' element={<Instructors />} />
          <Route path='/admin/instructor/create-instructor' element={<CreateInstructor />} />


          {/* Users Routes */}
          <Route path='/admin/users' element={<AdminHome />}  />
          <Route path='/admin/view-all-users' element={<AdminUsers />} />

          {/* Webinars Routes */}
          <Route path='/admin/webinars' element={<Webinars />} />
          <Route path='/admin/webinars/create-webinars' element={<CreateWebinars />} />

          {/* Admin Login Route */}
          <Route path='/admin/auth/login' element={<LoginAdmin />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Routes>
        <FooterUtil />
      </BrowserRouter>
    </>
  );
}

export default App;
