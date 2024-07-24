import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingPage from "./pages/LoadingPage";

// Lazy load the components
const NavBar = lazy(() => import("./components/common/NavBar"));
const Home = lazy(() => import("./pages/Home"));
const PatientPage = lazy(() => import("./pages/Patient"));
const PatientForm = lazy(() => import("./pages/PatientForm"));
const ReviewForm = lazy(()=>import("./components/common/ReviewForm"))
const SearchOptions = lazy(()=>import("./pages/SearchOptions"))
const CategoryUsers = lazy(()=>import("./components/common/CategoryUsers"))
const CategoryChart = lazy(()=>import("./components/common/CategoryCountChart"))
const AdminPasscode = lazy(()=>import("./components/common/AdminPasscode"))
const CordinatorPasscode = lazy(()=>import("./components/common/CordinatorPasscode"))
const UserCharts = lazy(()=>import("./pages/UsersGraph"))
const UserPromptComponent = lazy(()=>import("./pages/UserPromptComponent"))
const UserSearch = lazy(()=>import("./pages/UserSearch"))
const MainPage = lazy(()=>import("./components/common/CordinatorForms/MainPage"))


const DentalForm = lazy(()=>import("./components/common/AllForms/DentalForm"))
const NutritionForm = lazy(()=>import("./components/common/AllForms/NutritionistForm"))
const PhysiotherapyForm = lazy(()=>import("./components/common/AllForms/PhysiotherapyForm"))
const GeneralPhysicianForm = lazy(()=>import("./components/common/AllForms/GeneralPhysicianForm"))

const RegisterPage = lazy(()=>import("./pages/RegistrationPage"))

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-hidden">
      <Suspense fallback={<LoadingPage />}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/prompt" element={<UserPromptComponent />} />
          <Route path="/user" element={<PatientPage />} />
          <Route path="/patient/form" element={<PatientForm />} />
          <Route path='/user/search' element={<UserSearch/>}></Route>
          <Route path="/reviewData" element={<ReviewForm />} />
          <Route path='/doctor' element={<CordinatorPasscode/>}></Route>
          <Route path='/doctor/search' element={<SearchOptions/>}></Route>
          <Route path='/admin' element={<AdminPasscode/>}></Route>
          {/* <Route></Route> */}
          <Route path='/admin/data' element={<CategoryUsers/>}></Route>
          <Route path='/admin/count' element={<CategoryChart/>}></Route>
          <Route path='/user/count' element={<UserCharts/>}></Route>


          {/*  */}
        <Route path='/mainpage' element={<MainPage/>}/>

        <Route path="/edit/Dental/:id" element={<DentalForm />} />
        <Route path="/edit/Nutritionist/:id" element={<NutritionForm />} />
        <Route path="/edit/Physiotherapy/:id" element={<PhysiotherapyForm />} />
        <Route path="/edit/GeneralPhysician/:id" element={<GeneralPhysicianForm />} />


        <Route path='register' element={<RegisterPage/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
