import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginAdmin from './components/AuthComponents/LoginAdmin';
import Webinars from './pages/Webinars/Webinars';
import CreateWebinars from './pages/Webinars/CreateWebinars';
import Courses from './pages/Courses/Courses';
import Instructors from './pages/Instructors/Instructors';
import AdminHome from './pages/Auth/AdminHome';
import AdminUsers from './components/AuthComponents/AdminUsers';
import FooterUtil from './utils/Footer/FooterUtil';
import NavbarUtil from './utils/Navbar/NavbarUtil';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Create from './pages/Courses/Create';
import FetchSingleCourses from './components/CoursesComponents/FetchSingleCourses';
import CreateI from './pages/Instructors/CreateI';
import FetchSingleInstructor from './components/InstructorComponents/FetchSingleInstructor';
import FetchSingleWebinar from './components/WebinarComponents/FetchSingleWebinar';
import { UpdateCourses } from './components/CoursesComponents/UpdateCourses';
import UpdateWebinar from './components/WebinarComponents/UpdateWebinar';
import UpdateInstructor from './components/InstructorComponents/UpdateInstructor';
import IsAdmin from './state/IsAdmin';
import Protected from './middleware/Protected';

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
          <Route path='/admin/course/create-course' element={
            <IsAdmin>
              <Create />
            </IsAdmin>
          }/>
          <Route path='/admin/course/single' element={
          <IsAdmin>
            <FetchSingleCourses />
          </IsAdmin>
          } />
          <Route path='/admin/course/update' element={
          <isAdmin>
            <UpdateCourses />
          </isAdmin>
          } />


          {/* Instructors Routes */}
          <Route path='/admin/instructor' element={<Instructors />} />
          <Route path='/admin/instructor/create-instructor' element={
          <IsAdmin>
            <CreateI />
          </IsAdmin>
          } />
          <Route path="/admin/instructors/single" element={
          <IsAdmin>
            <FetchSingleInstructor />
          </IsAdmin>
          } />
          <Route path='/admin/instructor/update' element={
          <isAdmin>
            <UpdateInstructor />
          </isAdmin>
          } />


          {/* Users Routes */}
          <Route path='/admin/users' element={<AdminHome />}  />
          <Route path='/admin/view-all-users' element={
          <IsAdmin>
            <AdminUsers />
          </IsAdmin>
          } />

          {/* Webinars Routes */}
          <Route path='/admin/webinars' element={<Webinars />} />
          <Route path='/admin/webinars/create-webinars' element={
          <IsAdmin>
            <CreateWebinars />
          </IsAdmin>
          } />
          <Route path="/admin/webinar/edit/:id" element={
          <IsAdmin>
            <FetchSingleWebinar />    
          </IsAdmin>
          } />
          <Route path='/admin/webinar/update/:id' element={
          <IsAdmin>
            <UpdateWebinar />  
          </IsAdmin>
          } />

          {/* Admin Login Route */}
          <Route path='/admin/auth/login' element={<LoginAdmin />} />
          <Route path='/admin/dashboard' element={
          <Protected>
            <Dashboard />
          </Protected>
          } />
        </Routes>
        <FooterUtil />
      </BrowserRouter>
    </>
  );
}

export default App;
