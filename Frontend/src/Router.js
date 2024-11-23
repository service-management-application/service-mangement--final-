import React, { Suspense, lazy ,useState,useEffect } from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';

// Lazy loading the components
const Home = lazy(() => import('./ClientPages/Home/ClientHome.js'));
const Join = lazy(() => import('./Authentication/Join/Join.js'));
const RegisterProvider = lazy(() => import('./Authentication/RegisterProvider/RegisterProvider.js'));
const Registerclient = lazy(() => import('./Authentication/RegisterClient/RegisterClient.js'));
const Categories = lazy(() => import('./ClientPages/Categories/Categories.js'));
const ListProfilesInCat =lazy(() => import('./ClientPages/ProfilesListInCat/ProfilesListInCat.js'));
const Aboutus = lazy(() => import('./ClientPages/AboutUs/AboutUs.js'));
const Profile = lazy(() => import('./ClientPages/Profile/Profile.js'));
 const Messanger = lazy(() => import('./ClientPages/ClientMessanger/ClientMessanger.js'));
 const Dashboard = lazy(() => import('./AdminPages/Dashboard/Dashboard.js'));
 const Management = lazy(() => import('./AdminPages/Management/Management.js'));
 const ClientsManagement = lazy(() => import('./AdminPages/Clientsmanagement/ClientsManagement.js'));
 const ProvidersManagement = lazy(() => import('./AdminPages/Providers/ProvidersManagement.js'));
 const CategoriesManagement = lazy(() => import('./AdminPages/CategoriesManagement/CategoriesManagement.js'));
 const AdminLogin = lazy(() => import('./AdminPages/AdminLogin/AdminLogin.js'));
 const AdminProfile = lazy(() => import('./AdminPages/AdminProfile/AdminProfile.js'));
 const LoginProvider = lazy(() => import('./Authentication/LoginProvider/LoginProvider.js'));
 const LoginClient = lazy(() => import('./Authentication/LoginClient/LoginClient.js'));



export default function Router() {
  const [token, setToken] = useState('');

  const handleToken = (value) => {
    setToken(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);


  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <!-- Client Pages --> */}
          <Route path='/' element={<Home />} />
          <Route path='/RegisterClient' element={<Registerclient  handleToken={handleToken}/> } />
          <Route path='/RegisterProvider' element={<RegisterProvider handleToken={handleToken} />} />
          <Route path='/Join' element={<Join />} />
          <Route path='Client/Categories' element={<Categories />} />
          <Route path='Client/ListProfilesInCat' element={<ListProfilesInCat />} />
          <Route path='Client/aboutus' element={<Aboutus />} />
          <Route path='Client/Profile' element={<Profile />} />
          <Route path='Client/Messanger' element={<Messanger />} />
          <Route path='/loginProvider' element={<LoginProvider handleToken={handleToken} />} />
          <Route path='/LoginClient' element={<LoginClient handleToken={handleToken} />} />


          {/* <!-- Admin Pages --> */}

          <Route path='Admin/Dashboard' element={<Dashboard />} />
          <Route path='Admin/Management' element={<Management />} />
          <Route path='Admin/ClientsManagement' element={<ClientsManagement />} />
          <Route path='Admin/ProvidersManagement' element={<ProvidersManagement />} />
          <Route path='Admin/CategoriesManagement' element={<CategoriesManagement />} />
          <Route path='Admin/AdminLogin' element={<AdminLogin />} />
          <Route path='Admin/AdminProfile' element={<AdminProfile />} />

          {/* <!-- Provider Pages --> */}

          

        </Routes>
      </Suspense>
    </div>
  );
}
