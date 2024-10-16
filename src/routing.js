import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import StageProcessing from "./Pages/StageProcessing";
import AdminLayout from "./Pages/Dashboard/AdminLayout";
import ErrorProcessing from "./Components/ErrorProcessing";
import SystemConfig from "./Pages/systemConfig";
import Reconciliation from "./Pages/Reconciliation";
import InquryScreen from "./Pages/inquiry";
import NonInventory from "./Pages/Noninventory";
import Download from "./Pages/StageProcessing/download";
import EditTransaction from "./Pages/editTransaction";
import TransactionReversal from "./Pages/TransactionReversal";
import CostChange from "./Components/CostChange";
import GlAccount from "./Components/GLAccount";
import GLCreation from "./Components/GLCreation";
import FinanceInterface from "./Components/FinanaceInterface";
import DailyView from "./Pages/Daily_view";
import SubLedgerCost from "./Pages/Subledger_cost";
import SystemConfigCreation from "./Pages/systemConfig_Creation";
import POrder from "./Components/POrder"
import LikeItemMap from "./Components/LikeItem";
import ScheduleAlloc from "./Components/ScheduleAlloc";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stage-processing" element={<StageProcessing />} />
        <Route path="/download" element={<Download />} />
        <Route path="/error-processing" element={<ErrorProcessing />} />
        <Route path="/system-config-maintenance" element={<SystemConfig />} />
        <Route path="/reconciliation" element={<Reconciliation />} />
        <Route path="/inquiry" element={<InquryScreen />} />
        <Route path="/noninventory/" element={<NonInventory />} />
        <Route path="/edit-transaction" element={<EditTransaction/>} />
        <Route path="/transaction-reversal" element={<TransactionReversal/>} />
        <Route path="/Cost-Maintenance" element={<CostChange />} />
        <Route path="/Account-maintenance" element={<GlAccount />} />  
        <Route path="/ACCOUNT-CREATION" element={<GLCreation />} /> 
        <Route path="/Finance-Interface" element={<FinanceInterface />} />
        <Route path="/Stock-Ledger-View" element={<DailyView />} />
        <Route path="/sub_Ledger_Cost" element={<SubLedgerCost />} />
        <Route path="/system-config-creation" element={<SystemConfigCreation />} />
        {/* <Route path="/PO_Enquiry" element={<POrder />} />
        <Route path="/Like_Item_Map" element={<LikeItemMap />} />
        <Route path="/Schedule" element={<ScheduleAlloc />} /> */}

      </Route>
    </Routes>
  );
}

export default Routing;
