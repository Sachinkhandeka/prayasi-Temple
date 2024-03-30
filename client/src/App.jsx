import React, { Suspense } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./Components/Header";
import { Spinner } from "flowbite-react";

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
              <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
              </div>
            } >
              <DaanComp />
            </Suspense>
          }   
        />
        <Route 
          path="/daan/create"
          element={
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
              </div>
            } >
              <CreateDaan />
            </Suspense>
          }
        />
        <Route 
          path="/daan/:id"
          element={
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
              </div>
            } >
              <CardComp />
            </Suspense>
          }
        />
        <Route 
           path="/daan/edit/:id"
           element={
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
              </div>
            } >
              <EditDaan />
            </Suspense>
           }
        />
         <Route 
           path="/daan/search"
           element={
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
              </div>
            } >
              <Search />
            </Suspense>
           }
        /> 
       </Routes>
    </BrowserRouter>
  );
}