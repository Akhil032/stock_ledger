import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import { makeStyles,withStyles  } from "@mui/styles";
import {
  getWarehouseRequest,
  getSUPPLIERRequest,
  getSUPPLIERSITERequest,
  getPACKNORequest,
  getDIFFRequest,
  getSKURequest,
  getITEM_LIST_HEADRequest,
  getVPNRequest,
  getUDARequest,
  getPORequest,
  getHIERRequest,
  getEXCLUDEUDARequest,
  getALLOC_LEVELRequest,
  getALLOC_TYPERequest,
  getCONTEXT_TYPERequest,
  getPROMOTIONRequest,
  getSTATUSRequest,
  postALLOCRESULTRequest,
} from "../../Redux/Action/createAllocation";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import { ConstructionOutlined } from "@mui/icons-material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import { height } from "@mui/system";
//import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    width:"200px",
    fontSize:"14px",
    // This line disable the blue border
    borderRadius:"0",
    // backgroundColor:"#f0f0f0",
    boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // '& input + fieldset': {
    //   // borderColor: 'gray',
    //   // borderRadius:"0",
    //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    // },
  })
  ,
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // height: '40px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',
    
  }),
  input: (provided) => ({
    ...provided,
    width:"100%",
    // minHeight: '1px',
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize:"12px",
  }),
};

const styleSelect1 = {
  control: base => ({
    ...base,
    width:"200px",
    fontSize:"14px",
    margin:"0px 0px 10px 0px",
    // This line disable the blue border
    borderRadius:"0",
    // backgroundColor:"#f0f0f0",
    boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // '& input + fieldset': {
    //   // borderColor: 'gray',
    //   // borderRadius:"0",
    //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    // },
  })
  ,
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // height: '40px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',
    
  }),
  input: (provided) => ({
    ...provided,
    width:"100%",
    // minHeight: '1px',
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize:"12px",
  }),
};


const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    // backgroundColor:"yellow",
    // width:"100%",
    width: "calc(95vw - 0px)",
    "& table": {
      "& tr": {
        "& td:nth-child(29)": {
          display: "none",
        },
        "& td:nth-child(30)": {
          display: "none",
        },
        "& td:nth-child(31)": {
          display: "none",
        },
      },
    },
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
    // backgroundColor:"yellow"
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
    // backgroundColor:"lightgreen"
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px !important",
  },
  dateField: {
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  popUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px 20px 20px 20px",
  },
  input: {
    // width: "250px",
    height: 37.8,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius:"0",
      boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  formRadio:{
    "& .MuiSvgIcon-root": {
        height: 18,
        width: 18,
      }
  },
  inputField: {
    width: "100%",
    // margin:"10px 0px 0px 0px",
    // height: 30,
    backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius:"0",
      boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFielddate: {
    width: "200px",
    // margin:"10px 0px 0px 0px",
    height: 38,
    border:0,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius:"0",
      boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  float_container:{
    display:"inline-block",
    // margin: "0.3rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  float_child:{
    display: "inline-block",
  // border: "1px solid red",
  margin: "0.2rem",
  padding: "0rem 0rem",
  verticalAlign: "middle",
  },
  container:{
    display: "flex",
    float: "left"
  },
  container_child:{
    float: "left"
  },
  container_button:{
    // margin:"0.5rem"
  },
  grid_child:{
    display: "inline-block",
  // border: "1px solid red",
  padding: "0rem 0.5rem",
  // verticalAlign: "middle",
  },
  course_box:{
    width:"100%",
    // margin:"0 auto",
    // display: "block",
    // flexWrap:"wrap",
  },
  course_list:{
    // backgroundColor:"lightgreen",
    // position: "relative"
  },
  listdropdown:{
    padding: "0"
  },
  hoverdropdown:{
    display:"inline-block",
    fontSize:"20px",
  },
  grid_block:{
    display: "inline-block",
  // border: "1px solid red",
  padding: "0rem 0rem",
  verticalAlign: "middle",
  },
  grid_container:{
    display:"inline-block",
    // margin: "0.3rem",
  },
  header_container:{
    display:"inline-block",
    // marginTop: "0.2rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  header_child:{
    display: "inline-block",
  // border: "1px solid red",
  padding: "0rem 0.2rem",
  verticalAlign: "middle",
  },
  grid_child1:{
    display: "inline-block",
  border: "2px solid #0087ff",
  padding: "0px 5px 2px 5px",
  // verticalAlign: "middle",
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  TitleHead: {
    // height: "25px",
    position: "sticky",
    top:-1,
  },
  multiselectfield:{
    display: "inline-block",
  // border: "1px solid red",
  margin: "0rem",
  padding: "0rem 0rem",
  verticalAlign: "middle",
  },
});



// const useStyles = makeStyles({
//     input: {
//       width: 400,
//       height: 150,
//       '& input + fieldset': {
//         borderColor: 'hotpink',
//       },
//     },
//   });

const initialData = {
    CRITERIA:"",
    HIER1:[],
    HIER2:[],
    HIER3:[],
    WH:[],
    SUPPLIER:[],
    SUPPLIER_SITE:[],
    PACK_NO:[],
    ITEM_PARENT:[],
    DIFF_ID:[],
    SKU:[],
    ITEM_LIST_NO:[],
    VPN:[],
    UDA:[],
    PO:[],
    PO_TYPE:[],
    ESID_FROM:[],
    ESID_TO:[],
    NOT_BEFORE_DATE_FROM:[],
    NOT_BEFORE_DATE_TO:[],
    UDA:[],
    UDA_VALUE:[],
    EXCLUDE_UDA:[],
    EXCLUDE_UDA_VALUE:[],
}

const options = [
  {value:"None"},
  {value:"PURCHASE_ORDER"},
  {value:"WAREHOUSE"},
  {value:"ASN"},
  {value:"TRANSFER"},
  {value:"WHAT_IF"},
  ];


const initialHeader={
  CONTEXT_TYPE:"",
  ALLOC_LEVEL:"",
  ALLOC_TYPE:"",
  STATUS:"",
  PROMOTION:"",
}

const initialHIER = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM_PARENT: "",
};


const CreateAllocation = () => {
  const [searchData, setSearchData] = useState(initialData);
  const [isSearch, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [searchHeader,setSearchHeader] = useState(initialHeader);

  const [warehouseData, setWarehouseData] = useState([{}]);
  const [supplierData, setSupplierData] = useState([{}]);
  const [supplerSiteData, setSupplerSiteData] = useState([{}]);
  const [packNoData, setPackNoData] = useState([{}]);
  const [diffData, setDIffData] = useState([{}]);
  const [skuData, setSkuData] = useState([{}]);
  const [itemListHeadData, setItemListHeadData] = useState([{}]);
  const [vpnData, setVpnData] = useState([{}]);
  const [udaData, setUdaData] = useState([{}]);
  const [poData, setPoData] = useState([{}]);
  const [hierData, setHierData] = useState(initialHIER);
  const [excludeUdaData, setExcludeUdaData] = useState([{}]);
  const [allocLevelData, setAllocLevelData] = useState([{}]);
  const [allocTypeData, setAllocTypeData] = useState([{}]);
  const [contextTypeData, setContextTypeData] = useState([{}]);
  const [promotionData, setPromotionData] = useState([{}]);
  const [statusData, setStatusData] = useState([{}]);

  const [inputHIER1, setInputHIER1] = useState("");
  const [inputHIER2, setInputHIER2] = useState("");
  const [inputHIER3, setInputHIER3] = useState("");
  const [inputITEM_PARENT, setInputITEM_PARENT] = useState("");
  const [valHIER1,setValHIER1]=useState([]);
  const [valHIER2,setValHIER2]=useState([]);
  const [valHIER3,setValHIER3]=useState([]);
  const [valITEM_PARENT,setValITEM_PARENT]=useState([]);

  const [inputWH, setInputWH] = useState("");
  const [valWH,setValWH]=useState([]);

  const [inputSUPPLIER, setInputSUPPLIER] = useState("");
  const [valSUPPLIER,setValSUPPLIER]=useState([]);

  const [inputSUPPLIER_SITE, setInputSUPPLIER_SITE] = useState("");
  const [valSUPPLIER_SITE,setValSUPPLIER_SITE]=useState([]);

  const [inputPACK_NO, setInputPACK_NO] = useState("");
  const [valPACK_NO,setValPACK_NO]=useState([]);

  const [inputDIFF_ID, setInputDIFF_ID] = useState("");
  const [valDIFF_ID,setValDIFF_ID]=useState([]);

  const [inputSKU, setInputSKU] = useState("");
  const [valSKU,setValSKU]=useState([]);

  const [inputITEM_LIST_NO, setInputITEM_LIST_NO] = useState("");
  const [valITEM_LIST_NO,setValITEM_LIST_NO]=useState([]);

  const [inputVPN, setInputVPN] = useState("");
  const [valVPN,setValVPN]=useState([]);

  const [inputUDA, setInputUDA] = useState("");
  const [valUDA,setValUDA]=useState([]);

  const [inputPO, setInputPO] = useState("");
  const [valPO,setValPO] = useState([]);

  const [inputPO_TYPE, setInputPO_TYPE] = useState("");
  const [valPO_TYPE,setValPO_TYPE] = useState([]);

  const [inputUDA_VALUE, setInputUDA_VALUE] = useState("");
  const [valUDA_VALUE,setValUDA_VALUE] = useState([]);
  const [filterUDAValue,setFilterUDAValue] = useState([]);

  const [inputEXCLUDE_UDA, setInputEXCLUDE_UDA] = useState("");
  const [valEXCLUDE_UDA,setValEXCLUDE_UDA] = useState([]);
  const [filterEXCLUDE_UDAValue,setFilterEXCLUDE_UDAValue] = useState([]);

  const [inputEXCLUDE_UDA_VALUE, setInputEXCLUDE_UDA_VALUE] = useState("");
  const [valEXCLUDE_UDA_VALUE,setValEXCLUDE_UDA_VALUE] = useState([]);

  const [searchUpdateRow,setSearchUpdateRow] = useState([{}]);

  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const CreateAllocationClasses = useStyles();

  const CreateAllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );

  const dispatch = useDispatch();
 

//   console.log(":",)
// {if(searchData.CRITERIA.length===0){
//   searchData.CRITERIA="PURCHASE_ORDER"
// }}
useEffect(() => {
  document.title = 'Create Allocation';
},[]);

useEffect(() => {
  setLoading(true);
  dispatch(getWarehouseRequest([{}]));
  dispatch(getSUPPLIERRequest([{}]));
  dispatch(getSUPPLIERSITERequest([{}]));
  dispatch(getPACKNORequest([{}]));
  dispatch(getDIFFRequest([{}]));
  dispatch(getSKURequest([{}]));
  dispatch(getITEM_LIST_HEADRequest([{}]));
  dispatch(getVPNRequest([{}]));
  dispatch(getUDARequest([{}]));
  dispatch(getPORequest([{}]));
  dispatch(getHIERRequest([{}]));
  dispatch(getEXCLUDEUDARequest([{}]));
  dispatch(getALLOC_LEVELRequest([{}]));
  dispatch(getALLOC_TYPERequest([{}]));
  dispatch(getCONTEXT_TYPERequest([{}]));
  dispatch(getPROMOTIONRequest([{}]));
  dispatch(getSTATUSRequest([{}]));
}, [""]);

useEffect(() => {
  if (CreateAllocationData?.data?.Data && Array.isArray(CreateAllocationData?.data?.Data)) {
    // setTabledata(serializedata(CreateAllocationData?.data?.Data));
    //   setAllData(serializedata(CreateAllocationData?.data?.Data));
      
      setLoading(false);
      setSubmit(false);
      setSearch(false);}
 else if (
    CreateAllocationData?.data?.warehouseData &&
    Array.isArray(CreateAllocationData?.data?.warehouseData)
  ) {
    console.log("CreateAllocationData?.data?.warehouseData:",CreateAllocationData?.data?.warehouseData)
    setWarehouseData(CreateAllocationData?.data?.warehouseData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.supplierData &&
    Array.isArray(CreateAllocationData?.data?.supplierData)
  ) {
    setSupplierData(CreateAllocationData?.data?.supplierData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.supplerSiteData &&
    Array.isArray(CreateAllocationData?.data?.supplerSiteData)
  ) {
    setSupplerSiteData(CreateAllocationData?.data?.supplerSiteData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.packNoData &&
    Array.isArray(CreateAllocationData?.data?.packNoData)
  ) {
    setPackNoData(CreateAllocationData?.data?.packNoData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.diffData &&
    Array.isArray(CreateAllocationData?.data?.diffData)
  ) {
    setDIffData(CreateAllocationData?.data?.diffData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.skuData &&
    Array.isArray(CreateAllocationData?.data?.skuData)
  ) {
    setSkuData(CreateAllocationData?.data?.skuData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.itemListHeadData &&
    Array.isArray(CreateAllocationData?.data?.itemListHeadData)
  ) {
    setItemListHeadData(CreateAllocationData?.data?.itemListHeadData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.vpnData &&
    Array.isArray(CreateAllocationData?.data?.vpnData)
  ) {
    setVpnData(CreateAllocationData?.data?.vpnData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.udaData &&
    Array.isArray(CreateAllocationData?.data?.udaData)
  ) {
    setUdaData(CreateAllocationData?.data?.udaData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.poData &&
    Array.isArray(CreateAllocationData?.data?.poData)
  ) {
    setPoData(CreateAllocationData?.data?.poData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.hierData &&
    Array.isArray(CreateAllocationData?.data?.hierData)
  ) {
    setHierData(CreateAllocationData?.data?.hierData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.excludeUdaData &&
    Array.isArray(CreateAllocationData?.data?.excludeUdaData)
  ) {
    setExcludeUdaData(CreateAllocationData?.data?.excludeUdaData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.allocLevelData &&
    Array.isArray(CreateAllocationData?.data?.allocLevelData)
  ) {
    setAllocLevelData(CreateAllocationData?.data?.allocLevelData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.allocTypeData &&
    Array.isArray(CreateAllocationData?.data?.allocTypeData)
  ) {
    setAllocTypeData(CreateAllocationData?.data?.allocTypeData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.contextTypeData &&
    Array.isArray(CreateAllocationData?.data?.contextTypeData)
  ) {
    setContextTypeData(CreateAllocationData?.data?.contextTypeData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.promotionData &&
    Array.isArray(CreateAllocationData?.data?.promotionData)
  ) {
    setPromotionData(CreateAllocationData?.data?.promotionData);
    setLoading(false);
  } else if (
    CreateAllocationData?.data?.statusData &&
    Array.isArray(CreateAllocationData?.data?.statusData)
  ) {
    setStatusData(CreateAllocationData?.data?.statusData);
    setLoading(false);
  } else {
    setSearch(false);
  }
}, [CreateAllocationData?.data]);

// console.log("CreateAllocationData?.data:",CreateAllocationData?.data)


// console.log("warehouseData:",warehouseData)
// console.log("supplierData:",supplierData)
// console.log("supplerSiteData:",supplerSiteData)
// console.log("packNoData:",packNoData)
// console.log("diffData:",diffData)
// console.log("skuData:",skuData)
// console.log("itemListHeadData:",itemListHeadData)
// console.log("vpnData:",vpnData)
// console.log("udaData:",udaData)
// console.log("poData:",poData)
// console.log("hierData:",hierData)
// console.log("excludeudaData:",excludeUdaData)
console.log("allocLevelData:",allocLevelData)
// console.log("allocTypeData:",allocTypeData)
// console.log("contextTypeData:",contextTypeData)
// console.log("promotionData:",promotionData)
// console.log("statusData:",statusData)


// useEffect(() => {
//   if (isSubmit) {
//     console.log("bciubvmjjvj")
//     setTimeout(() => {
//       dispatch(postALLOCRESULTRequest([searchData]));
//     }, 500);
//   }
// }, [isSubmit]);

// useEffect(() => {
//   if (isSearch) {
//     console.log("issearchData",searchData)
//     dispatch(postALLOCRESULTRequest([searchData]));
//     setSearch(false)
//   }
// }, [isSearch]);

const SubmitList = () => {
  //////console.log(updateRow);
  // if (Object.keys(searchData).length > 0) {
  //   let sendRow = Object.values(searchData);
    
      dispatch(postALLOCRESULTRequest([searchData]));
      setLoading(true);
    }




const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleMenuItemClick = (event, index) => {
    console.log("options[index].value:",options[index].value)
    console.log("event:",index,event)
    if(index || index===0){
      console.log("12345:",index)
      setSearchData((prev) => {
      return {
        ...prev,
        CRITERIA : options[index].value,
      };
    })}
    if(event.target.textContent){
      setSearchData((prev) => {
          return {
            ...prev,
            CRITERIA : event.target.textContent,
          };
        });
      }
    setSelectedIndex(index);
    setAnchorEl(null);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "30px",
      padding: 0,
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: 14,
      textAlign:"left"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      textAlign:"left"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "30px",
  },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

// console.log("searchHeader:",searchHeader)
console.log("searchData:",searchData)

const onChange = (e) => {
  console.log("evnr",e)
  setSearchData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
};


  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread123', 356, 16.0, 49, 3.9),
    createData('Gingerbread223', 356, 16.0, 49, 3.9),
    createData('Gingerbread34', 356, 16.0, 49, 3.9),
    createData('Gingerbread567', 356, 16.0, 49, 3.9),
    createData('Gingerbread765', 356, 16.0, 49, 3.9),
    createData('Gingerbreadlkjh', 356, 16.0, 49, 3.9),
    createData('Gingerbreadhgbv', 356, 16.0, 49, 3.9),
    createData('Gingerbreadbv', 356, 16.0, 49, 3.9),
    createData('Gingerbreadkguib', 356, 16.0, 49, 3.9),
    createData('Gingerbreadntmujykil', 356, 16.0, 49, 3.9),
    createData('Gingerbreaddfbgf', 356, 16.0, 49, 3.9),
    createData('Gingerbreaddss', 356, 16.0, 49, 3.9),
    createData('Gingerbreadbghj', 356, 16.0, 49, 3.9),
    createData('Gingerbreadbgfnm', 356, 16.0, 49, 3.9),
    createData('Gingerbreaddgbfnh', 356, 16.0, 49, 3.9),
    createData('Gingerbreadgf', 356, 16.0, 49, 3.9),
  ];

  function createData(WH, Item, Description, Diff_ID, Dept) {
    return {WH, Item, Description, Diff_ID, Dept};
  }
///////////////////////////////////////////
///MULTI SELECT CODE FOR HEADER//
////////////////////////////////////

 
 const selectALLOC_LEVEL = (val) => {
  // console.log("value,e",val)
  if(val){
  setSearchHeader((prev) => {
      return {
        ...prev,
        ALLOC_LEVEL : val.ALLOC_LEVEL,
      };
    });
  }
  else{
    setSearchHeader((prev) => {
          return {
            ...prev,
            ALLOC_LEVEL : "",
          };
        });
  }
}

const selectALLOC_TYPE = (val) => {
  // console.log("value,e",val)
  if(val){
  setSearchHeader((prev) => {
      return {
        ...prev,
        ALLOC_TYPE : val.ALLOC_TYPE,
      };
    });
  }
  else{
    setSearchHeader((prev) => {
          return {
            ...prev,
            ALLOC_TYPE : "",
          };
        });
  }
}

const selectCONTEXT_TYPE = (val) => {
  // console.log("value,e",val)
  if(val){
  setSearchHeader((prev) => {
      return {
        ...prev,
        CONTEXT_TYPE : val.CONTEXT_TYPE,
      };
    });
  }
  else{
    setSearchHeader((prev) => {
          return {
            ...prev,
            CONTEXT_TYPE : "",
          };
        });
  }
}

const selectPROMOTION = (val) => {
  // console.log("value,e",val)
  if(val){
  setSearchHeader((prev) => {
      return {
        ...prev,
        PROMOTION : val.PROMOTION,
      };
    });
  }
  else{
    setSearchHeader((prev) => {
          return {
            ...prev,
            PROMOTION : "",
          };
        });
  }
}

const selectSTATUS = (val) => {
  // console.log("value,e",val)
  if(val){
  setSearchHeader((prev) => {
      return {
        ...prev,
        STATUS : val.STATUS,
      };
    });
  }
  else{
    setSearchHeader((prev) => {
          return {
            ...prev,
            STATUS : "",
          };
        });
  }
}


  /////////////////////////////////

  let UniqDept =
  hierData.length > 0
    ? [...new Map(hierData.map((item) => [item["HIER1"], item])).values()]
    : [];


  let UniqClass =
  hierData.length > 0
    ? [...new Map(hierData.map((item) => [item["HIER2"], item])).values()]
    : [];


  let UniqSubClass =
  hierData.length > 0
    ? [...new Map(hierData.map((item) => [item["HIER3"], item])).values()]
    : [];


  let UniqItemParent =
  hierData.length > 0
    ? [...new Map(hierData.map((item) => [item["ITEM_PARENT"], item])).values()]
    : [];


  let UniqPOType =
  poData.length > 0
    ? [...new Map(poData.map((item) => [item["PO_TYPE"], item])).values()]
    : [];


  let UniqUDA =
  udaData.length > 0
      ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
      : [];

  let UniqExcludeUDA =
  excludeUdaData.length > 0
      ? [...new Map(excludeUdaData.map((item) => [item["EXCLUDE_UDA"], item])).values()]
      : [];

    // console.log("inputPO:",inputPO)
    // console.log("valPO:",valPO)

///////////////////////////////////////////
///MULTI SELECT CODE FOR PURSCHASE ORDER///
////////////////////////////////////

const selectHIER1 = (event, value) => {
  let selectedHIER1 = [];
  if (value.option) {     
        valHIER1.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputHIER1("");
        // }
        if (String(value.option.HIER1).includes(inputHIER1)){
          setInputHIER1("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valHIER1.length;i++)
      {
        if(valHIER1[i]["HIER1"]===value.removedValue.HIER1){
          index=i;
          break;
        }
      }
      valHIER1.splice(index,1);
    }else if(value.action==="clear"){ 
      valHIER1.splice(0,valHIER1.length);
    }
    if(event===0){
      valHIER1.push(value)
    }
  if(valHIER1.length > 0 && typeof valHIER1[0]['HIER1'] !== "undefined"){
    valHIER1.map(
      (item) => {
        selectedHIER1.push(item.HIER1);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER1 : selectedHIER1,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid HIER1"}</p>
          </div>
        )  
  }else {
    if(searchData.HIER2.length===0 && searchData.HIER3.length===0){
      setValPACK_NO([]);
      setValDIFF_ID([]);
      setValSKU([]);
      setValUDA([]);
      setValUDA_VALUE([]);
      setValEXCLUDE_UDA([]);
      setValEXCLUDE_UDA_VALUE([]);
      setValITEM_PARENT([]);
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM_PARENT : [],
          PACK_NO:[],
          DIFF_ID:[],
          SKU:[],
          UDA:[],
          UDA_VALUE:[],
          EXCLUDE_UDA:[],
          EXCLUDE_UDA_VALUE:[],
        };
      });
    }
    initialData.HIER1 = "";
    setSearchData((prev) => {
      return {
        ...prev,
        HIER1 : [],
      };
    });
  }
 }
 

 const selectHIER2 = (event, value) => {
  let selectedHIER2 = [];
  if (value.option) {     
        valHIER2.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputHIER2("");
        // }
        if (String(value.option.HIER2).includes(inputHIER2)){
          setInputHIER2("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valHIER2.length;i++)
      {
        if(valHIER2[i]["HIER2"]===value.removedValue.HIER2){
          index=i;
          break;
        }
      }
      valHIER2.splice(index,1);
    }else if(value.action==="clear"){ 
      valHIER2.splice(0,valHIER2.length);
    }
    if(event===0){
      valHIER2.push(value)
    }
  if(valHIER2.length > 0 && typeof valHIER2[0]['HIER2'] !== "undefined"){
    valHIER2.map(
      (item) => {
        selectedHIER2.push(item.HIER2);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER2 : selectedHIER2,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid HIER2"}</p>
          </div>
        )  
  }else {
    if(searchData.HIER1.length===0 && searchData.HIER3.length===0){
      setValPACK_NO([]);
      setValDIFF_ID([]);
      setValSKU([]);
      setValUDA([]);
      setValUDA_VALUE([]);
      setValEXCLUDE_UDA([]);
      setValEXCLUDE_UDA_VALUE([]);
      setValITEM_PARENT([]);
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM_PARENT : [],
          PACK_NO:[],
          DIFF_ID:[],
          SKU:[],
          UDA:[],
          UDA_VALUE:[],
          EXCLUDE_UDA:[],
          EXCLUDE_UDA_VALUE:[],
        };
      });
    }
    initialData.HIER2 = "";
    setSearchData((prev) => {
      return {
        ...prev,
        HIER2 : [],
      };
    });
  }
 }
 
 
 const selectHIER3 = (event, value) => {
  let selectedHIER3 = [];
  if (value.option) {     
        valHIER3.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputHIER3("");
        // }
        if (String(value.option.HIER3).includes(inputHIER3)){
          setInputHIER3("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valHIER3.length;i++)
      {
        if(valHIER3[i]["HIER3"]===value.removedValue.HIER3){
          index=i;
          break;
        }
      }
      valHIER3.splice(index,1);
    }else if(value.action==="clear"){ 
      valHIER3.splice(0,valHIER3.length);
    }
    if(event===0){
      valHIER3.push(value)
    }
  if(valHIER3.length > 0 && typeof valHIER3[0]['HIER3'] !== "undefined"){
    valHIER3.map(
      (item) => {
        selectedHIER3.push(item.HIER3);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER3 : selectedHIER3,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid HIER3"}</p>
          </div>
        )  
  }else {

    
    initialData.HIER3 = "";
    setSearchData((prev) => {
      return {
        ...prev,
        HIER3 : [],
      };
    });
    if(searchData.HIER1.length===0 && searchData.HIER2.length===0){
      setValPACK_NO([]);
      setValDIFF_ID([]);
      setValSKU([]);
      setValUDA([]);
      setValUDA_VALUE([]);
      setValEXCLUDE_UDA([]);
      setValEXCLUDE_UDA_VALUE([]);
      setValITEM_PARENT([]);
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM_PARENT : [],
          PACK_NO:[],
          DIFF_ID:[],
          SKU:[],
          UDA:[],
          UDA_VALUE:[],
          EXCLUDE_UDA:[],
          EXCLUDE_UDA_VALUE:[],
        };
      });
    }
  }
 }
 
 
 const selectITEM_PARENT = (event, value) => {
  let selectedITEM_PARENT = [];
  if (value.option) {     
        valITEM_PARENT.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputITEM_PARENT("");
        // }
        if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENT)){
          setInputITEM_PARENT("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valITEM_PARENT.length;i++)
      {
        if(valITEM_PARENT[i]["ITEM_PARENT"]===value.removedValue.ITEM_PARENT){
          index=i;
          break;
        }
      }
      valITEM_PARENT.splice(index,1);
    }else if(value.action==="clear"){ 
      valITEM_PARENT.splice(0,valITEM_PARENT.length);
    }
    if(event===0){
      valITEM_PARENT.push(value)
    }
  if(valITEM_PARENT.length > 0 && typeof valITEM_PARENT[0]['ITEM_PARENT'] !== "undefined"){
    valITEM_PARENT.map(
      (item) => {
        selectedITEM_PARENT.push(item.ITEM_PARENT);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM_PARENT : selectedITEM_PARENT,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid ITEM_PARENT"}</p>
          </div>
        )  
  }else {
    initialData.ITEM_PARENT = "";
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM_PARENT : [],
      };
    });
    if(searchData.PACK_NO.length===0 && searchData.SKU.length===0){
      setValVPN([]);
      setSearchData((prev) => {
        return {
          ...prev,
          VPN : [],
        };
      });
    }
  }
 }


const selectWH = (event, value) => {
  let selectedWH = [];
  if (value.option) {     
        valWH.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.WH).includes(inputWH)){
          setInputWH("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valWH.length;i++)
      {
        if(valWH[i]["WH"]===value.removedValue.WH){
          index=i;
          break;
        }
      }
      valWH.splice(index,1);
    }else if(value.action==="clear"){ 
      valWH.splice(0,valWH.length);
    }
    if(event===0){
      valWH.push(value)
    }
  if(valWH.length > 0 && typeof valWH[0]['WH'] !== "undefined"){
    valWH.map(
      (item) => {
        selectedWH.push(item.WH);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        WH : selectedWH,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid WH"}</p>
          </div>
        )  
  }else {
    initialData.WH = "";
    setSearchData((prev) => {
      return {
        ...prev,
        WH : [],
      };
    });
  }
 }


 const selectSUPPLIER = (event, value) => {
  let selectedSUPPLIER = [];
  if (value.option) {     
        valSUPPLIER.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.SUPPLIER).includes(inputSUPPLIER)){
          setInputSUPPLIER("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valSUPPLIER.length;i++)
      {
        if(valSUPPLIER[i]["SUPPLIER"]===value.removedValue.SUPPLIER){
          index=i;
          break;
        }
      }
      valSUPPLIER.splice(index,1);
    }else if(value.action==="clear"){ 
      valSUPPLIER.splice(0,valSUPPLIER.length);
    }
    if(event===0){
      valSUPPLIER.push(value)
    }
  if(valSUPPLIER.length > 0 && typeof valSUPPLIER[0]['SUPPLIER'] !== "undefined"){
    valSUPPLIER.map(
      (item) => {
        selectedSUPPLIER.push(item.SUPPLIER);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        SUPPLIER : selectedSUPPLIER,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid SUPPLIER"}</p>
          </div>
        )  
  }else {
    initialData.SUPPLIER = "";
    setSearchData((prev) => {
      return {
        ...prev,
        SUPPLIER : [],
      };
    });
  }
 }


 const selectSUPPLIER_SITE = (event, value) => {
  let selectedSUPPLIER_SITE = [];
  if (value.option) {     
        valSUPPLIER_SITE.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITE)){
          setInputSUPPLIER_SITE("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valSUPPLIER_SITE.length;i++)
      {
        if(valSUPPLIER_SITE[i]["SUPPLIER_SITE"]===value.removedValue.SUPPLIER_SITE){
          index=i;
          break;
        }
      }
      valSUPPLIER_SITE.splice(index,1);
    }else if(value.action==="clear"){ 
      valSUPPLIER_SITE.splice(0,valSUPPLIER_SITE.length);
    }
    if(event===0){
      valSUPPLIER_SITE.push(value)
    }
  if(valSUPPLIER_SITE.length > 0 && typeof valSUPPLIER_SITE[0]['SUPPLIER_SITE'] !== "undefined"){
    valSUPPLIER_SITE.map(
      (item) => {
        selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        SUPPLIER_SITE : selectedSUPPLIER_SITE,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid SUPPLIER_SITE"}</p>
          </div>
        )  
  }else {
    initialData.SUPPLIER_SITE = "";
    setSearchData((prev) => {
      return {
        ...prev,
        SUPPLIER_SITE : [],
      };
    });
  }
 }


 const selectPACK_NO = (event, value) => {
  let selectedPACK_NO = [];
  if (value.option) {     
        valPACK_NO.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.PACK_NO).includes(inputPACK_NO)){
          setInputPACK_NO("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valPACK_NO.length;i++)
      {
        if(valPACK_NO[i]["PACK_NO"]===value.removedValue.PACK_NO){
          index=i;
          break;
        }
      }
      valPACK_NO.splice(index,1);
    }else if(value.action==="clear"){ 
      valPACK_NO.splice(0,valPACK_NO.length);
    }
    if(event===0){
      valPACK_NO.push(value)
    }
  if(valPACK_NO.length > 0 && typeof valPACK_NO[0]['PACK_NO'] !== "undefined"){
    valPACK_NO.map(
      (item) => {
        selectedPACK_NO.push(item.PACK_NO);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        PACK_NO : selectedPACK_NO,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid PACK_NO"}</p>
          </div>
        )  
  }else {
    initialData.PACK_NO = "";
    setSearchData((prev) => {
      return {
        ...prev,
        PACK_NO : [],
      };
    });
    if(searchData.ITEM_PARENT.length===0 && searchData.SKU.length===0){
      setValVPN([]);
      setSearchData((prev) => {
        return {
          ...prev,
          VPN : [],
        };
      });
    }
  }
 }


 const selectDIFF_ID = (event, value) => {
  let selectedDIFF_ID = [];
  if (value.option) {     
        valDIFF_ID.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.DIFF_ID).includes(inputDIFF_ID)){
          setInputDIFF_ID("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valDIFF_ID.length;i++)
      {
        if(valDIFF_ID[i]["DIFF_ID"]===value.removedValue.DIFF_ID){
          index=i;
          break;
        }
      }
      valDIFF_ID.splice(index,1);
    }else if(value.action==="clear"){ 
      valDIFF_ID.splice(0,valDIFF_ID.length);
    }
    if(event===0){
      valDIFF_ID.push(value)
    }
  if(valDIFF_ID.length > 0 && typeof valDIFF_ID[0]['DIFF_ID'] !== "undefined"){
    valDIFF_ID.map(
      (item) => {
        selectedDIFF_ID.push(item.DIFF_ID);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        DIFF_ID : selectedDIFF_ID,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid DIFF_ID"}</p>
          </div>
        )  
  }else {
    initialData.DIFF_ID = "";
    setSearchData((prev) => {
      return {
        ...prev,
        DIFF_ID : [],
      };
    });
  }
 }


 const selectSKU = (event, value) => {
  let selectedSKU = [];
  if (value.option) {     
        valSKU.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.SKU).includes(inputSKU)){
          setInputSKU("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valSKU.length;i++)
      {
        if(valSKU[i]["SKU"]===value.removedValue.SKU){
          index=i;
          break;
        }
      }
      valSKU.splice(index,1);
    }else if(value.action==="clear"){ 
      valSKU.splice(0,valSKU.length);
    }
    if(event===0){
      valSKU.push(value)
    }
  if(valSKU.length > 0 && typeof valSKU[0]['SKU'] !== "undefined"){
    valSKU.map(
      (item) => {
        selectedSKU.push(item.SKU);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        SKU : selectedSKU,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid SKU"}</p>
          </div>
        )  
  }else {
    initialData.SKU = "";
    setSearchData((prev) => {
      return {
        ...prev,
        SKU : [],
      };
    });
    if(searchData.PACK_NO.length===0 && searchData.ITEM_PARENT.length===0){
      setValVPN([]);
      setSearchData((prev) => {
        return {
          ...prev,
          VPN : [],
        };
      });
    }
  }
 }


 const selectITEM_LIST_NO = (event, value) => {
  let selectedITEM_LIST_NO = [];
  if (value.option) {     
        valITEM_LIST_NO.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NO)){
          setInputITEM_LIST_NO("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valITEM_LIST_NO.length;i++)
      {
        if(valITEM_LIST_NO[i]["ITEM_LIST_NO"]===value.removedValue.ITEM_LIST_NO){
          index=i;
          break;
        }
      }
      valITEM_LIST_NO.splice(index,1);
    }else if(value.action==="clear"){ 
      valITEM_LIST_NO.splice(0,valITEM_LIST_NO.length);
    }
    if(event===0){
      valITEM_LIST_NO.push(value)
    }
  if(valITEM_LIST_NO.length > 0 && typeof valITEM_LIST_NO[0]['ITEM_LIST_NO'] !== "undefined"){
    valITEM_LIST_NO.map(
      (item) => {
        selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM_LIST_NO : selectedITEM_LIST_NO,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid ITEM_LIST_NO"}</p>
          </div>
        )  
  }else {
    initialData.ITEM_LIST_NO = "";
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM_LIST_NO : [],
      };
    });
  }
 }


 const selectVPN = (event, value) => {
  let selectedVPN = [];
  if (value.option) {     
        valVPN.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.VPN).includes(inputVPN)){
          setInputVPN("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valVPN.length;i++)
      {
        if(valVPN[i]["VPN"]===value.removedValue.VPN){
          index=i;
          break;
        }
      }
      valVPN.splice(index,1);
    }else if(value.action==="clear"){ 
      valVPN.splice(0,valVPN.length);
    }
    if(event===0){
      valVPN.push(value)
    }
  if(valVPN.length > 0 && typeof valVPN[0]['VPN'] !== "undefined"){
    valVPN.map(
      (item) => {
        selectedVPN.push(item.VPN);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        VPN : selectedVPN,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid VPN"}</p>
          </div>
        )  
  }else {
    initialData.VPN = "";
    setSearchData((prev) => {
      return {
        ...prev,
        VPN : [],
      };
    });
  }
 }


 const selectPO = (event, value) => {
  let selectedPO = [];
  if (value.option) {     
        valPO.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.PO).includes(inputPO)){
          setInputPO("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valPO.length;i++)
      {
        if(valPO[i]["PO"]===value.removedValue.PO){
          index=i;
          break;
        }
      }
      valPO.splice(index,1);
    }else if(value.action==="clear"){ 
      valPO.splice(0,valPO.length);
    }
    if(event===0){
      valPO.push(value)
    }
  if(valPO.length > 0 && typeof valPO[0]['PO'] !== "undefined"){
    valPO.map(
      (item) => {
        selectedPO.push(item.PO);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        PO : selectedPO,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid PO"}</p>
          </div>
        )  
  }else {
    initialData.PO = "";
    setSearchData((prev) => {
      return {
        ...prev,
        PO : [],
      };
    });
  }
 }


 const selectPO_TYPE = (event, value) => {
  let selectedPO_TYPE = [];
  if (value.option) {     
        valPO_TYPE.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   ////console.log(1234)
        //   setInputWH("");
        // }
        if (String(value.option.PO_TYPE).includes(inputPO_TYPE)){
          setInputPO_TYPE("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valPO_TYPE.length;i++)
      {
        if(valPO_TYPE[i]["PO_TYPE"]===value.removedValue.PO_TYPE){
          index=i;
          break;
        }
      }
      valPO_TYPE.splice(index,1);
    }else if(value.action==="clear"){ 
      valPO_TYPE.splice(0,valPO_TYPE.length);
    }
    if(event===0){
      valPO_TYPE.push(value)
    }
  if(valPO_TYPE.length > 0 && typeof valPO_TYPE[0]['PO_TYPE'] !== "undefined"){
    valPO_TYPE.map(
      (item) => {
        selectedPO_TYPE.push(item.PO_TYPE);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        PO_TYPE : selectedPO_TYPE,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid PO_TYPE"}</p>
          </div>
        )  
  }else {
    initialData.PO_TYPE = "";
    setSearchData((prev) => {
      return {
        ...prev,
        PO_TYPE : [],
      };
    });
  }
 }


const selectUDA=(e,value) =>
  {
    if (e==="Filter"){
      valUDA.splice(0,valUDA.length);
      valUDA.push(...value);
   }

    let selectedUDA = [];
    if (value.option) {
      valUDA.push(value.option)
      if (String(value.option.UDA).includes(inputUDA)){
        setInputUDA("");
      } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valUDA.length;i++)
      {
        if(valUDA[i]["UDA"]===value.removedValue.UDA){
          index=i;
          break;
        }
      }
      valUDA.splice(index,1);
    
    }else if(value.action==="clear"){      
      valUDA.splice(0,valUDA.length);
      valUDA_VALUE.splice(0,valUDA_VALUE.length);
      setSearchData((prev) => {
          return {
            ...prev,
            UDA_VALUE: [],
          };
          
        });
    }
//manual input handle input and filter itemdata
if(e===0){
  valUDA.push(value)
}
//Filtering UDA_VALUE based on UDA
    if (valUDA.length >0) {
      console.log("valUDA",valUDA)
      const filterUDAValue = udaData.filter((item) => {      
        return (valUDA).some((val) => {
          return item.UDA === val.UDA;
        });     
      }); 
      console.log("filterUDAValue",filterUDAValue)
      setFilterUDAValue(filterUDAValue);
            valUDA.map((item) => {
              selectedUDA.push(item.UDA);
            });
            if(e!=="Filter" ){
              setSearchData((prev) => {
                return {
                  ...prev,
                  UDA: selectedUDA,
                };
              });    
            }  
            var filter_rem1=selectedUDA.filter(function(i) {
              return this.indexOf(i) < 0;
          },
          searchData.UDA)
            
            var filter_rem2=searchData.UDA.filter(function(i) {
              return this.indexOf(i) < 0;
          },
          selectedUDA)
          ////console.log("wew",elmts)
          if(filter_rem1.length>0 ||filter_rem2.length>0 ){
            var temp=[];
            filter_rem1.length>0?temp=[...filter_rem1]:temp=[...filter_rem2]
            //console.log("wew",temp)
            for (var i = 0; i < temp.length; i++)
            {//console.log("Afvsd")
              const index =  searchData.UDA.indexOf(temp[i]);
              if (index > -1) {
              searchData.UDA.splice(index, 1);}
              //console.log("searchData.UDA",searchData.UDA)
            }
          }
      }else {
        setFilterUDAValue([]);
        setSearchData((prev) => {
          return {
            ...prev,
            UDA: []
          };
        });
      }
}


const selectUDA_VALUE=(e,value) =>
{
  let selectedUDA_VALUE = [];
  if (value.option) {
    valUDA_VALUE.push(value.option)
    if (String(value.option.UDA_VALUE).includes(inputUDA_VALUE)){
      setInputUDA_VALUE("");
    } 
}else if (value.removedValue) {
  let index=0        
  for(var i=0;i<valUDA_VALUE.length;i++)
  {
    if(valUDA_VALUE[i]["UDA_VALUE"]===value.removedValue.UDA_VALUE){
      index=i;
      break;
    }
  }
  valUDA_VALUE.splice(index,1);
 
}else if(value.action==="clear"){      
  valUDA_VALUE.splice(0,valUDA_VALUE.length);
 }
 //manual input handle input and filter itemdata
if(e===0){
  valUDA_VALUE.push(value);
}
//Filtering UDA_VALUE based on UDA
if (valUDA_VALUE.length >0) {

      valUDA_VALUE.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });        
}else {
setSearchData((prev) => {
  return {
    ...prev,
    UDA_VALUE: selectedUDA_VALUE,
  };
});
}
}


const selectEXCLUDE_UDA=(e,value) =>
  {
    if (e==="Filter"){
      valEXCLUDE_UDA.splice(0,valEXCLUDE_UDA.length);
      valEXCLUDE_UDA.push(...value);
   }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDA.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDA)){
        setInputEXCLUDE_UDA("");
      } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valEXCLUDE_UDA.length;i++)
      {
        if(valEXCLUDE_UDA[i]["EXCLUDE_UDA"]===value.removedValue.EXCLUDE_UDA){
          index=i;
          break;
        }
      }
      valEXCLUDE_UDA.splice(index,1);
    
    }else if(value.action==="clear"){      
      valEXCLUDE_UDA.splice(0,valEXCLUDE_UDA.length);
      valEXCLUDE_UDA_VALUE.splice(0,valEXCLUDE_UDA_VALUE.length);
      setSearchData((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA_VALUE: [],
          };
          
        });
    }
//manual input handle input and filter itemdata
if(e===0){
  valEXCLUDE_UDA.push(value)
}
//Filtering EXCLUDE_UDA_VALUE based on EXCLUDE_UDA
    if (valEXCLUDE_UDA.length >0) {
      console.log("valEXCLUDE_UDA",valEXCLUDE_UDA)
      const filterEXCLUDE_UDAValue = excludeUdaData.filter((item) => {      
        return (valEXCLUDE_UDA).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });     
      }); 
      console.log("filterEXCLUDE_UDAValue",filterEXCLUDE_UDAValue)
      setFilterEXCLUDE_UDAValue(filterEXCLUDE_UDAValue);
            valEXCLUDE_UDA.map((item) => {
              selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
            });
            if(e!=="Filter" ){
              setSearchData((prev) => {
                return {
                  ...prev,
                  EXCLUDE_UDA: selectedEXCLUDE_UDA,
                };
              });    
            }  
            var filter_rem1=selectedEXCLUDE_UDA.filter(function(i) {
              return this.indexOf(i) < 0;
          },
          searchData.EXCLUDE_UDA)
            
            var filter_rem2=searchData.EXCLUDE_UDA.filter(function(i) {
              return this.indexOf(i) < 0;
          },
          selectedEXCLUDE_UDA)
          ////console.log("wew",elmts)
          if(filter_rem1.length>0 ||filter_rem2.length>0 ){
            var temp=[];
            filter_rem1.length>0?temp=[...filter_rem1]:temp=[...filter_rem2]
            //console.log("wew",temp)
            for (var i = 0; i < temp.length; i++)
            {//console.log("Afvsd")
              const index =  searchData.EXCLUDE_UDA.indexOf(temp[i]);
              if (index > -1) {
              searchData.EXCLUDE_UDA.splice(index, 1);}
              //console.log("searchData.EXCLUDE_UDA",searchData.EXCLUDE_UDA)
            }
          }
      }else {
        setFilterEXCLUDE_UDAValue([]);
        setSearchData((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: []
          };
        });
      }
}


const selectEXCLUDE_UDA_VALUE=(e,value) =>
{
  let selectedEXCLUDE_UDA_VALUE = [];
  if (value.option) {
    valEXCLUDE_UDA_VALUE.push(value.option)
    if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUE)){
      setInputEXCLUDE_UDA_VALUE("");
    } 
}else if (value.removedValue) {
  let index=0        
  for(var i=0;i<valEXCLUDE_UDA_VALUE.length;i++)
  {
    if(valEXCLUDE_UDA_VALUE[i]["EXCLUDE_UDA_VALUE"]===value.removedValue.EXCLUDE_UDA_VALUE){
      index=i;
      break;
    }
  }
  valEXCLUDE_UDA_VALUE.splice(index,1);
 
}else if(value.action==="clear"){      
  valEXCLUDE_UDA_VALUE.splice(0,valEXCLUDE_UDA_VALUE.length);
 }
 //manual input handle input and filter itemdata
if(e===0){
  valEXCLUDE_UDA_VALUE.push(value);
}
//Filtering EXCLUDE_UDA_VALUE based on UDA
if (valEXCLUDE_UDA_VALUE.length >0) {

      valEXCLUDE_UDA_VALUE.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });        
}else {
setSearchData((prev) => {
  return {
    ...prev,
    EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
  };
});
}
}


///////////////////////////////////////
//HTML CRITERIA//////////////////////
///////////////

const SearchPO= ()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    marginLeft:"5px",
    padding: "0rem 0rem",
    width:"99.6%",
    // border:"1px solid gray",
    // borderRadius:"5px",
  }}
  >
    <div className={CreateAllocationClasses.float_container}>
      <div className={CreateAllocationClasses.float_child}>
        <div>
          <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept</InputLabel>
        </div>
        <div className={CreateAllocationClasses.multiselectfield}>
          <Select 
            // className= {CreateAllocationClasses.inputField}
            classNamePrefix="mySelect"
            getOptionLabel={option =>
              `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
            getOptionValue={option => option.HIER1}
            options={UniqDept.length > 0 ? UniqDept : []}
            isSearchable={true}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputHIER1(value); // <---
            }}
            inputValue={inputHIER1}
            onChange={selectHIER1}
            maxMenuHeight={180}
            // placeholder={"Choose a Dept"}
            styles={styleSelect}
            components={animatedComponents}  
            isMulti 
            isClearable={true}
            value={UniqDept.filter(obj => searchData?.HIER1.includes(obj.HIER1))} 
            closeMenuOnSelect={true}
          />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel>
        </div>
        <div className={CreateAllocationClasses.multiselectfield}>
          <Select 
            closeMenuOnSelect={true}
            // className= {CreateAllocationClasses.inputField}
            classNamePrefix="mySelect"
            getOptionLabel={option =>
              `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
            getOptionValue={option => option.HIER2}
            options={(UniqClass.length > 0) ? UniqClass : []}
            isSearchable={true}
            onInputChange={(value, action) => {
              if (action.action === "input-change") setInputHIER2(value);
            }}
            inputValue={inputHIER2}
            onChange={selectHIER2}
            maxMenuHeight={180}
            // placeholder={"Choose a Class"}
            styles={styleSelect}
            components={animatedComponents}  
            isMulti 
            value={UniqClass.filter(obj => searchData?.HIER2.includes(obj.HIER2))}    
            // isDisabled={filterClass.length > 0 ?false:true}
          />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
      <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel>
        </div>
        <div className={CreateAllocationClasses.multiselectfield}>
        <Select 
                closeMenuOnSelect={true}
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                getOptionValue={option => option.HIER2}
                options={(UniqSubClass.length > 0) ? UniqSubClass : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputHIER3(value);
                }}
                inputValue={inputHIER3}
                onChange={selectHIER3}
                maxMenuHeight={180}
                // placeholder={"Subclass"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                value={UniqSubClass.filter(obj => searchData?.HIER3.includes(obj.HIER3))} 
                // isDisabled={subfilterClass.length > 0 ?false:true}
                />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
      <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel>
        </div>
        <div className={CreateAllocationClasses.multiselectfield}>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
                getOptionValue={option => option.WH}
                options={warehouseData.length > 0 ? warehouseData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputWH(value);
                }}
                inputValue={inputWH}
                onChange={selectWH}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={warehouseData.filter(obj => searchData?.WH.includes(obj.WH))}  
                isMulti 
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
                getOptionValue={option => option.SUPPLIER}
                options={supplierData.length > 0 ? supplierData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputSUPPLIER(value);
                }}
                inputValue={inputSUPPLIER}
                onChange={selectSUPPLIER}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={supplierData.filter(obj => searchData?.SUPPLIER.includes(obj.SUPPLIER))}  
                isMulti 
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
                getOptionValue={option => option.SUPPLIER_SITE}
                options={supplerSiteData.length > 0 ? supplerSiteData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputSUPPLIER_SITE(value);
                }}
                inputValue={inputSUPPLIER_SITE}
                onChange={selectSUPPLIER_SITE}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={supplerSiteData.filter(obj => searchData?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}  
                isMulti 
                />
        </div>
      </div>
      

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PACK_NO.toString()}`}
                getOptionValue={option => option.PACK_NO}
                options={packNoData.length > 0 ? packNoData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPACK_NO(value);
                }}
                inputValue={inputPACK_NO}
                onChange={selectPACK_NO}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={packNoData.filter(obj => searchData?.PACK_NO.includes(obj.PACK_NO))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel>
        </div>
        <div className={CreateAllocationClasses.multiselectfield}>
        <Select 
               //disabled={filterItem.length > 0 ?false:true}
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ITEM_PARENT.toString()}`}
                getOptionValue={option => option.ITEM_PARENT}
                options={(UniqItemParent.length > 0) ? UniqItemParent : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputITEM_PARENT(value);
                }}
                inputValue={inputITEM_PARENT}
                onChange={selectITEM_PARENT}
                maxMenuHeight={180}
                // placeholder={"Choose a ITEM"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                value={UniqItemParent.filter(obj => searchData?.ITEM_PARENT.includes(obj.ITEM_PARENT))} 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.DIFF_ID.toString()}`}
                getOptionValue={option => option.DIFF_ID}
                options={diffData.length > 0 ? diffData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputDIFF_ID(value);
                }}
                inputValue={inputDIFF_ID}
                onChange={selectDIFF_ID}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={diffData.filter(obj => searchData?.DIFF_ID.includes(obj.DIFF_ID))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.SKU.toString()}`}
                getOptionValue={option => option.SKU}
                options={skuData.length > 0 ? skuData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputSKU(value);
                }}
                inputValue={inputSKU}
                onChange={selectSKU}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={skuData.filter(obj => searchData?.SKU.includes(obj.SKU))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
                getOptionValue={option => option.ITEM_LIST_NO}
                options={itemListHeadData.length > 0 ? itemListHeadData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputITEM_LIST_NO(value);
                }}
                inputValue={inputITEM_LIST_NO}
                onChange={selectITEM_LIST_NO}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={itemListHeadData.filter(obj => searchData?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}  
                isMulti 
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel>
        </div>
        <div>
         <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.VPN.toString()}`}
                getOptionValue={option => option.VPN}
                options={vpnData.length > 0 ? vpnData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputVPN(value);
                }}
                inputValue={inputVPN}
                onChange={selectVPN}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={vpnData.filter(obj => searchData?.VPN.includes(obj.VPN))}  
                isMulti 
                isDisabled={(valITEM_PARENT.length || valSKU.length || valPACK_NO.length) > 0 ?false:true}
                />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          PO:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO.toString()}`}
                getOptionValue={option => option.PO}
                options={poData.length > 0 ? poData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPO(value);
                }}
                inputValue={inputPO}
                onChange={selectPO}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={poData.filter(obj => searchData?.PO.includes(obj.PO))}  
                isMulti 
                />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          EISD From:</InputLabel>
        </div>
        <div>
        <TextField
          size="small"
          variant="outlined"
          type="date"
          name="ESID_FROM"
          helperText=""
          sx={{"& .MuiInputBase-input.Mui-disabled": {
            backgroundColor:"#f0f0f0"
          }}}
          onChange={onChange}
          value={searchData.ESID_FROM}
          id="outlined-disabled"
          // label="EISD From"
          InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputFielddate,
          }}
          disabled={valPO.length > 0 ?false:true}
        />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
        EISD To:</InputLabel>
        </div>
        <div>
        <TextField
          size="small"
          type="date"
          name="ESID_TO"
          sx={{"& .MuiInputBase-input.Mui-disabled": {
            backgroundColor:"#f0f0f0"
          }}}
          onChange={onChange}
          value={searchData.ESID_TO}
          id="outlined-disabled"
          // label="EISD To"
          InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputFielddate,
          }}
          disabled={valPO.length > 0 ?false:true}
        />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Not Before Date From:</InputLabel>
        </div>
        <div>
        <TextField
          size="small"
          type="date"
          name="NOT_BEFORE_DATE_FROM"
          sx={{"& .MuiInputBase-input.Mui-disabled": {
            backgroundColor:"#f0f0f0"
          }}}
          onChange={onChange}
          value={searchData.NOT_BEFORE_DATE_FROM}
          id="outlined-disabled"
          // label="Not Before Date From"
          InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputFielddate,
          }}
          disabled={valPO.length > 0 ?false:true}
        />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
        Not Before Date To:</InputLabel>
        </div>
        <div>
        <TextField
          size="small"
          type="date"
          name="NOT_BEFORE_DATE_TO"
          sx={{"& .MuiInputBase-input.Mui-disabled": {
            backgroundColor:"#f0f0f0"
          }}}
          onChange={onChange}
          value={searchData.NOT_BEFORE_DATE_TO}
          id="outlined-disabled"
          // label="Not Before Date To"
          InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputFielddate,
          }}
          disabled={valPO.length > 0 ?false:true}
        />
        </div>
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          PO Type:</InputLabel>
       </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO_TYPE.toString()}`}
                getOptionValue={option => option.PO_TYPE}
                options={UniqPOType.length > 0 ? UniqPOType : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPO_TYPE(value);
                }}
                inputValue={inputPO_TYPE}
                onChange={selectPO_TYPE}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={UniqPOType.filter(obj => searchData?.PO_TYPE.includes(obj.PO_TYPE))}  
                isMulti 
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
                getOptionValue={option => option.UDA}
                options={UniqUDA.length > 0 ? UniqUDA : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputUDA(value);
                }}
                inputValue={inputUDA}
                onChange={selectUDA}
                maxMenuHeight={180}
                isOptionDisabled={() => valUDA.length >= 3}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={UniqUDA.filter(obj => searchData?.UDA.includes(obj.UDA))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA Value:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
                getOptionValue={option => option.UDA_VALUE}
                options={filterUDAValue.length > 0 ? filterUDAValue : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputUDA_VALUE(value);
                }}
                inputValue={inputUDA_VALUE}
                onChange={selectUDA_VALUE}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={filterUDAValue.filter(obj => searchData?.UDA_VALUE.includes(obj.UDA_VALUE))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
                getOptionValue={option => option.EXCLUDE_UDA}
                options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputEXCLUDE_UDA(value);
                }}
                inputValue={inputEXCLUDE_UDA}
                onChange={selectEXCLUDE_UDA}
                maxMenuHeight={180}
                isOptionDisabled={() => valEXCLUDE_UDA.length >= 3}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={UniqExcludeUDA.filter(obj => searchData?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

      <div className={CreateAllocationClasses.float_child}>
        <div>
        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA Value:</InputLabel>
        </div>
        <div>
        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
                getOptionValue={option => option.EXCLUDE_UDA_VALUE}
                options={filterEXCLUDE_UDAValue.length > 0 ? filterEXCLUDE_UDAValue : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputEXCLUDE_UDA_VALUE(value);
                }}
                inputValue={inputEXCLUDE_UDA_VALUE}
                onChange={selectEXCLUDE_UDA_VALUE}
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents} 
                value={filterEXCLUDE_UDAValue.filter(obj => searchData?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}  
                isMulti 
                isDisabled={(valHIER1.length || valHIER2.length || valHIER3.length) > 0 ?false:true}
                />
        </div>
      </div>

    </div>
  </Box>
)

const SearchWH= ()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    margin:"0rem",
    padding: "0rem 0rem",
    width:"100%",
    // border:"1px solid gray",
    // borderRadius:"5px",
  }}
  >
    <div className={CreateAllocationClasses.float_container}>
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Dept"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Class"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Subclass"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="WH"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier Site"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
        }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Pack No"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item Parent"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Diff ID"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Sku"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item List"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="VPN"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Avail Qty &gt;=:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Avail Qty &gt;="
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
        Avail Qty &lt;=:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Avail Qty &lt;="
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

    </div>
  </Box>
)

const SearchASN= ()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    margin:"0rem",
    padding: "0rem 0rem",
    width:"100%",
    // border:"1px solid gray",
    // borderRadius:"5px",
  }}
  >
    <div className={CreateAllocationClasses.float_container}>
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Dept"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Class"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Subclass"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="WH"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier Site"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
        }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Pack No"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item Parent"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Diff ID"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Sku"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item List"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="VPN"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          ASN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="ASN"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

    </div>
  </Box>
)

const SearchTSF= ()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    margin:"0rem",
    padding: "0rem 0rem",
    width:"100%",
    // border:"1px solid gray",
    // borderRadius:"5px",
  }}
  >
    <div className={CreateAllocationClasses.float_container}>
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Dept"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Class"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Subclass"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="WH"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier Site"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
        }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Pack No"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item Parent"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Diff ID"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Sku"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item List"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="VPN"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          ASN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Transfer"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

    </div>
  </Box>
)

const SearchWhatIf= ()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    margin:"0rem",
    padding: "0rem 0rem",
    width:"100%",
    // border:"1px solid gray",
    // borderRadius:"5px",
  }}
  >
    <div className={CreateAllocationClasses.float_container}>
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Dept"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Class"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Subclass"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="WH"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Supplier Site"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
        }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Pack No"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item Parent"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Diff ID"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Sku"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Item List"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="VPN"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>
      
      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Avail Qty &gt;=:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Avail Qty &gt;="
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
        Avail Qty &lt;=:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Avail Qty &lt;="
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA1 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA2 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="UDA3 Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

      <div className={CreateAllocationClasses.float_child}>
        {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA Value:</InputLabel> */}
        <TextField
          size="small"
          sx={{margin:"0px 0px 0px 0px"}}
          id="outlined-disabled"
          label="Exclude UDA Value"
          InputLabelProps={{style: {fontSize: "12px"}}}
          InputProps={{
          style:{fontSize:12},
          className: CreateAllocationClasses.inputField,
          }}
        />
      </div>

    </div>
  </Box>
)

const SearchButtonGrid=()=>(
  <Box 
    display="flex"
    sx={{backgroundColor:"",
    height:"auto",
    width:"100%",
    padding: "5px 0px 10px 0px",
    justifyContent:"end"
  }}
  >
      <div className={CreateAllocationClasses.grid_container}>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}}
           variant="contained"
           className={CreateAllocationClasses.textField}
           type="submit"
           onClick={SubmitList}
           >
            Add</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Delete</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Refresh</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Errors</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Split</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Refresh Grid</Button>
        </div>
      </div>
    </Box>
)

const SearchButton=()=>(
  <Box 
    display="inline-block"
    sx={{backgroundColor:"",
    height:"auto",
    margin:"0rem",
    padding: "5px 0px 10px 0px",
    width:"100%",
  }}
  >
      <div  className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child}>
          <Button 
            sx={{
              fontSize:"12px",
              backgroundColor:"MediumSeaGreen",
            }} 
            variant="contained">
          Ok</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"",fontSize:"12px"}} variant="contained">Ok+Repeat</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{backgroundColor:"rgb(255, 0, 9)",fontSize:"12px"}} variant="contained">Cancel</Button>
        </div>
      </div>
    </Box>
)


const SearchHeader=()=>(
  <Box 
    display="flex"
    sx={{backgroundColor:"",
    height:"auto",
    width:"100%",
    // border:"1px dotted gray",
    // borderRadius:"5px",
  }}
  >
    <div  className={CreateAllocationClasses.header_container}>
            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Allocation ID</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                sx={{margin:"0px 0px 10px 2px",width:"20vh"
                ,"& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor:"#f0f0f0"}}}
                disabled
                id="outlined-disabled"
                defaultValue="12345"
                InputProps={{
                style:{fontSize:12},
                className: CreateAllocationClasses.input,
                }}
              />
            </div>
            </div>

            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Desc</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                sx={{margin:"0px 0px 10px 2px",width:"30vh"}}
                id="outlined-disabled"
                defaultValue=""
                InputProps={{
                style:{fontSize:12},
                className: CreateAllocationClasses.input,
                }}
              />
            </div>
            </div>
            
            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Context Type</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select 
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CONTEXT_TYPE.toString()}`}
                getOptionValue={option => option.CONTEXT_TYPE}
                options={contextTypeData.length > 0 ? contextTypeData : []}
                isSearchable={true}
                onChange={selectCONTEXT_TYPE}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={styleSelect1}
                components={animatedComponents} 
                isClearable={true}
                value={contextTypeData.filter(obj => searchHeader?.CONTEXT_TYPE===(obj.CONTEXT_TYPE))} 
                closeMenuOnSelect={true}
              />
            </div>
            </div>

            {searchHeader.CONTEXT_TYPE==="Promotion"?
            [
            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Promotion</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select 
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.PROMOTION.toString()} -${option.DESCRIPTION.toString()} (${option.START_DATE.toString()})-(${option.END_DATE.toString()})`}
                getOptionValue={option => option.PROMOTION}
                options={promotionData.length > 0 ? promotionData : []}
                isSearchable={true}
                onChange={selectPROMOTION}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={styleSelect1}
                components={animatedComponents} 
                isClearable={true}
                value={promotionData.filter(obj => searchHeader?.PROMOTION===obj.PROMOTION)} 
                closeMenuOnSelect={true}
              />
            </div>
            </div>
            ]:null}
            

            <div className={CreateAllocationClasses.header_child}>
            <div >
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Alloc Level</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select 
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.ALLOC_LEVEL.toString()}`}
                getOptionValue={option => option.ALLOC_LEVEL}
                options={allocLevelData.length > 0 ? allocLevelData : []}
                isSearchable={true}
                onChange={selectALLOC_LEVEL}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={styleSelect1}
                components={animatedComponents} 
                isClearable={true}
                value={allocLevelData.filter(obj => searchHeader?.ALLOC_LEVEL===(obj.ALLOC_LEVEL))} 
                closeMenuOnSelect={true}
              />
            </div>
            </div>
            
            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Release Date</InputLabel>
            </div>
            <div>
              <TextField
                variant="outlined"
                type="date"
                size="small"
                sx={{margin:"0px 0px 10px 2px"}}
                id="outlined-disabled"
                label=""
                defaultValue=""
                InputProps={{
                style:{fontSize:12},
                shrink: true,
                className: CreateAllocationClasses.input,
              }}
              />
            </div>
            </div>

            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Status</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
              <Select 
                // className= {CreateAllocationClasses.inputField}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.STATUS.toString()}`}
                getOptionValue={option => option.STATUS}
                options={statusData.length > 0 ? statusData : []}
                isSearchable={true}
                defaultValue={statusData.find((value)=> value==="Worksheet")}
                onChange={selectSTATUS}
                maxMenuHeight={180}
                // placeholder={"Choose a Dept"}
                styles={styleSelect1}
                components={animatedComponents} 
                isClearable={true}
                value={statusData.filter(obj => searchHeader?.STATUS===(obj.STATUS))} 
                closeMenuOnSelect={true}
              />
            </div>
            </div>

            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Alloc Type</InputLabel>
            </div>
            <div className={CreateAllocationClasses.multiselectfield}>
                <Select 
                    closeMenuOnSelect={true}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    getOptionLabel={option =>
                      `${option.ALLOC_TYPE.toString()}`}
                    getOptionValue={option => option.ALLOC_TYPE}
                    options={allocTypeData.length > 0 ? allocTypeData : []}
                    isSearchable={true}
                    onChange={selectALLOC_TYPE}
                    maxMenuHeight={180}
                    // placeholder={"Choose a Warehouse"}
                    styles={styleSelect1}
                    components={animatedComponents} 
                    value={allocTypeData.filter(obj => searchHeader?.ALLOC_TYPE===(obj.ALLOC_TYPE))}  
                    // isMulti 
                    />
            </div>
            </div>
            
            <div className={CreateAllocationClasses.header_child}>
            <div>
              <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 2px 2px", display: 'inline', float: 'left'}}>
                Allocator</InputLabel>
            </div>
            <div>
              <TextField
                variant="outlined"
                size="small"
                sx={{margin:"0px 0px 10px 2px",width:"14vh"
                ,"& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor:"#f0f0f0"}}}
                disabled
                id="outlined-disabled"
                value={JSON.parse(localStorage.getItem("userData"))?.username}
                InputProps={{
                style:{fontSize:12},
                className: CreateAllocationClasses.input,
              }}
              />
            </div>
            </div>
    </div>
  </Box>
)



function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={CreateAllocationClasses.TitleHead}>
      <TableRow >
        <StyledTableCell padding="checkbox" style={{
                whiteSpace: "nowrap", 
              }} 
          >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all data',
            }}
            style={{
              color: "#fff",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            className={CreateAllocationClasses.TableCell}
            size="small"
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              whiteSpace: "nowrap"
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                "&.MuiTableSortLabel-root": {
                  color: "white",
                  fontSize: "0.775rem",
                },
                "&.MuiTableSortLabel-root:hover": {
                  color: "#fff",
                },
                "&.Mui-active": {
                  color: "#fff",
                },
                "& .MuiTableSortLabel-icon": {
                  color: "#fff !important",
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && selected.length===0) {
      const newSelected = rows.map((n) => n.WH);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;


///////////////////////////////////


  
// console.log("searchData:",searchData)
  return (
    <Box className={CreateAllocationClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} sx={{backgroundColor:""}}>
          <Box className={CreateAllocationClasses.boxDiv}>
            <div className={CreateAllocationClasses.uploaddiv}>
              <h4>Create Allocation</h4>
            </div>
            </Box>
        </Grid>
        </Grid>

      <Grid >
        <Box
          display="inline-block"
          sx={{backgroundColor:"",
          boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          // border:"1px solid gray",
          width:"100%",
          height:"auto",
        }}
        >
          <div sx={{display: "flex",flexDirection: "column"}}>
            <Grid id="top-row" container spacing={0} >
            <div className={CreateAllocationClasses.course_box}>
             <div className={CreateAllocationClasses.container_child}>
                  <Box>
                  <div>
                    <InputLabel sx={{fontWeight:"bold",fontSize:"15px",margin:"10px 0px 0px 5px", float: 'left',color:"black"}}>
                      Header</InputLabel>
                  </div>
                  <div>
                  {SearchHeader()}
                  </div>
                  </Box>
                </div>
            </div>
            </Grid>
          </div>
        </Box>
      </Grid>


      <Grid>
        <Box
          display="inline-block"
          sx={{backgroundColor:"",
          // border:"1px solid gray",
          boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          // marginTop:"0.1px",
          width:"100%",
          height:"auto",
        }}
        >
          <div sx={{display: "flex",flexDirection:"row"}}>
            <Grid id="top-row" container spacing={0}>
              <div className={CreateAllocationClasses.course_box}>
                <Box
                display="inline-block"
                sx={{backgroundColor:"",
                // borderBottom:"1px dotted gray",
                // border:"1px dotted gray",
                // borderRadius:"5px",
                width:"100%",
                height:"auto"}}
                >
                  <div className={CreateAllocationClasses.grid_block}>
                    <Box 
                      display="inline-block"
                      sx={{backgroundColor:"",
                      height:"auto",
                      margin: "0.2rem 0rem",
                      width:"100%",
                      marginLeft:"",
                      // boxShadow:"0 3px 10px 3px LightGray",
                      // border:"1px solid gray",
                      // borderRadius:"5px",
                    }}
                    >
                      <List
                        component="nav"
                        size="small"
                        aria-label="comment"
                        sx={{ bgcolor: '',
                        width:"100%",
                        // maxWidth: "360",
                        padding:"0px",
                        margin:"0px"
                        }}
                        MenuListProps={{
                          disablePadding: "true",
                        }}
                      >
                        <ListItem
                          button
                          id="lock-button"
                          aria-label="Criteria"
                          onClick={handleClickListItem}
                          onMouseOver={handleClickListItem}
                          onMouseDown={handleClose}
                          // onMouseOut={handleClose}
                          // onMouseEnter={handleClickListItem}
                          // onMouseLeave={handleClose}
                        >
                        <ListItemText
                          primary={<Typography type="body2" style={{ color: '',fontSize:"14px",fontWeight:"bold"}}>
                            CRITERIA: {options[selectedIndex].value}</Typography>}
                          
                        />
                        </ListItem>
                      </List>
                      <Menu
                      id="simple-menu"
                        className={CreateAllocationClasses.listdropdown}
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        onMouseLeave={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        // transformOrigin={{ vertical: 'buttom', horizontal: 'left' }}
                        disableScrollLock={true}
                        PaperProps={{
                          style:{
                            width:"auto",
                            height:"auto",
                            margin: "0.2rem 0.2rem",
                            // border:"1px solid blue",
                            // position:"fixed"
                          }
                        }}
                        MenuListProps={{
                          disablePadding: "true",
                        'aria-labelledby': 'lock-button',
                        role: 'li  stbox',
                        }}
                      >
                      {(options.slice(1,options.length)).map((option, index) => (
                        <MenuItem
                        dense="true"
                        // display="inline-list-item"
                        // className={CreateAllocationClasses.listdropdown}red
                        sx={{backgroundColor:"",
                            display:"inline-block",
                            padding:"0px 0px 0px 1px"
                          }}
                          value={option.value}
                          key={option.value}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index+1)}
                          >
                          {/* {option.value} */}
                          <RadioGroup
                          sx={{backgroundColor:"white",padding:"0px 0px 0px 0px"}}
                          size="small"
                          value={option.value}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          defaultValue={option.value}
                          name="row-radio-buttons-group"
                          >
                          <FormControlLabel 
                          value={searchData.CRITERIA}
                          onClick={handleClickListItem}
                          control={
                          <Radio size="small" 
                          onClick={handleClickListItem}
                          className={CreateAllocationClasses.formRadio}/>
                          }
                          label={<Typography sx={{fontSize:"12px",padding:"0px 0px 0px 0px",fontWeight:"bold"}}>{option.value}</Typography>}/>

                          </RadioGroup> 
                        </MenuItem>
                      ))}
                      </Menu>
                    </Box>
                  </div> 

                  <div className={CreateAllocationClasses.course_list}>
                    <Box 
                    onMouseOver={handleClose}
                    sx={{backgroundColor:"",
                    borderBottom:"1px dotted gray",
                    // borderRadius:"5px"
                    }}>
                    <div  className={CreateAllocationClasses.grid_block}>
                    {searchData.CRITERIA==="PURCHASE_ORDER"?
                      [(<div> {SearchPO()}</div>)]
                      :null}
                    {searchData.CRITERIA==="WAREHOUSE"?
                      [(<div> {SearchWH()}</div>)]
                      :null}
                    {searchData.CRITERIA==="ASN"?
                      [(<div> {SearchASN()}</div>)]
                      :null}
                    {searchData.CRITERIA==="TRANSFER"?
                      [(<div> {SearchTSF()}</div>)]
                      :null}
                    {searchData.CRITERIA==="WHAT_IF"?
                      [(<div> {SearchWhatIf()}</div>)]
                      :null}
                    {(searchData.CRITERIA===""||searchData.CRITERIA==="None")?null:
                    <div  className={CreateAllocationClasses.grid_block}>
                      {SearchButton()}
                    </div>}
                    </div>
                    </Box>
                  </div> 
                </Box>
              {(searchData.CRITERIA===""||searchData.CRITERIA==="None")?null:
              <div className={CreateAllocationClasses.course_list}>
                  {SearchButtonGrid()}
                </div>}
              </div>               
            </Grid>
          </div>
        </Box>
      </Grid>

      <Grid>
        <Box
          display="inline-block"
          sx={{backgroundColor:"",
          boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          marginTop:"10px",
          width:"100%",
          height:"auto",
        }}
        >
          <div sx={{display: "flex",flexDirection:"row"}}>
            <Grid id="top-row" container spacing={0}>
              <Box
              sx={{
                backgroundColor:"",
                width:"99%",
                height:"auto",
                margin:"10px 0px 0px 10px"
              }}
              >
                
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer style={{ maxHeight:300 }} className={CreateAllocationClasses.TitleHead}>
                    <Table
                    aria-labelledby="tableTitle"
                    >
                      <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                      />
                        <TableBody >
                        {stableSort(rows, getComparator(order, orderBy))
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.WH);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // console.log("rows:",isItemSelected)
                        return (
                          <StyledTableRow 
                          hover
                          onClick={(event) => handleClick(event, row.WH)}
                          role="checkbox"Fdep
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.WH}
                          selected={isItemSelected}
                          >
                            <StyledTableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                              'aria-labelledby': labelId,
                              }}
                            />
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.WH}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Item}</StyledTableCell>
                            <StyledTableCell align="right">{row.Description}</StyledTableCell>
                            <StyledTableCell align="right">{row.Diff_ID}</StyledTableCell>
                            <StyledTableCell align="right">{row.Dept}</StyledTableCell>
                          </StyledTableRow >
                        );
                        })}
                        {/* {emptyRows > 0 && (
                          <TableRow
                          style={{
                          height: (dense ? 33 : 53) * emptyRows,
                          }}
                          >
                          <TableCell colSpan={6} />
                          </TableRow>
                        )} */}
                        </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </Grid>
          </div>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateAllocation;
