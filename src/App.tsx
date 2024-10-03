import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import SelectMultiAuth from './pages/Authentication/SelectMultiAuth';
import CodeMultiAuth from './pages/Authentication/CodeMultiAuth';


import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import DefaultLayout from './layout/DefaultLayout';

import AllBooks from './pages/Books/AllBooks';
import CreateBook from './pages/Books/CreateBook';
import EditBook from './pages/Books/EditBook';
import CompareBooks from './pages/Books/CompareBooks';

import Sizes from './pages/Books/Sizes';
import CreateSize from './pages/Books/CreateSize';
import EditSize from './pages/Books/EditSize';

import AllEphemeras from './pages/Ephemera/AllEphemeras';

import AllUsers from './pages/Users/AllUsers';
import CreateUser from './pages/Users/CreateUser';
import EditUser from './pages/Users/EditUser';

// 404 Not Found component
import NotFound from './pages/NotFound'; // Make sure to create this component
import CreateEphemera from './pages/Ephemera/CreateEphemera';
import EditEphemera from './pages/Ephemera/EditEphemera';
import AllReels from './pages/HardyReels/AllReels';
import CreateReel from './pages/HardyReels/CreateReel';
import EditReel from './pages/HardyReels/EditReel';
import AllOtherReels from './pages/OtherReels/AllReels';
import CreateOtherReel from './pages/OtherReels/CreateReel';
import EditOtherReel from './pages/OtherReels/EditReel';
import AllLures from './pages/Lures/AllLures';
import CreateLures from './pages/Lures/CreateLures';
import EditLures from './pages/Lures/EditLures';
import AllRods from './pages/Rods/AllRods';
import CreateRods from './pages/Rods/CreateRods';
import EditRods from './pages/Rods/EditRods';
import AllPennCatalogues from './pages/PennCatalogues/AllPennCatalogues';
import CreatePennCatalogue from './pages/PennCatalogues/CreatePennCatalogue';
import EditPennCatalogue from './pages/PennCatalogues/EditPennCatalogue';
import AllTackles from './pages/OtherTackles/AllTackles';
import CreateTackle from './pages/OtherTackles/CreateTackle';
import EditTackle from './pages/OtherTackles/EditTackle';

import AllInUseTackles from './pages/InUseTackles/AllTackles';
import CreateInUseTackle from './pages/InUseTackles/CreateTackle';
import EditInUseTackle from './pages/InUseTackles/EditTackle';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  };

  const [loggedInUser, setLoggedInUser] = useState(getUserFromLocalStorage());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const publicPaths = ['/auth/signin', '/auth/forgot-password', '/auth/reset-password','/auth/select-auth','/auth/verify-auth'];
    if (!loggedInUser && !publicPaths.includes(pathname)) {
      navigate('/auth/signin');
    }
  }, [loggedInUser, pathname, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DefaultLayout>
      <Routes>
        {loggedInUser ? (
          <>
            {/* Protected routes go here */}
            <Route index element={<><PageTitle title="Collection Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <ECommerce /></>} />

            <Route path="/books/all" element={<><PageTitle title="All Books | Collection Portal" /> <AllBooks /></>} />
            <Route path="/books/create" element={<><PageTitle title="Create Book | Collection Portal" /> <CreateBook /></>} />
            <Route path="/books/edit/:id" element={<><PageTitle title="Edit Book | Collection Portal" /> <EditBook /></>} />
            <Route path="/books/compare" element={<><PageTitle title="Compare Books | Collection Portal" /> <CompareBooks /></>} />

            <Route path="/books/sizes" element={<><PageTitle title="All Sizes | Collection Portal" /> <Sizes /></>} />
            <Route path="/books/size/edit/:id" element={<><PageTitle title="Edit Size | Collection Portal" /> <EditSize /></>} />
            <Route path="/books/size/create" element={<><PageTitle title="Create Size | Collection Portal" /> <CreateSize /></>} />

            <Route path="/ephemeras/all" element={<><PageTitle title="All Ephemeras | Collection Portal" /> <AllEphemeras /></>} />
            <Route path="/ephemeras/create" element={<><PageTitle title="Create Ephemera | Collection Portal" /> <CreateEphemera /></>} />
            <Route path="/ephemeras/edit/:id" element={<><PageTitle title="Edit Ephemera | Collection Portal" /> <EditEphemera /></>} />

            <Route path="/hardyreels/all" element={<><PageTitle title="All Hardy Reels | Collection Portal" /> <AllReels /></>} />
            <Route path="/hardyreels/create" element={<><PageTitle title="Create Hardy Reel | Collection Portal" /> <CreateReel /></>} />
            <Route path="/hardyreels/edit/:id" element={<><PageTitle title="Edit Hardy Reel | Collection Portal" /> <EditReel /></>} />

            <Route path="/otherreels/all" element={<><PageTitle title="All Other Reels | Collection Portal" /> <AllOtherReels /></>} />
            <Route path="/otherreels/create" element={<><PageTitle title="Create Other Reel | Collection Portal" /> <CreateOtherReel /></>} />
            <Route path="/otherreels/edit/:id" element={<><PageTitle title="Edit Other Reel | Collection Portal" /> <EditOtherReel /></>} />

            <Route path="/lures/all" element={<><PageTitle title="All Lures | Collection Portal" /> <AllLures /></>} />
            <Route path="/lures/create" element={<><PageTitle title="Create Lures | Collection Portal" /> <CreateLures /></>} />
            <Route path="/lures/edit/:id" element={<><PageTitle title="Edit Lures | Collection Portal" /> <EditLures /></>} />

            <Route path="/rods/all" element={<><PageTitle title="All Rods | Collection Portal" /> <AllRods /></>} />
            <Route path="/rods/create" element={<><PageTitle title="Create Rods | Collection Portal" /> <CreateRods /></>} />
            <Route path="/rods/edit/:id" element={<><PageTitle title="Edit Rods | Collection Portal" /> <EditRods /></>} />

            <Route path="/penn-catalogues/all" element={<><PageTitle title="All Penn Catalogues | Collection Portal" /> <AllPennCatalogues /></>} />
            <Route path="/penn-catalogues/create" element={<><PageTitle title="Create Penn Catalogue | Collection Portal" /> <CreatePennCatalogue /></>} />
            <Route path="/penn-catalogues/edit/:id" element={<><PageTitle title="Edit Penn Catalogue | Collection Portal" /> <EditPennCatalogue /></>} />

            <Route path="/othertackles/all" element={<><PageTitle title="All Other Tackles | Collection Portal" /> <AllTackles /></>} />
            <Route path="/othertackles/create" element={<><PageTitle title="Create Other Tackle | Collection Portal" /> <CreateTackle /></>} />
            <Route path="/othertackles/edit/:id" element={<><PageTitle title="Edit Other Tackle | Collection Portal" /> <EditTackle /></>} />

            <Route path="/inusetackles/all" element={<><PageTitle title="All In Use Tackles | Collection Portal" /> <AllInUseTackles /></>} />
            <Route path="/inusetackles/create" element={<><PageTitle title="Create In Use Tackle | Collection Portal" /> <CreateInUseTackle /></>} />
            <Route path="/inusetackles/edit/:id" element={<><PageTitle title="Edit In Use Tackle | Collection Portal" /> <EditInUseTackle /></>} />



            



            <Route path="/users/all" element={<><PageTitle title="All Users | Collection Portal" /> <AllUsers /></>} />
            <Route path="/users/create" element={<><PageTitle title="Create User | Collection Portal" /> <CreateUser /></>} />
            <Route path="/users/edit/:id" element={<><PageTitle title="Edit User | Collection Portal" /> <EditUser /></>} />
            <Route path="/forms/form-elements" element={<><PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <FormElements /></>} />
            <Route path="/forms/form-layout" element={<><PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <FormLayout /></>} />
            {/* Catch-all route for authenticated users */}
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            {/* Public routes go here */}
            <Route path="/auth/signin" element={<><PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <SignIn /></>} />
            <Route path="/auth/forgot-password" element={<><PageTitle title="Forgot Password | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <ForgotPassword /></>} />
            <Route path="/auth/reset-password" element={<><PageTitle title="Reset Password | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <ResetPassword /></>} />
            <Route path="/auth/select-auth" element={<><PageTitle title="Select Authentication Method | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <SelectMultiAuth /></>} />
            <Route path="/auth/verify-auth" element={<><PageTitle title="Verify Authentication Method | TailAdmin - Tailwind CSS Admin Dashboard Template" /> <CodeMultiAuth /></>} />
            {/* Catch-all route for public users */}
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
