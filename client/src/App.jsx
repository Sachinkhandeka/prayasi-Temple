import React, { Suspense } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./Components/Header";

const DaanComp = React.lazy(()=> import("./pages/DaanComp"));
const CreateDaan = React.lazy(()=> import("./pages/CreateDaan"));
const EditDaan = React.lazy(()=> import("./pages/EditDaan"));
const Search = React.lazy(()=> import("./pages/Search"));
const CardComp = React.lazy(()=> import("./Components/CardComp"));



export default function App() {
  return (
    <BrowserRouter>
       <Header />
       <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={
              <div>Loading ...</div>
            } >
              <DaanComp />
            </Suspense>
          }   
        />
        <Route 
          path="/daan/create"
          element={
            <Suspense fallback={
              <div>Loading ...</div>
            } >
              <CreateDaan />
            </Suspense>
          }
        />
        <Route 
          path="/daan/:id"
          element={
            <Suspense fallback={
              <div>Loading ...</div>
            } >
              <CardComp />
            </Suspense>
          }
        />
        <Route 
           path="/daan/edit/:id"
           element={
            <Suspense fallback={
              <div>Loading ...</div>
            } >
              <EditDaan />
            </Suspense>
           }
        />
         <Route 
           path="/daan/search"
           element={
            <Suspense fallback={
              <div>Loading ...</div>
            } >
              <Search />
            </Suspense>
           }
        /> 
       </Routes>
    </BrowserRouter>
  );
}