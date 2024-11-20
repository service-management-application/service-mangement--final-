import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading the components
const Login = lazy(() => import('./Authentication/LoginPage/Login.js'));
const ClientHome = lazy(() => import('./ClientPages/Home/ClientHome.js'));
const Join = lazy(() => import('./Authentication/Join/Join.js'));
const RegisterProvider = lazy(() => import('./Authentication/RegisterProvider/RegisterProvider.js'));
const Registerclient = lazy(() => import('./Authentication/RegisterClient/RegisterClient.js'));
const Categories = lazy(() => import('./ClientPages/Categories/Categories.js'));
const ProfilesListInCat =lazy(() => import('./ClientPages/ProfilesListInCat/ProfilesListInCat.js'));
const Aboutus = lazy(() => import('./ClientPages/AboutUs/AboutUs.js'));
const Profile = lazy(() => import('./ClientPages/Profile/Profile.js'));
const MyProfile = lazy(() => import('./ClientPages/MyProfile/MyProfile.js'));




 const ClientMessanger = lazy(() => import('./ClientPages/ClientMessanger/ClientMessanger.js'));
 const Dashboard = lazy(() => import('./AdminPages/Dashboard/Dashboard.js'));
 const Management = lazy(() => import('./AdminPages/Management/Management.js'));
 const ClientsManagement = lazy(() => import('./AdminPages/Clientsmanagement/ClientsManagement.js'));
 const ProvidersManagement = lazy(() => import('./AdminPages/Providers/ProvidersManagement.js'));
 const CategoriesManagement = lazy(() => import('./AdminPages/CategoriesManagement/CategoriesManagement.js'));
 const AdminLogin = lazy(() => import('./AdminPages/AdminLogin/AdminLogin.js'));
 const AdminProfile = lazy(() => import('./AdminPages/AdminProfile/AdminProfile.js'));



//  <!-- Provider imports -->
const ProviderHome = lazy(() => import('./ProviderPages/ProviderHome/ProviderHome.js'));
const ProviderCategories = lazy(() => import('./ProviderPages/ProviderCategories/ProviderCategories.js'));
const OffersListInCat = lazy(() => import('./ProviderPages/OffersListInCat/OffersListInCat.js'));
const Offerdescription = lazy(() => import('./ProviderPages/OfferDescription/OfferDescription.js'));
const ProviderMessanger = lazy(() => import('./ProviderPages/ProviderMessanger/ProviderMessanger.js'));


export default function Router() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <!-- Client Pages --> */}
          <Route path='/' element={<ClientHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/RegisterClient' element={<Registerclient />} />
          <Route path='/RegisterProvider' element={<RegisterProvider />} />
          <Route path='/Join' element={<Join />} />
          <Route path='Client/Categories' element={<Categories />} />
          <Route path='Client/ProfilesListInCat' element={<ProfilesListInCat />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='Client/Profile' element={<Profile />} />
          <Route path='Client/ClientMessanger' element={<ClientMessanger />} />
          <Route path='Client/MyProfile' element={<MyProfile />} />

          {/* <!-- Admin Pages --> */}

          <Route path='Admin/Dashboard' element={<Dashboard />} />
          <Route path='Admin/Management' element={<Management />} />
          <Route path='Admin/ClientsManagement' element={<ClientsManagement />} />
          <Route path='Admin/ProvidersManagement' element={<ProvidersManagement />} />
          <Route path='Admin/CategoriesManagement' element={<CategoriesManagement />} />
          <Route path='Admin/AdminLogin' element={<AdminLogin />} />
          <Route path='Admin/AdminProfile' element={<AdminProfile />} />

          {/* <!-- Provider Pages --> */}

          <Route path='/provider/ProviderHome' element={<ProviderHome />} />
          <Route path='/provider/ProviderCategories' element={<ProviderCategories />} />
          <Route path='/provider/OffersListInCat' element={<OffersListInCat />} />
          <Route path='/provider/offerdescription' element={<Offerdescription />} />
          <Route path='/provider/ProviderMessanger' element={<ProviderMessanger />} />


        </Routes>
      </Suspense>
    </div>
  );
}
