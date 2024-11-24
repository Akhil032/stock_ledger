import React from "react";
import { Routes,Route } from "react-router-dom";

import Login from "./Components/Login";
import AdminLayout from "./Components/Layout";
import Dashboard from "./Components/Pages/Dashboard";
import AccountView from "./Components/Pages/Account Maintenance/view";
import ErrorProcessing from "./Components/Pages/Transaction/ErrorProcessing";
export default function Routing (){
    return(
<Routes>
    <Route path='/' element={<Login/>}/>
    <Route element={<AdminLayout/>}>
    <Route path='/dashboard' element ={<Dashboard/>}/>
    <Route path='/account-maintenance' element ={<AccountView/>}/>
    <Route path='/error-processing' element ={<ErrorProcessing/>}/>
    </Route>
</Routes>
    )
}