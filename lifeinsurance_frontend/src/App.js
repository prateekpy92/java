import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import About from './component/shared/About';
import Contact from './component/shared/Contact';
import Login from './component/shared/Login';
import ForgotPassword from './component/shared/ForgotPassword';
import ResetPassword from './component/shared/ResetPassword'; 

import Admin from './component/admin/Admin';
import Customer from './component/customer/Customer';
import Agent from './component/agent/Agent';
import Home from './component/home/Home';
import Plan from './component/plan/Plan';
import Employee from './component/employee/Employee';
import AddAgent from './component/employee/AddAgent';
import AddEmployee from './component/admin/AddEmployee';
import AllEmployee from './component/admin/AllEmployee';
import AllPlans from './component/admin/AllPlans';
import Claims from './component/admin/Claims';
import EditEmployee from './component/admin/EditEmployee';
import EditPlan from './component/admin/EditPlan';
import Schemes from './component/admin/Schemes';
import EditEmployeeDetail from './component/employee/EditEmployeeDetail';
import AddCustomer from './component/agent/AddCustomer';
import AgentProfile from './component/agent/AgentProfile';
import CustomerProfile from './component/customer/CustomerProfile';
import BuyPlans from './component/plans/BuyPlans';
import ShowAccounts from './component/customer/ShowAccounts';
import AproovPolicy from './component/employee/AproovPolicy';
import Policy from './component/policy/Policy';
import ClaimHomePage from './component/admin/ClaimHomePage';
import AgentClaims from './component/admin/AgentClaims';
import AgentCommission from './component/agent/AgentCommission';
import PolicyClaims from './component/admin/PolicyClaims';
import UpdateScheme from './component/scheme/UpdateScheme';
import GetPolicies from './component/admin/GetPolicies';
import ShowScheme from './component/employee/ShowScheme';
import GetCustomers from './component/employee/GetCustomers';
import GetAllAccounts from './component/employee/GetAllAccounts';
import AgentAccounts from './component/agent/AgentAccounts';
import CustomerRegistration from './component/customer/CustomerRegistration'; 
import QueryList from './component/employee/QueryList';
import QueryForm from './component/employee/QueryForm';
import QueryDetail from './component/employee/QueryDetail'; 
import Queries from './component/employee/queries';
import SchemeView from './component/plans/SchemeView';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/scheme/:id ' element={<SchemeView />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} /> 
        <Route exact path='/reset-password' element={<ResetPassword />} /> 
        <Route exact path='/customer' element={<Customer />} />
        <Route exact path='/agent' element={<Agent />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/plans' element={<Plan />} />
        <Route exact path='/employee' element={<Employee />} />
        <Route exact path='/add_agent' element={<AddAgent />} />
        <Route exact path='/add_employee' element={<AddEmployee />} />
        <Route exact path='/all_employee' element={<AllEmployee />} />
        <Route exact path='/all_plan' element={<AllPlans />} />
        <Route exact path='/claim' element={<Claims />} />
        <Route exact path='/edit_employee' element={<EditEmployee />} />
        <Route exact path='/edit_plan' element={<EditPlan />} />
        <Route exact path='/schemes' element={<Schemes />} />
        <Route exact path='/edit_employee_detail' element={<EditEmployeeDetail />} />
        <Route exact path='/add_customer' element={<AddCustomer />} />
        <Route exact path='/agent_profile' element={<AgentProfile />} />
        <Route exact path='/customer_profile' element={<CustomerProfile />} />
        <Route exact path='/services' element={<BuyPlans />} />
        <Route exact path='/policy' element={<ShowAccounts />} />
        <Route exact path='/aproov_policy' element={<AproovPolicy />} />
        <Route exact path='/payments' element={<Policy />} />
        <Route exact path='/admin/claim_home' element={<ClaimHomePage />} />
        <Route exact path='/admin/agent_claim' element={<AgentClaims />} />
        <Route exact path='/admin/policy_claim' element={<PolicyClaims />} />
        <Route exact path='/agent/agent_commission' element={<AgentCommission />} />
        <Route exact path='/get_all_policy' element={<GetPolicies />} />
        <Route exact path='/show_scheme' element={<ShowScheme />} />
        <Route exact path='/get_customers' element={<GetCustomers />} />
        <Route exact path='/get_all_accounts' element={<GetAllAccounts />} />
        <Route exact path='/agent_accounts' element={<AgentAccounts />} />
        <Route exact path='/register' element={<CustomerRegistration />} />
        <Route exact path='/' element={<Queries />} />
        <Route exact path="/queries" element={<Queries />} />
                <Route exact path="/query" element={<QueryList />} />
                <Route exact path="/query/:id" element={<QueryDetail />} />
                <Route exact path="/create-query" element={<QueryForm />} />
                <Route exact path="/update-query/:id" element={<QueryForm />} />
      </Routes>
    </div>
  );
}

export default App;
