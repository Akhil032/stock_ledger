import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BuildIcon from '@mui/icons-material/Build';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

export const GetItems = () => {
  let json = {
    list: [
      {
        id: 0,
        name: "Home",
        icon: <HomeIcon sx={{ color: "#b4b4b4" }} />, // Represents the main dashboard/home
      },
      {
        id: 1,
        name: "Account Maintenance",
        icon: <AccountCircleIcon sx={{ color: "#b4b4b4" }} />, // Account-related tasks
        subitems: [
          {
            id: 1,
            name: "Account Creation",
            icon: <AddCircleOutlineIcon sx={{ color: "#b4b4b4" }} />, // Adding accounts
          },
          {
            id: 2,
            name: "Account Maintenance",
            icon: <BuildIcon sx={{ color: "#b4b4b4" }} />, // Maintenance implies settings or fixing
          },
        ],
      },
      {
        id: 2,
        name: "Cost Maintenance",
        icon: <MonetizationOnIcon sx={{ color: "#b4b4b4" }} />, // Costs are financial
        subitems: [
          {
            id: 1,
            name: "SubLedger Cost",
            icon: <ReceiptIcon sx={{ color: "#b4b4b4" }} />, // Subledger deals with transactions
          },
          {
            id: 2,
            name: "Unit Cost Maintenance",
            icon: <AttachMoneyIcon sx={{ color: "#b4b4b4" }} />, // Represents money/unit costs
          },
        ],
      },
      {
        id: 3,
        name: "Finance Interface",
        icon: <AccountBalanceIcon sx={{ color: "#b4b4b4" }} />, // Finance-related icons
        subitems: [
          {
            id: 1,
            name: "Finance Interface Data",
            icon: <StorageIcon sx={{ color: "#b4b4b4" }} />, // Represents data storage
          },
        ],
      },
      {
        id: 4,
        name: "Reconciliation Report",
        icon: <AssessmentIcon sx={{ color: "#b4b4b4" }} />, // Reporting and reconciliation
        subitems: [
          {
            id: 1,
            name: "Reconciliation",
            icon: <CheckCircleIcon sx={{ color: "#b4b4b4" }} />, // Checkmark for completed tasks
          },
        ],
      },
      {
        id: 5,
        name: "Stage Processing",
        icon: <SyncIcon sx={{ color: "#b4b4b4" }} />, // Stages imply synchronization/processing
        subitems: [
          {
            id: 1,
            name: "Download",
            icon: <DownloadIcon sx={{ color: "#b4b4b4" }} />, // Specific icon for downloading
          },
          {
            id: 2,
            name: "Upload Inventory",
            icon: <UploadIcon sx={{ color: "#b4b4b4" }} />, // Specific icon for uploading
          },
          {
            id: 3,
            name: "Upload Non Inventory",
            icon: <CloudUploadIcon sx={{ color: "#b4b4b4" }} />, // Cloud for non-inventory upload
          },
        ],
      },
      {
        id: 6,
        name: "Stock Ledger View",
        icon: <ListAltIcon sx={{ color: "#b4b4b4" }} />, // Represents a ledger or detailed list
        subitems: [
          {
            id: 1,
            name: "Stock Ledger View",
            icon: <VisibilityIcon sx={{ color: "#b4b4b4" }} />, // Viewing stock
          },
        ],
      },
      {
        id: 7,
        name: "System Config",
        icon: <SettingsApplicationsIcon sx={{ color: "#b4b4b4" }} />, // Settings-specific icon
        subitems: [
          {
            id: 1,
            name: "System Config Creation",
            icon: <AddIcon sx={{ color: "#b4b4b4" }} />, // Represents creation
          },
          {
            id: 2,
            name: "System Config Maintenance",
            icon: <SettingsIcon sx={{ color: "#b4b4b4" }} />, // Maintenance settings
          },
        ],
      },
      {
        id: 8,
        name: "Transaction",
        icon: <AttachMoneyIcon sx={{ color: "#b4b4b4" }} />, // Transactions are finance-based
        subitems: [
          {
            id: 1,
            name: "Edit Transaction",
            icon: <EditIcon sx={{ color: "#b4b4b4" }} />, // Edit icon for modifying
          },
          {
            id: 2,
            name: "Error Processing",
            icon: <ErrorIcon sx={{ color: "#b4b4b4" }} />, // Error-specific icon
          },
          {
            id: 3,
            name: "Inquiry",
            icon: <SearchIcon sx={{ color: "#b4b4b4" }} />, // Inquiry implies search
          },
          {
            id: 4,
            name: "Transaction Reversal",
            icon: <ReplayIcon sx={{ color: "#b4b4b4" }} />, // Reversal implies replaying or undoing
          },
        ],
      },
    ],  
  };
  return json;
};
export const routeMap = {
  "Home": "/dashboard",
  "Account Maintenance": "/account-maintenance",
  "Account Creation": "/account-creation",
  "SubLedger Cost": "/sub-ledger-cost",
  "Unit Cost Maintenance": "/cost-maintenance", 
  "Finance Interface Data": "/finance-interface",
  "Reconciliation": "/reconciliation",
  "Download": "/download",
  "Upload Inventory": "/upload-inventory",
  "Upload Non Inventory": "/upload-noninventory",
  "Stock Ledger View": "/stock-ledger-view",
  "System Config Creation": "/system-config-creation",
  "System Config Maintenance": "/system-config-maintenance",
  "Edit Transaction": "/edit-transaction",
  "Error Processing": "/error-processing",
  "Inquiry": "/inquiry",
  "Transaction Reversal": "/transaction-reversal",
};
