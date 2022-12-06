import React, {useEffect,useState} from 'react';
import ReactDOM from "react-dom/client";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { makeStyles,withStyles,styled  } from "@mui/styles";
import {Table, TableBody, TableContainer, TableCell,Paper,TableRow,TableHead,tableCellClasses } from "@mui/material";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InputLabel from '@mui/material/InputLabel';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import InfoIcon from '@mui/icons-material/Info';
import DetailsIcon from '@mui/icons-material/Details';
import { width } from '@mui/system';
import {getHIERRequest,getHIER2Request,getHIER3Request,getUDARequest,
  getITEM_LIST_HEADRequest,getITEMPARENTRequest,getDIFFRequest,
  getSKURequest,getAllocItemsRequest,postLIkeInsertRequest,
  getAllocIdRequest,postAllocHDetailsRequest} from "../../Redux/Action/Allocation"
import { useDispatch, useSelector } from "react-redux";
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";


const animatedComponents = makeAnimated();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "10px",
  },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const styleSelect = {
    control: base => ({
      ...base,
      width:"200px",
      //height: '50px',
      //maxHeight:"50px",
      fontSize:"14px",
      // This line disable the blue border
     // borderRadius:"0",
      // backgroundColor:"#f0f0f0",
      boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // '& input + fieldset': {
      //   // borderColor: 'gray',
      //   // borderRadius:"0",
      //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
      // },
      
    }
    )
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
       //height: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      // height: '10px',
      // paddingBottom: '0px',
      
    }),
    input: (provided) => ({
      ...provided,
      width:"100%",
      //height:"30px"
      
    }),
    option: provided => ({
      ...provided,
      // color: 'blue',
      fontSize:"12px",
    }),
  };
const useStyles = makeStyles({
    // table: {
    //   minWidth: 650
    // },
    maindiv: {
        position: "relative",
        width: "calc(90vw - 10px)",
        '& table': {
            '& tr': {
                '& td:nth-child(28)': {
                    display: 'none'
                },
                '& td:nth-child(29)': {
                    display: 'none'
                },
                '& td:nth-child(30)': {
                    display: 'none'
                }
            }
        }
    },   boxDiv: {
      textAlign: "initial",
      position: "relative",
      maxWidth: "1400px",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        textAlign: "start",
        gap: 20,
    },
   
    textField: {
        marginRight: "10px !important",
    },
    float_container:{
        display:"inline-block",
        margin: "0rem 0.3rem",
        // padding: "1rem 1rem",
        // text-align: center;
      },
      container_child:{
        float: "left"
      },
      multiselectfield:{
        display: "inline-block",
      // border: "1px solid red",
      margin: "0rem",
      padding: "0rem 0rem",
      verticalAlign: "middle",
      },
      course_box:{
        width:"100%",
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
      },inputField: {
        width: "200px",
        // margin:"10px 0px 0px 0px",
         height: 38,
        //backgroundColor:"#f0f0f0",
        '& input + fieldset': {
          // borderColor: 'gray',
          borderRadius:"5px",
          boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
      },
      textField: {
        marginRight: "10px !important",
      },
      grid_block:{
        display: "inline-block",
      // border: "1px solid red",
      padding: "0rem 0rem",
      verticalAlign: "middle",
      },
      TitleHead: {
        // height: "25px",
        position: "sticky",
        top: -1,
    },
  });

const initialData={
    HIER1:[],
    HIER2:[],
    HIER3:[],
    UDA:[],
    UDA_VALUE:[],
    ITEM_LIST_NO:[],
    SIZE_PROFILE:"",
    ITEM_PARENT:[],
    DIFF_ID:[],
    SKU:"",
    SKU_DESC:"",
    SKU_DIFF_ID:"",
    NO_OF_SKUS:"",
    WEIGHT:100,
    MAP_SIZE_PROFILE:false,
  }

const LikeItemMap=()=>{
  
  const [loading, setLoading] = useState(false);
  //like item criteria Webservice data
  const [hier1Data, setHier1Data] = useState([{}]);
  const [hier2Data, setHier2Data] = useState([{}]);
  const [hier3Data, setHier3Data] = useState([{}]);
  const [udaData, setUdaData] = useState([{}]);
  const [itemListHeadData, setItemListHeadData] = useState([{}]);
  const [itemParentData,setItemParentData] = useState([{}]);
  const [diffData, setDIffData] = useState([{}]);
  const [skuData, setSkuData] = useState([{}]);
  const [tableData, setTableData] = useState([]);
  const [allocID, setAllocID] = useState([]);
  const [allocHDtl, setAllocHDtl] = useState([]);
  const [mapTableData, setMapTableData] = useState([]);
  const [delTableData, setDelTableData] = useState([]);
  const [allocNo,setAllocNo]=useState({})
  const alloc_Level="T"
  // const alloc_no="12345678"
  //filtered uda data
  const [filterUDAValue,setFilterUDAValue] = useState([]);


  //console.log("UniqItemParent:",UniqItemParent)
  //Dropdown input
  const [valHIER1,setValHIER1]=useState([]);
  const [valHIER2,setValHIER2]=useState([]);
  const [valHIER3,setValHIER3]=useState([]);
  const [valUDA,setValUDA]=useState([]);
  const [valUDAValue,setValUDAValue]=useState([]);
  const [valItemList,setValItemList]=useState([]);
  const [valSizeProf,setValSP]=useState("")
  const [valItemPar,setValItempar]=useState([]);
  const [valDiff,setValDiff]=useState([]);
  const [valSKU,setValSKU]=useState([]);
  const [mapSizeprof,setMapSP] =useState(false);
  const [mapData,setMapData]=useState(initialData);
  const []=useState([]);
  // validation
  const [checkAlloc,setCheckAlloc]=useState(false);
  const [checkClass,setCheckClass]=useState(false);
  const [checkSubClass,setCheckSubClass]=useState(false);
  //table CheckBox
  const [selected,setSelected]=useState([]);
  const [selectedMap,setSelectedMap]=useState([]);
  const AllocationData = useSelector(
    (state) => state.AllocationReducers
  );
  //Filtered Data
  const [fltrH2, setFltrH2] = useState([]);
  const [fltrH3, setFltrH3] = useState([]);
  const [fltrSku, setFltrSku] = useState([]);
  const [fltrDiff, setFltrDiff] = useState([]);
  const [fltrUDA, setFltrUDA] = useState([]);
  const [fltrIPar, setFltrIPar] = useState([]);
  //sort
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderM, setOrderM] = React.useState('asc');
  const [orderMBy, setOrderMBy] = React.useState('');


// Unique data
let UniqDept =
hier1Data.length > 0
  ? [...new Map(hier1Data.map((item) => [item["HIER1"], item])).values()]
  : [];
// let UniqClass =
// hier2Data.length > 0
//   ? [...new Map(hier2Data.map((item) => [item["HIER2"], item])).values()]
//   : [];
let UniqClass =
fltrH2.length > 0
  ? [...new Map(fltrH2.map((item) => [item["HIER2"], item])).values()]
  : [];
let UniqSubClass =
fltrH3.length > 0
  ? [...new Map(fltrH3.map((item) => [item["HIER3"], item])).values()]
  : [];
// let UniqUDA =
// udaData.length > 0
//     ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
//     : [];
let UniqUDA =
udaData.length > 0
    ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
    : [];
// let UniqItemParent =
// itemParentData.length > 0
//   ? [...new Map(itemParentData.map((item) => [item["ITEM_PARENT"], item])).values()]
//   : [];
let UniqItemParent =
itemParentData.length > 0
  ? [...new Map(fltrIPar.map((item) => [item["ITEM_PARENT"], item])).values()]
  : [];
let UniqDiff =
fltrDiff.length > 0
? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
: [];

  //Table Header for Grids
  const alloc_head=["ITEM","ITEM_DESC","DIFF_ID","#OF_SKUS"]
  const map_head=["ITEM","ITEM_DESC","DIFF_ID","LIKE_ITEM","LIKE_ITEM_DESC","LIKE_ITEM_DIFF_ID","WEIGHT%"]
  useEffect(() => {
    document.title = 'Like Item Mapping';
  },[]);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getHIERRequest([{}]));
    dispatch(getHIER2Request([{}]));
    dispatch(getHIER3Request([{}]));
    dispatch(getUDARequest([{}]));
    dispatch(getITEM_LIST_HEADRequest([{}]));
    dispatch(getITEMPARENTRequest([{}]));
    dispatch(getDIFFRequest([{}]));
    dispatch(getSKURequest([{}]));
    dispatch(getAllocIdRequest());
    //dispatch(getAllocItemsRequest([searchHeaderData.ALLOC_NO]));
    
  }, [""]);
  if( Object.keys(allocNo).includes("ALLOCATION_ID") && !checkAlloc){
    setCheckAlloc(true);
    dispatch(getAllocItemsRequest([allocNo]));
  }
  useEffect(() => {

    if (AllocationData?.data?.hierData && Array.isArray(AllocationData?.data?.hierData)) {
      setHier1Data(AllocationData?.data?.hierData);
      setLoading(false);
    }else if (AllocationData?.data?.hier2Data &&Array.isArray(AllocationData?.data?.hier2Data)) {
      setHier2Data(AllocationData?.data?.hier2Data);
      setLoading(false);
    } else if (AllocationData?.data?.hier3Data && Array.isArray(AllocationData?.data?.hier3Data)) {
      setHier3Data(AllocationData?.data?.hier3Data);
      setLoading(false);
    }else if (AllocationData?.data?.udaData && Array.isArray(AllocationData?.data?.udaData)) {
      setUdaData(AllocationData?.data?.udaData);
      setLoading(false);
    }else if (AllocationData?.data?.itemListHeadData && Array.isArray(AllocationData?.data?.itemListHeadData)) {
      setItemListHeadData(AllocationData?.data?.itemListHeadData);
      setLoading(false);
    } else if (AllocationData?.data?.itemParentData && Array.isArray(AllocationData?.data?.itemParentData)) {
      setItemParentData(AllocationData?.data?.itemParentData);
      setLoading(false);
    } else if (AllocationData?.data?.diffData && Array.isArray(AllocationData?.data?.diffData)) {
      setDIffData(AllocationData?.data?.diffData);
      setLoading(false);
    } else if(AllocationData?.data?.skuData && Array.isArray(AllocationData?.data?.skuData)) {
      setSkuData(AllocationData?.data?.skuData);
      setLoading(false);
    } else if(AllocationData?.data?.likeItemTableData && Array.isArray(AllocationData?.data?.likeItemTableData) && delTableData.length===0 && tableData.length===0) {
      setTableData(AllocationData?.data?.likeItemTableData);
      setLoading(false);
    } 
    else if(AllocationData?.data?.allocIDs && Array.isArray(AllocationData?.data?.allocIDs) && delTableData.length===0 && tableData.length===0) {
      setAllocID(AllocationData?.data?.allocIDs);
      setLoading(false);
    } 
    else if(AllocationData?.data?.allocHDetails && Array.isArray(AllocationData?.data?.allocHDetails)) {
      setAllocHDtl(AllocationData?.data?.allocHDetails);
      setLoading(false);
    }
  });

 // console.log("UniqClass ",UniqClass);

  /* 
                    #######################################
                      ### Filtering Data in criteria ###
                    #######################################
  */
//console.log(mapData,valHIER3,valHIER2)
  const filteringValData=(key,valArray)=>{
    console.log(key,valArray)
    if(mapData[key].length>0){
      mapData[key].map(item=>{
        var count=0;
        const filteredArr=valArray.filter(Obj=>Obj[key]===item);
        valArray.filter(Obj=>{          
          if(Obj[key]===item){return ;}
          count=count+1
          });
        if(filteredArr.length>0){
            if(count > -1){
                 valArray.splice(count, 1); 
              }
        }
      })
    }
  }
  const filteringData=(Mkey,key,dataObj,valArray,delVal)=>{
    filteringValData(key,valArray);
    const tempData=[...mapData[key]];
    var AllFilteredData=[];
    (dataObj.filter(obj=>(obj[Mkey]===delVal))).map(obj=>{ AllFilteredData.push(obj[key])});
    if(tempData.length>0){
      tempData.map(item=>{
        if(AllFilteredData.length>0 && AllFilteredData.includes(item)){
          const index = mapData[key].indexOf(item);
          if(index > -1){
            mapData[key].splice(index, 1); 
          }         
        }        
      })
    }
  }    
  // const filterSelect=()=>{
  //   const temp=mapData.SKU
  //   const check=skuData.filter(obj=>obj.SKU===temp)

  //   console.log("check",check,skuData)
  // }



  const filterOnSelect=(fltr_obj,Data,tableName)=>{
    console.log("fltr_obj",fltr_obj,tableName)
    const key=Object.keys(fltr_obj)[0]
    var fltrData=[]
    if (tableName==="SKU" && fltrSku.length===0){
      fltrData=fltrSku
    }
    if (tableName==="DIFF" && fltrDiff.length===0){
      fltrData=fltrDiff
    }
    if (tableName==="UDA" && fltrUDA.length===0){
      fltrData=fltrUDA
    }
    //console.log(fltr_obj[key]);
    fltr_obj[key].map(val=>{
    const temp_Data=Data.filter(obj=>obj[key]===val);
    fltrData.push(...temp_Data);
    })
    console.log("fltrData",fltrData)
    if(tableName==="SKU" || tableName==="Sk"){
      if(mapData.SKU.length>0){
      const filtr_check=fltrData.filter((obj)=>obj.SKU===mapData.SKU)
      if(filtr_check.length===0){
        setMapData((prev) => {
          return {
            ...prev,
            SKU : "",
            SKU_DESC:"",
            SKU_DIFF_ID:"",
          };
        });
      }
      //console.log("filtr_checkf",filtr_check,mapData.SKU,"fltrData",fltrData)
    }
      
      setFltrSku(fltrData)
    }else if(tableName==="DIFF" || tableName ==="ITEM_PARENT" || tableName=="SH2"){
      const filtr_check=fltrData.filter((obj)=>obj.DIFF_ID===mapData.DIFF_ID)
      // if(filtr_check.length===0){
      //   console.log("valUDA",valUDA);
      //   var check=false;
      //   var valTemp=valUDA
      //   valUDA.map((obj)=>{
      //     if(mapData.HIER3.length>0){
      //       mapData.HIER3.includes(obj.HIER3)?check=true:check=false
      //     }else if(mapData.HIER2.length>0){
      //       mapData.HIER2.includes(obj.HIER2)?check=true:check=false
      //     }else if(mapData.HIER1.length>0){
      //       mapData.HIER1.includes(obj.HIER1)?check=true:check=false
      //     }
      //     if(check){
      //       valTemp=valTemp.filter(obj=>obj)
      //     }
      //   })
      //   setMapData((prev) => {
      //     return {
      //       ...prev,
      //       DIFF_ID : [],
      //     };
      //   });
      // }
      setFltrDiff(fltrData)
    }else if (tableName==="UDA" || tableName==="UH1"){
      const filtr_check=fltrData.filter((obj)=>mapData.UDA.includes(obj.UDA))
      
      console.log("filtr_check",filtr_check,fltrData);
      if(filtr_check.length===0){
        // filtr_check.map((obj)=>{
        //   console.log(obj)
        //   if(mapData.UDA.includes(obj.UDA) && mapData.HIER1.includes(obj.HIER1)){// && mapData.HIER3.includes(obj.HIER3 && mapData.SKU===(obj.ITEM)
            
            setMapData((prev) => {
              return {
                ...prev,
                UDA: [],
                UDA_VALUE:[],
              };
            });
          //}
        //})
       
      }
      setFltrUDA(fltrData)
    }else if (tableName==="IP" ){
      setFltrIPar(fltrData)
    }
    else if (tableName==="HIER2" ){
      setFltrH2(fltrData)
    }else if (tableName==="HIER3" ){
      setFltrH3(fltrData)
    }

  }



//console.log("Diff:: ",fltrDiff,"UniqDiff",UniqDiff);
/**** Allocation number ****/
  const selectedAlloc=(value)=>{
  dispatch(postAllocHDetailsRequest([value]));
  setAllocNo({ALLOCATION_ID: value.ALLOC_NO})
  }
// Handling Like Item Criteria input selection
/* 
                    #########################################
                    ### Handling Criteria input selection ###
                    #########################################
  */
 //console.log("UniqDept",UniqDept)
  const selectedHIER1=(event,value)=>{
    let sel_HIER1 = [];
    let temp_Arr = []
    if (value.option) {  
      //console.log(value.option)
      valHIER1.push(value.option);
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
      if(valHIER1.length > 0){
        valHIER1.map(
          (item) => {
            temp_Arr.push(item.HIER1);
          }
        )
        var tempH1={};
        tempH1["HIER1"]=temp_Arr;
        filterOnSelect(tempH1,skuData,"SKU");
        filterOnSelect(tempH1,diffData,"DIFF");
        filterOnSelect(tempH1,udaData,"UDA");
        filterOnSelect(tempH1,itemParentData,"IP");
        filterOnSelect(tempH1,hier2Data,"HIER2")
      }else{
        setFltrH2([]);
        setFltrSku([]);
        setFltrDiff([]);
        setFltrUDA([]);
        setFltrIPar([]);
      }
    }else if(value.action==="clear"){ 
      valHIER1.splice(0,valHIER1.length);
      setFltrSku([]);
      setFltrDiff([]);
      setFltrUDA([]);
      setFltrIPar([]);

    }

    if(valHIER1.length > 0 && typeof valHIER1[0]['HIER1'] !== "undefined"){
      valHIER1.map(
        (item) => {
          sel_HIER1.push(item.HIER1);
          
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          HIER1 : sel_HIER1,
        };
      });
      //if(valHIER2.length===0){
        setCheckClass(true)
        var temp={}
        // if(mapData.SKU.length>0){
        //   temp["ITEM"]=mapData.SKU;}
        // else if(mapData.ITEM_PARENT.length>0){
        //   temp["ITEM_PARENT"]=[...mapData.ITEM_PARENT];}
        // else if(mapData.HIER3.length>0){
        //   temp["HIER3"]=[...mapData.HIER3];}
        // else if(mapData.HIER2.length>0){
        //     temp["HIER2"]=[...mapData.HIER2];}
        // else if(mapData.HIER1.length>0){
        // temp["HIER1"]=[...mapData.HIER1];}
        // else{
          temp["HIER1"]=sel_HIER1;
        //}
          filterOnSelect(temp,hier2Data,"HIER2")
          if(mapData.HIER2.length===0 && mapData.HIER3.length===0 && mapData.ITEM_PARENT.length===0  && mapData.SKU.length===0 )
          filterOnSelect(temp,skuData,"SKU")
          filterOnSelect(temp,diffData,"DIFF")
          filterOnSelect(temp,udaData,"UDA")
          filterOnSelect(temp,itemParentData,"IP")
          //console.log(temp);
     // }
    }else{
      setFltrH2([]);
      setFltrH3([]);
      setFltrSku([]);
      setFltrDiff([]);
      setFltrUDA([]);
      setFltrIPar([]);
      setCheckClass(false);
      setCheckSubClass(false);
      setValHIER1([]);
      setValHIER2([]);
     
      setMapData((prev) => {
        return {
          ...prev,
          HIER1 : [],
          HIER2 : [],
          HIER3 : [],
          UDA:[],
          UDA_VALUE : [],
          ITEM_PARENT : [],
          DIFF_ID : [],
          SKU : "",
          SKU_DESC:"",
          SKU_DIFF_ID:"",
        };
      });
    }
  }
  const selectedHIER2=(event,value)=>{
    let sel_HIER2 = [];
    let temp_Arr=[]
    if (value.option) {  
      valHIER2.push(value.option);
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

      if(valHIER2.length > 0){
        valHIER2.map(
          (item) => {
            temp_Arr.push(item.HIER2);
          }
        )
        var tempH2={}
        tempH2["HIER2"]=temp_Arr;
        
        filterOnSelect(tempH2,skuData,"SKU");
        filterOnSelect(tempH2,diffData,"SH2"); 
        filterOnSelect(tempH2,udaData,"UH1");
        filterOnSelect(tempH2,itemParentData,"IP");
        filterOnSelect(tempH2,fltrH3,"HIER3");


      }else{
        console.log(1234567)
        var tempH1={}
        tempH1["HIER1"]=[...mapData.HIER1];
        filterOnSelect(tempH1,hier3Data,"HIER3");
        filterOnSelect(tempH1,skuData,"SKU");
        filterOnSelect(tempH1,diffData,"SH2") ;
        filterOnSelect(tempH1,udaData,"UH1");
        filterOnSelect(tempH1,itemParentData,"IP")

      }
    }else if(value.action==="clear"){ 
      valHIER2.splice(0,valHIER2.length);
      var tempH1={}
      tempH1["HIER1"]=[...mapData.HIER1];
      filterOnSelect(tempH1,hier3Data,"HIER3");
      filterOnSelect(tempH1,skuData,"SKU");
      filterOnSelect(tempH1,diffData,"SH2");
      filterOnSelect(tempH1,udaData,"UH1");
      filterOnSelect(tempH1,itemParentData,"IP");
    }

    if(valHIER2.length > 0 && typeof valHIER2[0]['HIER2'] !== "undefined"){
      
      valHIER2.map(
        (item) => {
          sel_HIER2.push(item.HIER2);
        }
      )
      
        setCheckSubClass(true)
        var temp={}
          if(mapData.HIER1.length>0){
          temp["HIER1"]=[...mapData.HIER1];}
          temp["HIER2"]=sel_HIER2;
         var tempH2={}
         tempH2["HIER2"]=sel_HIER2;
         filterOnSelect(tempH2,hier3Data,"HIER3");
         filterOnSelect(tempH2,skuData,"SKU");
         filterOnSelect(tempH2,fltrDiff,"DIFF");
         filterOnSelect(tempH2,fltrUDA,"UDA");
         filterOnSelect(tempH2,fltrIPar,"IP");

          //console.log(temp);
      
      setMapData((prev) => {
        return {
          ...prev,
          HIER2 : sel_HIER2,
        };
      });
    }else{
      
      setCheckSubClass(false)
      setValHIER3([]);

      setMapData((prev) => {
        return {
          ...prev,
          HIER2 : [],
          HIER3 : [],
        };
      });
    }
  }
  const selectedHIER3=(event,value)=>{
    let sel_HIER3 = [];
    let temp_Arr=[]
    if (value.option) {  
      valHIER3.push(value.option);
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
      if(valHIER3.length > 0){
        console.log(76543)
        valHIER3.map(
          (item) => {
            temp_Arr.push(item.HIER3);
          }
        )
        var tempH3={}
        tempH3["HIER3"]=temp_Arr;
        filterOnSelect(tempH3,skuData,"SKU");
        filterOnSelect(tempH3,diffData,"SH2");
        filterOnSelect(tempH3,udaData,"UH1");
        filterOnSelect(tempH3,itemParentData,"IP");

      }else{
        console.log(1234567)
        var tempH2={}
        tempH2["HIER2"]=[...mapData.HIER2];
        filterOnSelect(tempH2,skuData,"SKU");
        filterOnSelect(tempH2,diffData,"SH2");
        filterOnSelect(tempH2,udaData,"UH1");
        filterOnSelect(tempH2,itemParentData,"IP");

      }


    }else if(value.action==="clear"){ 
      valHIER3.splice(0,valHIER3.length);
      var tempH2={}
          tempH2["HIER2"]=[...mapData.HIER2];
          filterOnSelect(tempH2,skuData,"SKU")
          filterOnSelect(tempH2,diffData,"SH2")
          filterOnSelect(tempH2,udaData,"UH1")
          filterOnSelect(tempH2,itemParentData,"IP");

    }

    if(valHIER3.length > 0 && typeof valHIER3[0]['HIER3'] !== "undefined"){
      valHIER3.map(
        (item) => {
          sel_HIER3.push(item.HIER3);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          HIER3 : sel_HIER3,
        };
      });
      if(valUDA.length===0){
        setCheckSubClass(true)
        var temp={}
          if(mapData.HIER1.length>0){
          temp["HIER1"]=[...mapData.HIER1];}
          if(mapData.HIER2.length>0){
            temp["HIER2"]=[...mapData.HIER2];}
          temp["HIER3"]=sel_HIER3;
         
          var tempH3={}
         tempH3["HIER3"]=sel_HIER3;
         filterOnSelect(tempH3,skuData,"SKU");
         filterOnSelect(tempH3,fltrDiff,"DIFF") 
         filterOnSelect(tempH3,fltrUDA,"UDA")
         filterOnSelect(tempH3,fltrIPar,"IP")

      }
    }else{
      setMapData((prev) => {
        return {
          ...prev,
          HIER3 : [],
        };
      });
    }
  }
  const selectedUDA=(event,value)=>{
    
    let sel_UDA = [];
    if (value.option) { 
      if(mapData.UDA.length===3){
        return( swal(
           <div>     
             <p>{"UDA limit is 3"}</p>
           </div>
         ))
       } 
      valUDA.push(value.option);
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
    }

    if(valUDA.length > 0 && typeof valUDA[0]['UDA'] !== "undefined"){

      const filterUDAVal = UniqUDA.filter((item) => {      
        return (valUDA).some((val) => {
          return item.UDA === val.UDA;
        });     
      }); 
      //console.log("filterUDAVal",filterUDAVal)
      setFilterUDAValue(filterUDAVal);
      valUDA.map(
        (item) => {
          sel_UDA.push(item.UDA);
        }
      )
      var temp={}
         temp["UDA"]=sel_UDA;
      
      setMapData((prev) => {
        return {
          ...prev,
          UDA : sel_UDA,
        };
      });
    }else {
      setFilterUDAValue([]);
      setMapData((prev) => {
        return {
          ...prev,
          UDA: [],
          UDA_VALUE:[],
        };
      });
    }
  }
  const selectedUDAValue=(event,value)=>{
    let sel_UDA_Val = [];
    if (value.option) {  
      valUDAValue.push(value.option);
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valUDAValue.length;i++)
      {
        if(valUDAValue[i]["UDA_VALUE"]===value.removedValue.UDA_VALUE){
          index=i;
          break;
        }
      }
      valUDAValue.splice(index,1);
    }else if(value.action==="clear"){ 
      valUDAValue.splice(0,valUDAValue.length);
    }

    if(valUDAValue.length > 0 && typeof valUDAValue[0]['UDA_VALUE'] !== "undefined"){
      valUDAValue.map(
        (item) => {
          sel_UDA_Val.push(item.UDA_VALUE);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          UDA_VALUE : sel_UDA_Val,
        };
      });
    }else{
      setMapData((prev) => {
        return {
          ...prev,
          UDA_VALUE : [],
        };
      });
    }
  }
  const selectedItemList=(event,value)=>{
    let sel_Item_list = [];
    if (value.option) {  
      valItemList.push(value.option);
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valItemList.length;i++)
      {
        if(valItemList[i]["ITEM_LIST_NO"]===value.removedValue.ITEM_LIST_NO){
          index=i;
          break;
        }
      }
      valItemList.splice(index,1);
    }else if(value.action==="clear"){ 
      valItemList.splice(0,valItemList.length);
    }

    if(valItemList.length > 0 && typeof valItemList[0]['ITEM_LIST_NO'] !== "undefined"){
      valItemList.map(
        (item) => {
          sel_Item_list.push(item.ITEM_LIST_NO);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO : sel_Item_list,
        };
      });
    }else{
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO : [],
        };
      });
    }
  }
  
  const selectedItemParent=(value)=>{
    console.log(value)
    if (value) { 
      var tempIT={};
      var temp_Arr=[];
      temp_Arr.push(value.ITEM_PARENT);
      tempIT["ITEM_PARENT"]=temp_Arr;

      filterOnSelect(tempIT,skuData,"SKU");
      filterOnSelect(tempIT,fltrDiff,"DIFF") ;
      filterOnSelect(tempIT,fltrUDA,"UDA")
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_PARENT : value.ITEM_PARENT,
        };
      });

    }else{
      var temp={}
        if(mapData.HIER3.length>0){
          temp["HIER3"]=[...mapData.HIER3];}
        else if(mapData.HIER2.length>0){
            temp["HIER2"]=[...mapData.HIER2];}
        else if(mapData.HIER1.length>0){
        temp["HIER1"]=[...mapData.HIER1];}

        filterOnSelect(temp,skuData,"SKU")
        filterOnSelect(temp,diffData,"ITEM_PARENT") 
        filterOnSelect(temp,udaData,"UH1")
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_PARENT : [],
        };
      });

    }
  }

  const selectedDiff=(value)=>{
    console.log(value)
    if( value){

      setMapData((prev) => {
        return {
          ...prev,
          DIFF_ID : value.DIFF_ID,
        };
      });

    }else{

      setMapData((prev) => {
        return {
          ...prev,
          DIFF_ID : [],
        };
      });
    }
  }

  const selectedSKU=(value)=>{
    console.log(value);
    if (value) { 
      var tempSku={}
      var temp_Arr=[]
      temp_Arr.push(value.SKU)
      tempSku["ITEM"]=temp_Arr;

      filterOnSelect(tempSku,fltrDiff,"DIFF");
      filterOnSelect(tempSku,fltrUDA,"UDA")
      setMapData((prev) => {
        return {
          ...prev,
          SKU : value.SKU,
          SKU_DESC:value.SKU_DESC,
          SKU_DIFF_ID: value.DIFF1,
        };
      });
    }else{
      var temp={}
      if(mapData.ITEM_PARENT.length>0){
        temp["ITEM_PARENT"]=[...mapData.ITEM_PARENT];}
        else if(mapData.HIER3.length>0){
          temp["HIER3"]=[...mapData.HIER3];}
        else if(mapData.HIER2.length>0){
            temp["HIER2"]=[...mapData.HIER2];}
        else if(mapData.HIER1.length>0){
        temp["HIER1"]=[...mapData.HIER1];} 
        filterOnSelect(temp,diffData,"DIFF") 
        filterOnSelect(temp,udaData,"UH1")
      setMapData((prev) => {
        return {
          ...prev,
          SKU : "",
          SKU_DESC:"",
          SKU_DIFF_ID:"",
        };
      });
    }
  }
  const selectedSizeProfile=(value)=>{
    if(value && value.value.length>0 ){
      setValSP(value.value)
      setMapData((prev) => {
        return {
          ...prev,
          SIZE_PROFILE : value.value,
        };
     });
   }else{
    setMapData((prev) => {
      return {
        ...prev,
        SIZE_PROFILE : "",
      };
   });
   }
  }
  const selectedWeight=(event)=>{ 
    console.log("weig",event.target.value)
    // setMapData((prev) => {
    //         return {
    //           ...prev,
    //           WEIGHT : event.target.value,
    //         };
    //       });
  if((event.target.value >0 && event.target.value <=100) || event.target.value===""){
      
      setMapData((prev) => {
        return {
          ...prev,
          WEIGHT : event.target.value,
        };
      });
    }else{
      swal(
        <div>     
          <p>{"Invalid WEIGHT% : "}{event.target.value}</p>

          {/* <p>{"should be between 0-100"}</p> */}
        </div>
      )  
    }
  }
  const selectedMapSizeProf=(event)=>{
    if(alloc_Level!=="T"){
    mapSizeprof?setMapSP(false):setMapSP(true)
    setMapData((prev) => {
        return {
          ...prev,
          MAP_SIZE_PROFILE : !mapSizeprof
        };
      });
    }
  }
 console.log("map",mapData)

  /*
                    #########################################
                  ***** Like Item Mapping Button Function *****
                    #########################################
  */
  const handleOK=()=>{
    if( mapTableData.length>0){
      var item= [];
      console.log(mapTableData)
      var sendData={ITEM:[],LIKE_ITEM:[]}
      mapTableData.map(obj => {
        item.push(obj.ITEM);
        sendData["ITEM"].push(obj.ITEM);
        sendData["LIKE_ITEM"]=obj.LIKE_ITEM
        sendData["LIKE_ITEM_DIFF_ID"]=obj.LIKE_ITEM_DIFF_ID
        sendData["LIKE_ITEM_WEIGHT"]=obj.LIKE_ITEM_WEIGHT
      });
      sendData["ALLOC_NO"]=allocNo.ALLOCATION_ID
      console.log(sendData)
     dispatch(postLIkeInsertRequest([sendData]));
     window.location.reload();
    }
   
  }
  const handleMap = () => {
    if (alloc_Level === "T") {
      if (mapData.SKU.length === 0) {
        swal(
          <div>
            <p>{"SKU Required* for Mapping"}</p>
          </div>
        );
        return;
      }
      if(selected.includes(mapData.SKU)){
        swal(
          <div>
            <p>{"SKU cannot be mapped to same SKU"}</p>
          </div>
        );
        return;
      }
      if(mapData.WEIGHT===""){
        swal(
          <div>
            <p>{"Invalid Weight %  "}</p>
          </div>
        );
        return;
      }
      const temp =[... tableData.filter(obj => selected.includes(obj.ITEM))];
      const deletedData= tableData.filter(obj => selected.includes(obj.ITEM));
      
      setDelTableData([...delTableData,...deletedData]);
      setTableData(tableData.filter(obj => !selected.includes(obj.ITEM)));
      var mappedData= [];
      // var
      // if( mappedData.DIFF_ID.length>0){

      // }
      temp.map(obj => {
        mappedData.push({...obj,
        LIKE_ITEM : mapData.SKU,
        LIKE_ITEM_DESC:mapData.SKU_DESC,
        LIKE_ITEM_DIFF_ID :mapData.DIFF_ID.length>0?mapData.DIFF_ID :mapData.SKU_DIFF_ID,
        LIKE_ITEM_WEIGHT : mapData.WEIGHT
        });
      });
      setMapTableData([...mapTableData,...mappedData]);
      setSelected([]);
      console.log(mappedData,tableData)
    }
  }
  const handleDelete = () => {
     //console.log("del ton",delTableData,selectedMap,[...tableData,...delTableData.filter(obj=>selectedMap.includes(obj.item))],"del",delTableData.filter(obj=>!selectedMap.includes(obj.item)));
      setDelTableData(delTableData.filter(obj=>!selectedMap.includes(obj.ITEM)));
      setTableData([...tableData,...delTableData.filter(obj=>selectedMap.includes(obj.ITEM))]);
      setMapTableData(mapTableData.filter(obj=>!selectedMap.includes(obj.ITEM)));
      setSelectedMap(selectedMap.filter(item=>!selectedMap.includes(item)));

  }
  const handleCancel= () =>{
    setTableData([]);
    setMapTableData([]);
    setDelTableData([]);
    selected([]);
    selectedMap([]);
    window.location.reload();
  }
  const handleRefresh=()=>{
    setCheckClass(false);
    setCheckSubClass(false)
    setValHIER1([]);
    setValHIER2([]);
    setValHIER3([]);
    setValUDA([]);
    setValUDAValue([]);
    setValItemList([]);
    setValItempar([]);
    setValSKU([]);
    setFilterUDAValue([]);
    setValSP("");
    setMapSP(false);
    setMapData(initialData);


    // Referesh Data
    dispatch(getHIERRequest([{}]));
    dispatch(getHIER2Request([{}]));
    dispatch(getHIER3Request([{}]));
    dispatch(getUDARequest([{}]));
    dispatch(getITEMPARENTRequest([{}]));
    dispatch(getDIFFRequest([{}]));
    dispatch(getSKURequest([{}]));
  }

  
  //const tableCount=[...Array(tableData.length).keys()]
  const LikeItem = useStyles();
 
  const Header=()=>(
    <Box 
        component="fieldset"
        display="inline-block"
        sx={{
            height:"auto",
            marginLeft:"5px",
            marginTop:"20px",
        backgroundColor:"#F5F5F5",
        borderRadius: 1,
        
        boxShadow: 2, border: 0,
        borderBottom:3,
        }}
        >
        <legend style={{fontWeight:"bold",color:"#191970",}}>Header</legend>        

            <div className={LikeItem.float_container}>
                <div>
                <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                Allocation ID</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.ALLOC_NO.toString()}`}
                getOptionValue={option => option.ALLOC_NO}
                options={allocID.length > 0 ? allocID : []}
                styles={styleSelect}
                components={animatedComponents} 
                maxMenuHeight={180}
                onChange={selectedAlloc}
                //value={hier1Data.filter(obj => mapData?.HIER1.includes(obj.HIER1))}
                isClearable={true} 
                />
                {/* <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  /> */}
                </div> </div> 
                {/* </div> 
               <div className={LikeItem.float_container}> */}
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Desc</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield} >
            <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0?allocHDtl[0].ALLOC_DESC:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div>  
                 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Context Type</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                {/* <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                value={allocHDtl.length>0?allocHDtl[0].CONTEXT:null}
                isDisabled={true}
                styles={styleSelect}
                components={animatedComponents}
                isClearable={true} 
                //isDisabled={!checkSubClass}
                /> */}
                <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0?allocHDtl[0].CONTEXT:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Promotion</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                {/* <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                
                styles={styleSelect}
                components={animatedComponents}
                isClearable={true} 
                //isDisabled={!checkSubClass}
                /> */}
                <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0 && allocHDtl[0].CONTEXT==="Promotion"?allocHDtl[0].PROMOTION:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Alloc Level</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                {/* <Select 
                  closeMenuOnSelect={true}
                  isSearchable={true}                
                  
                  styles={styleSelect}
                  components={animatedComponents}  
                  //isDisabled={}
                  isClearable={true} 
                />
                 */}
                 <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0 ?allocHDtl[0].ALLOC_LEVEL:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Release Date</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
            <TextField
                    size="small"
                    variant="outlined"
                    name="RELEASE_DATE"
                    type="date"
                    helperText=""
                    id="outlined-disabled"
                    label=""
                    defaultValue=""
                    value={allocHDtl.length>0 ?allocHDtl[0].RELEASE_DATE:null}
                    disabled={true}
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
          
                <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Status</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              {/* <Select 
                  closeMenuOnSelect={true}
                  isSearchable={true}                
                  
                  styles={styleSelect}
                  components={animatedComponents}  
                  //isDisabled={}
                  isClearable={true} 
                /> */}
                <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0 ?allocHDtl[0].STATUS:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Alloc Type</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
            {/* <Select 
                  closeMenuOnSelect={true}
                  isSearchable={true}                
                  
                  styles={styleSelect}
                  components={animatedComponents}  
                  //isDisabled={}
                  isClearable={true} 
                />
                 */}
                 <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    value={allocHDtl.length>0 ?allocHDtl[0].ALLOC_TYPE:null}
                    disabled={true}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
                <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Allocator</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
            <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    value={allocHDtl.length>0 ?allocHDtl[0].ALLOCATOR:null}
                    disabled={true}
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                  />
                </div> </div> 
    </Box>
  )
  /*
                    #########################################
                        ***** Like item Criteria*****
                    #########################################
  */
  
  const Like_Criteria=()=>(
    <Box 
        component="fieldset"
        display="inline-block"
        sx={{
            height:"auto",
            marginLeft:"5px",
            marginTop:"20px",
        backgroundColor:"#F5F5F5",
        borderRadius: 1,
        
        boxShadow: 2, border: 0,
        borderBottom:3,
        }}
        >
        <legend style={{fontWeight:"bold",color:"#191970",}}>Like Item Criteria</legend>        

            <div className={LikeItem.float_container}>
                <div>
                <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                Dept:</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
            <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                getOptionValue={option => option.HIER1}
                options={UniqDept.length > 0 ? UniqDept : []}
                styles={styleSelect}
                components={animatedComponents} 
                maxMenuHeight={180}
                onChange={selectedHIER1}
                value={hier1Data.filter(obj => mapData?.HIER1.includes(obj.HIER1))}  
                isMulti 
                isClearable={true} 
                />
                </div> </div> 
                {/* </div> 
               <div className={LikeItem.float_container}> */}
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Class:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield} >
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
                getOptionValue={option => option.HIER2}
                options={(UniqClass.length > 0) ? UniqClass : []}
                styles={styleSelect}
                components={animatedComponents}  
                maxMenuHeight={180} 
                onChange={selectedHIER2}
                value={hier2Data.filter(obj => mapData?.HIER2.includes(obj.HIER2))} 
                isMulti 
                isClearable={true} 
                isDisabled={mapData.HIER1.length===0}
                />
                </div> </div>  
                 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Subclass:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                getOptionValue={option => option.HIER3}
                options={(UniqSubClass.length > 0) ? UniqSubClass : []}
                styles={styleSelect}
                components={animatedComponents}
                onChange={selectedHIER3}  
                value={hier3Data.filter(obj => mapData?.HIER3.includes(obj.HIER3))} 
                isMulti 
                isClearable={true} 
                isDisabled={mapData.HIER2.length===0}
                maxMenuHeight={180} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                  closeMenuOnSelect={true}
                  isSearchable={true}                
                  getOptionLabel={option =>
                    `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
                  getOptionValue={option => option.UDA}
                  options={UniqUDA.length? UniqUDA : [] }
                  styles={styleSelect}
                  components={animatedComponents}  
                  onChange={selectedUDA}
                  value={udaData.filter(obj => mapData?.UDA.includes(obj.UDA))}  
                  isMulti 
                  isDisabled={mapData.HIER1.length===0}
                  isClearable={true} 
                  maxMenuHeight={180} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA Value:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
                getOptionValue={option => option.UDA_VALUE}
                options={filterUDAValue.length > 0 ? filterUDAValue : []}
                styles={styleSelect}
                components={animatedComponents} 
                onChange={selectedUDAValue} 
                value={udaData.filter(obj => mapData?.UDA_VALUE.includes(obj.UDA_VALUE))}  
                isMulti 
                maxMenuHeight={180} 
                isClearable={true}
                isDisabled={mapData.UDA.length===0}

                />
                </div> </div> 
          
                <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Item List:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
                getOptionValue={option => option.ITEM_LIST_NO}
                options={itemListHeadData.length > 0 ? itemListHeadData : []}
                styles={styleSelect}
                components={animatedComponents}
                onChange={selectedItemList} 
                value={itemListHeadData.filter(obj => mapData?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}  
                isMulti 
                maxMenuHeight={180} 
                isClearable={true} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Size Profile:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}
                getOptionLabel={option => `${option.value.toString()}`}
                getOptionValue={option => option.value}
                options={[{ value: 'YES'},{ value: 'NO'}]}
                styles={styleSelect}
                components={animatedComponents}  
                onChange={selectedSizeProfile} 
                value={[{ value: 'YES'},{ value: 'NO'}].filter(obj => mapData?.SIZE_PROFILE.includes(obj.value))}
                isClearable={true} 
                isDisabled={alloc_Level==="T"}
                maxMenuHeight={180} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Item Parent:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>`${option.ITEM_PARENT.toString()}`}
                getOptionValue={option => option.ITEM_PARENT}
                options={(UniqItemParent.length > 0) ? UniqItemParent : []}
                styles={styleSelect}
                components={animatedComponents}  
                onChange={selectedItemParent}  
                value={UniqItemParent.filter(obj => mapData?.ITEM_PARENT.includes(obj.ITEM_PARENT))}   
                //isMulti 
                isDisabled={mapData.HIER1.length===0}
                isClearable={true} 
                maxMenuHeight={180} 
                />
                </div> </div>
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Diff ID:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.DIFF_ID.toString()}`}
                getOptionValue={option => option.DIFF_ID}
                //options={diffData.length > 0 ? diffData : []}\
                options={UniqDiff.length > 0 ? UniqDiff : []}
                styles={styleSelect}
                components={animatedComponents} 
                onChange={selectedDiff}    
                value={diffData.filter(obj => mapData?.DIFF_ID.includes(obj.DIFF_ID))}  
                //isMulti 
                isClearable={true} 
                isDisabled={mapData.HIER1.length===0}
                maxMenuHeight={180} 
                />
                </div> </div>  
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Sku:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                getOptionLabel={option =>
                  `${option.SKU.toString()}`}
                getOptionValue={option => option.SKU}
                //options={ fltrSku.length>0?fltrSku: skuData.length > 0 ? skuData : []}
                options={fltrSku.length>0?fltrSku:[]}
                styles={styleSelect}
                components={animatedComponents} 
                maxMenuHeight={180} 
                onChange={selectedSKU}    
                value={skuData.filter(obj => mapData?.SKU.includes(obj.SKU))}  
                //isMulti 
                isDisabled={mapData.HIER1.length===0}
                isClearable={true} 
                />
                </div> </div>   
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            # of Skus:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{"& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor:"#f0f0f0",border:0
                    },backgroundColor:"white"}}
                    InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                    InputProps={{
                    style:{fontSize:12},
                    className: LikeItem.inputField,
                    }}
                    disabled={alloc_Level==="T"}
                  />
                </div> </div>   
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            Weight %:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
            <TextField
                size="small"
                variant="outlined"
                name="ESID_FROM"
                helperText=""
                sx={{"& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor:"#f0f0f0",border:0
                },backgroundColor:"white"}}
                onChange={selectedWeight}
                //value={searchData.ESID_FROM}
                id="outlined-disabled"
                value={mapData.WEIGHT}  
                InputLabelProps={{style: {fontSize: "12px"},shrink:"true"}}
                InputProps={{
                style:{fontSize:12},
                className: LikeItem.inputField,
                }}
                //disabled={valPO.length > 0 ?false:true}
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div className={LikeItem.multiselectfield}>
                
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline' }}>
            Map Size Profile:</InputLabel>
            
                <FormControlLabel
                sx={{margin:"2px 0px 0px 0px",//backgroundColor:"#F0FFFF" 
            }}
                
                control={
                  
                  <Switch checked={mapSizeprof} onChange={selectedMapSizeProf}  name="jason" />} 
                
                //onChange={selectedMapSizeProf}
                /></div></div>
    <Box 
        component="fieldset"
        display="inline-block"
        justifyContent="flex-end"
        sx={{height:"fit-content", width:"auto",border: 0,}}
        >
            {/* <Grid container justify="flex-end"> */}
    {/* <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2,border:0 }}> */}
    <Button sx={{backgroundColor:"",fontSize:"12px" ,height:"38"}}
           variant="contained"
           //className={CreateAllocationClasses.textField}
           type="submit"
           onClick={handleMap}
           >
            Map</Button> 
    <Button sx={{backgroundColor:"#B22202",'&:hover': {
                backgroundColor: "#B22202",
            },fontSize:"12px", margin: "0rem 2.7rem",}}
           variant="contained"
           className={LikeItem.textField}
           type="submit"
           onClick={handleRefresh}
           startIcon={<RefreshIcon/>}
           >
            Refresh</Button>
        {/* </Paper> */}
        {/* </Grid> */}
    </Box>
            
    <Box 
        component="fieldset"
        display="flex"
        sx={{height:"auto", marginTop:"15px",width:"auto",border: 0,}}
        >
    {/* <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2,border:0 }}> */}
    <Button sx={{backgroundColor:"green",'&:hover': {
                backgroundColor: "#228B22",textShadow:"0 0 #000"},fontSize:"12px" ,margin: "0rem -0.6rem",height:"38"}}
           variant="contained"
           //className={CreateAllocationClasses.textField}
           type="submit"
           onClick={handleOK}
           startIcon={<DoneAllIcon/>}
           >
            OK</Button> 
    <Button sx={{backgroundColor:"maroon",'&:hover': {
                backgroundColor: "maroon",boxShadow:3},fontSize:"12px", margin: "0rem 2.7rem",height:"38"}}
           variant="contained"
           className={LikeItem.textField}
           type="submit"
           onClick={handleCancel}
           startIcon={<CancelIcon/>}
           >
            Cancel</Button>
        {/* </Paper> */}
    </Box>
    </Box>
    )

    /* 
                    ########################################
                      ### CheckBoc selection Handling ###
                    ########################################
  */
  const handleSelectAllClick = (event) => {
    //console.log("event::",event)
    if (event.target.checked && selected.length === 0) {
      const newSelected = tableData.map((n) => n.ITEM);
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

  const handleMapSelectAllClick = (event) => {
    //console.log("event::",event)
    if (event.target.checked && selectedMap.length === 0) {
      const newSelected = mapTableData.map((n) => n.ITEM);
      setSelectedMap(newSelected);
      return;
    }
    setSelectedMap([]);
  };
  const handleMapClick = (event, name) => {
    console.log("han map", selectedMap, name)
    const selectedIndex = selectedMap.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMap, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMap.slice(1));
    } else if (selectedIndex === selectedMap.length - 1) {
      newSelected = newSelected.concat(selectedMap.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMap.slice(0, selectedIndex),
        selectedMap.slice(selectedIndex + 1),
      );
    }

    setSelectedMap(newSelected);
  };
  const isMapSelected = (name) => selectedMap.indexOf(name) !== -1;
  
/* 
                    ########################################
                       ### Allocated item grid header ###
                    ########################################
  */
  function Alloc_Grid(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead className={LikeItem.TitleHead}>
        <TableRow role="checkbox" sx={{backgroundColor:"#6495ED",height:"15px"}}>
          <TableCell padding="checkbox" style={{
                  whiteSpace: "nowrap", 
                }} 
            >
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < tableData.length}
              checked={tableData.length > 0 && selected.length === tableData.length}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{transform: "scale(0.8)",}}
            />
          </TableCell>
          {alloc_head.map((headCell)=>(
          <TableCell sx={{textTransform:"uppercase",fontWeight:"bold",fontFamily:"system-ui",textAlign:"left",fontSize:"75%",color:"white",padding:0}}
          key={headCell}
          sortDirection={orderBy === headCell.id ? order : false}
            >
            {/* {headcell} */}
            <TableSortLabel
                active={orderBy === headCell}
                direction={orderBy === headCell ? order : 'asc'}
                onClick={createSortHandler(headCell)}
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
                {headCell}
                {orderBy === headCell ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            
            </TableCell>))}
            {/* <TableCell align="right" sx={{textTransform:"uppercase",fontWeight:"bold",fontFamily:"system-ui",textAlign:"left",fontSize:"75%",color:"white",padding:0}}>
              ITEM&nbsp;DESC</TableCell>
            <TableCell align="right" sx={{textTransform:"uppercase",fontWeight:"bold",fontFamily:"system-ui",textAlign:"left",fontSize:"75%",color:"white",padding:0}}>
              ,</TableCell>
            <TableCell align="right" sx={{textTransform:"uppercase",fontWeight:"bold",fontFamily:"system-ui",textAlign:"left",fontSize:"75%",color:"white",padding:0}} >
              #OF&nbsp;SKUS</TableCell> */}
        
        </TableRow>
      </TableHead> 
       );
  }  
  Alloc_Grid.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
          sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(tableData.length > 0 &&
              {
                  minHeight: {
                      minHeight: "40px !important",
                  },
                  // border:"2px solid black", 
                  bgcolor: (theme) =>
                      alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                      ),
              }),
          }}
      >
          {tableData.length > 0 && (
              <Typography
                  sx={{
                      flex: "1 1 100%", display: "flex",
                      justifyContent: "flex-end",
                      padding:"0px 20px 0px 0px"
                  }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
              >
                  Rows {selected.length} of {tableData.length}
              </Typography>
          )}
      </Toolbar>
  );
  }
/* 
                    ########################################
                        ### Mapped item grid header ###
                    ########################################
  */
  function Mapped_Grid(props) {
    const { onSelectMapAllClick, orderM, orderMBy, numMapSelected, rowCountM, onRequestMapSort} =
      props;
    const createSortMapHandler = (property) => (event) => {
      onRequestMapSort(event, property);
    };
  
    return (
      <TableHead className={LikeItem.TitleHead}>
        <TableRow role="checkbox" sx={{backgroundColor:"#6495ED",height:"15px"}}>
          <TableCell padding="checkbox" style={{
                  whiteSpace: "nowrap", 
                }} 
            >
            <Checkbox
              color="primary"
              indeterminate={selectedMap.length > 0 && selectedMap.length < mapTableData.length}
              checked={mapTableData.length > 0 && selectedMap.length === mapTableData.length}
              onChange={onSelectMapAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{transform: "scale(0.8)",}}
            />
          </TableCell>
          {map_head.map((headCell)=>(
          <TableCell sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
            key={headCell}
            sortDirection={orderMBy === headCell ? orderM : false}
          >
             <TableSortLabel
                active={orderMBy === headCell}
                direction={orderMBy === headCell ? orderM : 'asc'}
                onClick={createSortMapHandler(headCell)}
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
                {headCell}
                {orderMBy === headCell ? (
                  <Box component="span" sx={visuallyHidden}>
                    {orderM === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>))}
          {/* <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
            ITEM&nbsp;DESC</TableCell>
          <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
            DIFF&nbsp;ID</TableCell>
          <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
            LIKE&nbsp;ITEM</TableCell>
          <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
            LIKE&nbsp;ITEM&nbsp;DESC</TableCell>
          <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
            LIKE&nbsp;ITEM&nbsp;DIFF&nbsp;ID</TableCell>
          <TableCell align="right" sx={{ color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
            WEIGHT&nbsp;%</TableCell> */}
          <TableCell align="right" sx={{
            color: "white", textTransform: "uppercase", fontWeight: "bold", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0,
          }} >
            MAP_SIZE_PR</TableCell>
        
        </TableRow>
      </TableHead> 
       );
  }  
  Mapped_Grid.propTypes = {
    numMapSelected: PropTypes.number.isRequired,
    onRequestMapSort: PropTypes.func.isRequired,
    onSelectMapAllClick: PropTypes.func.isRequired,
    orderM: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderMBy: PropTypes.string.isRequired,
    rowCountM: PropTypes.number.isRequired,
  };
  function EnhancedTableToolbarMap(props) {
    const { numMapSelected } = props;

    return (
      <Toolbar
          sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(mapTableData.length > 0 &&
              {
                  minHeight: {
                      minHeight: "40px !important",
                  },
                  // border:"2px solid black", 
                  bgcolor: (theme) =>
                      alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                      ),
              }),
          }}
      >
          {mapTableData.length > 0 && (
              <Typography
                  sx={{
                      flex: "1 1 100%", display: "flex",
                      justifyContent: "flex-end",
                      padding:"0px 20px 0px 0px"
                  }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
              >
                  Rows {selectedMap.length} of {mapTableData.length}
              </Typography>
          )}
      </Toolbar>
  );
  }
  /*
                    ########################################
                          ####### Sorting #######
                    ########################################
  */
  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "ITEM") {
      c = (b[orderBy]);
      d = (a[orderBy]);
    } else {
      c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
      d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
    }
    if (c === "NULL" || d === "NULL") {
      if (c === "NULL" && d !== "NULL") {
        return -1
      }
      else if (d === "NULL" && c !== "NULL") {
        return 1
      }
      else {
        return 1
      }
    }
    else {
      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    if(orderBy==="#OF_SKUS"){
      return order === 'desc'
      ? (a, b) => descendingComparator(a, b, "SKU_COUNT")
      : (a, b) => -descendingComparator(a, b, "SKU_COUNT");
    }
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestMapSort = (event, property) => {
    //console.log("handleRequestSort",property)
    const isAsc = (orderMBy === property && orderM === 'asc');
    setOrderM(isAsc ? 'desc' : 'asc');
    setOrderMBy(property);
  };
  const handleRequestSort = (event, property) => {
    //console.log("handleRequestSort",property)
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  function stableSort(array, comparator) {
    //console.log("sort",array,comparator)
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
     
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    //console.log("stabilizedThis",stabilizedThis.map((el) => el[0]))
    return stabilizedThis.map((el) => el[0]);
  }
  function stableMapSort(array, comparator) {
    //console.log("sort",array,comparator)
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
     
      const orderM = comparator(a[0], b[0]);
      if (orderM !== 0) {
        return orderM;
      }
      return a[1] - b[1];
    });
    //console.log("stabilizedThis",stabilizedThis.map((el) => el[0]))
    return stabilizedThis.map((el) => el[0]);
  }
 
  return(
    <Box sx={{
        marginTop:"50px",
        }}>
        {/* <Box component="fieldset"
            display="flex"
            sx={{
                marginLeft:"5px",
                marginTop:"150px",
                backgroundColor:"#F5F5F5",
                borderRadius: 1,
                boxShadow: 2, border: 0,
                borderBottom:3,}}>
                    <legend style={{fontWeight:"bold",color:"#191970",}}>Header </legend>
            <div sx={{display: "flex",flexDirection:"row"}}>
            <Grid id="top-row" container spacing={0}>
                <div className={LikeItem.course_box}>
                {SearchHeader()}
                </div>               
            </Grid>
            </div>
        </Box > */}
        <div sx={{display: "flex",flexDirection:"row"}}>
            <Grid id="top-row" container spacing={0}>
                <div className={LikeItem.course_box}>
                    {Header()}
                </div>               
            </Grid>
        </div>
        
        <div sx={{display: "flex",flexDirection:"row"}}>
              <Grid id="top-row" container spacing={0}>
                  <div className={LikeItem.course_box}>
                      {Like_Criteria()}
                  </div>               
              </Grid>
        </div>
        <Box component="fieldset"
              display="flex"
              sx={{
                  marginLeft:"5px",
                  marginTop:"20px",
                  backgroundColor:"#F5F5F5",
                  borderRadius: 1,
                  boxShadow: 2, border: 0,
                  borderBottom:3,
                  //backgroundColor:"blue"
                  }}>
            <Box  display="grid" sx={{width:"100%"}} 
                gridTemplateColumns="repeat(14, 3fr)" gap={1}
                >
                <Box gridColumn="span 5" //sx={{backgroundColor:"goldenrod",height:"100%"}}
                >
                    <legend style={{fontWeight:"bold",color:"#191970",}}>Allocated&nbsp;Items </legend>  
                    <Paper sx={{  maxHeight: "20%",mb: 7 }}>
                      
                      <TableContainer sx={{height: "fit-content", maxHeight: "39vh",
                                    borderRadius: '10px' }} component={Paper}>
                        <Table sx={{ minWidth:"auto" }} aria-label="customized table">
                            <Alloc_Grid
                              numSelected={selected.length}
                              onSelectAllClick={handleSelectAllClick}
                              rowCount={tableData.length}
                              onRequestSort={handleRequestSort}
                              order={order}
                              orderBy={orderBy}
                              />
                            <TableBody >
                                {tableData.length > 0 ?
                                  stableSort(tableData, getComparator(order, orderBy))
                                  .map((row, index) => {
                                      const isItemSelected = isSelected(row.ITEM);
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      return (
                                        <TableRow 
                                          hover
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.ITEM}
                                          selected={isItemSelected}
                                          >
                                            <TableCell padding="checkbox">
                                            <Checkbox
                                              onClick={(event) => handleClick(event, row?.ITEM)}
                                              color="primary"
                                              checked={isItemSelected}
                                              inputProps={{
                                              'aria-labelledby': labelId,
                                              }}
                                              style={{transform: "scale(0.8)",}}
                                            />
                                            </TableCell>
                                        
                                            <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}>{row.ITEM}</TableCell>
                                            <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0,width:"130px"}}>
                                                <Box   
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    sx={{border:0,}}>
                                                    <p>{String(row.ITEM_DESC).length>0 && String(row.ITEM_DESC).length<5?
                                                        row.ITEM_DESC
                                                        :String(row.ITEM_DESC).substring(0,10)+"..."}</p>
                                                    <Button sx={{backgroundColor:"",'&:hover': {
                                                            backgroundColor: "",},border:0,color:"CadetBlue"}}
                                                            style={{maxWidth: '25px', minWidth: '25px',justifyContent:"flex-start"
                                                          }}
                                                            size='small'
                                                            className={LikeItem.textField}
                                                            onClick={()=>{swal(
                                                              <div>     
                                                                <p>{row.ITEM_DESC}</p>
                                                              </div>
                                                            )}}
                                                            startIcon={<InfoIcon/>}
                                                            >
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}} >{row.DIFF_ID}</TableCell>
                                            <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}} textAlign="right">
                                                    <Box   
                                                      display="flex"
                                                      justifyContent="space-between"
                                                      sx={{border:0,}}>
                                                      <p>{row.SKU_COUNT}</p>
                                                      <Button sx={{backgroundColor:"",'&:hover': {
                                                              backgroundColor: "",},border:0,color:"CadetBlue"}}
                                                              style={{maxWidth: '25px', minWidth: '25px',justifyContent:"flex-start"
                                                            }}
                                                              size='small'
                                                              className={LikeItem.textField}
                                                              onClick={()=>{swal(
                                                                <div>     
                                                                  <p>{row.SKU_COUNT}</p>
                                                                </div>
                                                              )}}
                                                              startIcon={<InfoIcon/>}
                                                              >
                                                      </Button>
                                                    </Box>
                                            </TableCell>
                                        </TableRow >
                                      );
                                    })
                                  :false
                                }
                                {tableData.length<5?
                                  [...Array(5-(tableData.length)).keys()].map(val=>(
                                      <StyledTableRow > 
                                      <TableCell padding="checkbox"> <Checkbox color="primary" disabled={true} style={{transform: "scale(0.8)",}}/></TableCell>
                                      <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}></TableCell>
                                      <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}></TableCell>
                                      <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}} ></TableCell>
                                      <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}} textAlign="right"></TableCell>
                                      </StyledTableRow>
                                  )):false
                                }
                            </TableBody>
                        </Table>
                      </TableContainer>
                      {selected.length>0?<EnhancedTableToolbar numSelected={selected.length} />:false}
                    </Paper>
                </Box>

                <Box gridColumn="span 9">
                    <legend style={{fontWeight:"bold",color:"#191970",}}>Mapped&nbsp;Items </legend>
                    <Paper sx={{ maxHeight: "20%", mb: 7}}>
                        {/* <EnhancedTableToolbarMap numMapSelected={selectedMap.length} /> */}
                        <TableContainer sx={{ height: "fit-content", maxHeight: "39vh",borderRadius: '10px' ,}} component={Paper}>
                          <Table sx={{ minWidth:"auto",}} aria-label="customized table">
                            <Mapped_Grid
                              numMapSelected={selectedMap.length}
                              onSelectMapAllClick={handleMapSelectAllClick}
                              rowCountM={mapTableData.length}
                              onRequestMapSort={handleRequestMapSort}
                              />
                            <TableBody >
                            {mapTableData.length>0?
                              stableMapSort(mapTableData, getComparator(orderM, orderMBy))
                              .map((row, index) => {
                                const isItemSelected = isMapSelected(row.ITEM);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                  <TableRow 
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    //sx={{backgroundColor:"green",border:"5px solid black"}}
                                    tabIndex={-1}
                                    key={row.ITEM}
                                    selected={isItemSelected}
                                    >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        onClick={(event) => handleMapClick(event, row?.ITEM)}
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                        'aria-labelledby': labelId,
                                        }}
                                        style={{transform: "scale(0.8)",}}
                                      />
                                    </TableCell>
                                    <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}>{row.ITEM}</TableCell>
                                    <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        sx={{ border: 0, }}>
                                        <p>{String(row.ITEM_DESC).length > 0 && String(row.ITEM_DESC).length < 5 ?
                                          row.ITEM_DESC
                                          : String(row.ITEM_DESC).substring(0, 7) + "..."}</p>
                                        <Button sx={{
                                          backgroundColor: "", '&:hover': {
                                            backgroundColor: "",
                                          }, border: 0, color: "CadetBlue"
                                          }}
                                          style={{
                                            maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                          }}
                                          size='small'
                                          className={LikeItem.textField}
                                          onClick={() => {
                                            swal(
                                              <div>
                                                <p>{row.ITEM_DESC}</p>
                                              </div>
                                            )
                                          }}
                                          startIcon={<InfoIcon />}
                                        >
                                        </Button>
                                      </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>{row.DIFF_ID}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>{row.LIKE_ITEM}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
                                      <Box
                                          display="flex"
                                          justifyContent="space-between"
                                          sx={{ border: 0, }}>
                                          <p>{String(row.LIKE_ITEM_DESC).length > 0 && String(row.LIKE_ITEM_DESC).length < 5 ?
                                            row.LIKE_ITEM_DESC
                                            : String(row.LIKE_ITEM_DESC).substring(0, 10) + "..."}</p>
                                          <Button sx={{
                                            backgroundColor: "", '&:hover': {
                                              backgroundColor: "",
                                            }, border: 0, color: "CadetBlue"
                                          }}
                                            style={{
                                              maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                            }}
                                            size='small'
                                            className={LikeItem.textField}
                                            onClick={() => {
                                              swal(
                                                <div>
                                                  <p>{row.LIKE_ITEM_DESC}</p>
                                                </div>
                                              )
                                            }}
                                            startIcon={<InfoIcon />}
                                          >
                                          </Button>
                                      </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>{row.LIKE_ITEM_DIFF_ID}</TableCell>
                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>{row.LIKE_ITEM_WEIGHT}</TableCell>
                                    <TableCell padding="checkbox"> <Checkbox color="primary" disabled={alloc_Level==="T"} style={{ transform: "scale(0.8)",}}/></TableCell>
                                  </TableRow>
                                );}) 
                              :null
                            }
                            {mapTableData.length<5?
                              [...Array(5-(mapTableData.length)).keys()]
                              .map(val=>(
                              <TableRow>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    disabled={true}
                                    style={{transform: "scale(0.8)",}}
                                  />
                                </TableCell>
                                <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}></TableCell>
                                <TableCell align="right" sx={{fontFamily:"system-ui",textAlign:"left",fontSize:"75%",padding:0}}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                <TableCell padding="checkbox"> <Checkbox color="primary" disabled={true} style={{transform: "scale(0.8)", }}/></TableCell>
                              </TableRow>
                              )):false
                            }
                          </TableBody>
                          </Table>
                        </TableContainer>
                        {selectedMap.length>0?<EnhancedTableToolbarMap numMapSelected={selectedMap.length} />:false}
                    </Paper>                
                 </Box>
                <Box   
                    display="flex"
                    gridColumn="span 13"
                    //alignItems="self-end"
                    justifyContent="right"
                    sx={{border:0}}>
                    <Button sx={{backgroundColor:"maroon",'&:hover': {
                        backgroundColor: "maroon",boxShadow:3},borderRadius: '16px'}}
                        variant="contained"
                        size='medium'
                        className={LikeItem.textField}
                        type="submit"
                        onClick={handleDelete}
                        startIcon={<DeleteSweepIcon/>}
                     />
                 </Box> 
             </Box>
            
        
        </Box>
        
      
    </Box>
  )

}
export default LikeItemMap;