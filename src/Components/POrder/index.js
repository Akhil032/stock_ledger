import React, {useState} from 'react';
import ReactDOM from "react-dom/client";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { makeStyles,withStyles } from "@mui/styles";
import {Table, TableBody, TableContainer, TableCell,Paper,TableRow,TableHead} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios'
import swal from '@sweetalert/with-react';
import { FitScreen } from '@mui/icons-material';


const TableHeaderCell = withStyles((theme) => ({
  root: {
    color: "white"
  }
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
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
  GobackDiv: {
      cursor: "pointer",
  },
  textField: {
      marginRight: "10px !important",
  },
  dateField: {
      '& .MuiInput-input': {
          color: "rgba(102,102,102,1)",
      }

  },
});


const POrder=()=> {
  const PO = useStyles();
  const [tokenData, settokenData] = useState("");
  const[orderNo,setOrderNo]=useState({}); 
  const[POData,setPOData]=useState({});
  const[dTable,setDTable]=useState([]);
  const[valid,setValid]=useState(false);
  const PO_Filter={
    ordHdr:["orderNo","orderRefNo","vndNumericDesc","vendName","division","currencyCode","terms","termsCode","termsDesc","termsDueDays","termsPercent","termsType","ediPOInd","ediSentInd","userID","lastUpdateId","lastUpdateDate"]
    ,ordHdrLegacy:["poOriginNbr","poOriginDesc","ediSentDate","earliestInStrDate","latestInStrDate","expectedQty","inprocessQty","buyIntentNbr","buyIntentDesc","committedFlag"]
    ,ordSku:["lineNo","revNo","dept","deptDesc","itemParent","pidDesc","item","skuUPCNo","unitCost","unitCurr","createTimestamp","createUserid","lastUpdTimestamp","lastUpdUserid","ordrQty"]
    ,ordSkuLegacy:["zlClrCode","zlSizeCode","zlClrDesc","zlSizeDesc","vendStyle","buyVStyle","publTimestamp","expectedQty","inprocessQty","bookedQty"]
    ,ordLoc:["location","locType","unitOrig","unitCost","bookedQty","qtyOrdered","qtyCancelled","cancelCode","cancelDate","comments"]
    }
  const PO_TableName={ordHdr:"ORDER HEADER ATTRIBUTES",ordHdrLegacy:"ORDER HEADER LEGACY ATTRIBUTES",ordSku:"ORDER SKU ATTRIBUTES",ordSkuLegacy:"ORDER SKU LEGACY ATTRIBUTES",ordLoc:"ORDER LOC ATTRIBUTES"}
  function HandleRes(data){
    const tableData=dynamic_res(data[Object.keys(data)[0]]);
    if(tableData.length===1 && typeof tableData[0]==="object"){//&& (Object.keys(tableData[0]))[0]==="errorMessage"){
      setValid(true);
      setDTable([]);
      swal(
        <div>     
          <p>Order number: {Object.values(orderNo)[0]} does not exist</p>
          {/* <p>{tableData[0][(Object.keys(tableData[0]))[0]]}</p> */}
        </div>
      )  
    }else{
      const filtered_table_data={}
      console.log(tableData)
      Object.keys(PO_Filter).map((key)=>{
        const filter_col=Object.values(PO_Filter[key]);
        var temp={};
        if((Object.keys(tableData)).includes(key)){
          //checks for capital letters in camelcase string
          function startsWithCapital(word,inputKey,count){            
            if( word.charAt(0) === word.charAt(0).toUpperCase()){
             return inputKey.indexOf(word,count);              
            }
            return -1;
          }
          for(let i=0;i<Object.keys(tableData[key]).length;i++){
            //Column conversion from camel case and Preparing Data to Add into Table data
            if(filter_col.includes((Object.keys(tableData[key]))[i])){
              var altered_Key=(Object.keys(tableData[key]))[i];
              for(let ind=0;ind<((Object.keys(tableData[key]))[i].split("")).length;ind++){
                const indexNo=startsWithCapital((((Object.keys(tableData[key]))[i])[ind]),altered_Key,ind)
                if(indexNo!==-1){
                  altered_Key=altered_Key.slice(0,indexNo)+" "+altered_Key.slice(indexNo+1-1);
                } 
              }
              temp[altered_Key]= tableData[key][(Object.keys(tableData[key]))[i]];
            }          
          }         
          const temp_key=key
          //Each letter check TABLE NAME
          for(let ind=0;ind<(temp_key.split("")).length;ind++){
            const indexNo=startsWithCapital(temp_key[ind],key)
            if(indexNo!==-1){
              key=key.slice(0,indexNo)+" "+key.slice(indexNo+1-1)
            } 
          }
          if(key.includes(" Hdr",0)){
            key=key.replace("Hdr","Header")
          }
          if(key.includes("ord ",0)){
            key=key.replace("ord","order")
          }
          if(key.includes(" Loc",0)){
            key=key.replace("Loc","Location")
          }
          key=key.concat(" ATTRIBUTES")
          
          Object.assign(filtered_table_data,{[key]:temp});
          temp={};
        }
      })
      //Adding to Table Data for Display 
      if(Object.keys(filtered_table_data).length>0){
        setDTable(filtered_table_data);}
    }
  }
  //Converting Response received Dynamically
  const dynamic_res=(data)=>{
    const sub_obj={};
    const delete_arr=[];
    var repeat=0;
    for(let i=0;i<Object.keys(data).length;i++){
      if(typeof data[(Object.keys(data))[i]] ==="object" && data[(Object.keys(data))[i]] !== null && !Array.isArray(data[(Object.keys(data))[i]])){
        const item=data[(Object.keys(data))[i]];
        for(let j=0;j<Object.keys(item).length;j++){        
          if(typeof item[(Object.keys(item))[j]] ==="object" && item[(Object.keys(item))[j]] !== null)
          {  
            Object.assign(sub_obj,{[(Object.keys(item))[j]]:item[(Object.keys(item))[j]]});
            delete data[(Object.keys(data))[i]][(Object.keys(item))[j]];
            j=j-1;
          }
        }
      }else{
        if(typeof data[(Object.keys(data))[i]] ==="object" && data[(Object.keys(data))[i]] !== null && Array.isArray(data[(Object.keys(data))[i]])){
          delete_arr.push((Object.keys(data))[i]);
          for(let k=0;k<data[(Object.keys(data))[i]].length;k++){
            const temp=data[(Object.keys(data))[i]][k];
            if(typeof temp ==="object" && temp !== null && !Array.isArray(temp)){
              for(let n=0;n<Object.keys(temp).length;n++){
                Object.assign(sub_obj,{[Object.keys(temp)[n]]:temp[Object.keys(temp)[n]]});
              }
            }        
          }
        }      
      }
      }
    if(Object.keys(sub_obj).length>0){
      (Object.keys(sub_obj)).map(key=>{
        Object.assign(data,{[key]:sub_obj[key]});
      });
      repeat=1;
    }
    if(delete_arr.length>0){
      delete_arr.map(del=>{delete data[del]});}
    if(repeat===1){
      dynamic_res(data);
    }
    (Object.keys(data)).map(obj=>{ if(Object.keys(data[obj]).length ===0){delete data[obj]; }})
    //console.log("response",data)
    return data;
  }
  //Input PO number
  const handlePO = (data) => {
    setOrderNo({[data.target.name]: data.target.value});
  }
  //Requesting PO Details response from API
  const sendRequest=(RToken)=>{
    if(!isNaN(orderNo.poNumber)){ 
    const api="https://oicperf901-axwlvczjvscx-ia.integration.ocp.oraclecloud.com:443/ic/api/integration/v1/flows/rest/PUBLISHPURCHASEORDERDETAILS/1.0/processPOModel"
            const token=RToken
            const bodyParameters={requestType: "SinglePO",
            excludeLines: "false",
            excludeLocation: "false"
            }
            Object.assign(bodyParameters,orderNo);
            const config = {
              headers: { "Authorization": `Bearer ${token}`,"Accept": "application/json"
              ,"Content-Type": "application/json"} 
            };
            axios.post( 
              api,
              bodyParameters,
              config
            ).then(res => {
              setPOData(res.data)
              HandleRes(res.data)
            })
              .catch((error) => {
                console.log("API",error)
              });
     }else{
      setValid(true);
      setDTable([]);
      swal(
        <div>     
          <p>Order number: {Object.values(orderNo)[0]} does not exist</p>         
        </div>
      ) 
    }
  }
  //Handling submit and Requesting Token for Authorization
  const handleSubmit = () => {
    setDTable([]);
    Object.keys(orderNo).length>0?setValid(false):setValid(true);
    if( Object.keys(orderNo).length>0)
      {
        const req=axios.post("https://idcs-e853700300e64ec68bbfe6bc66bfa64d.identity.oraclecloud.com/oauth2/v1/token",
        'grant_type=client_credentials&scope=https://530B7C4704E6448EA5BC5E6420D4FD56.integration.ocp.oraclecloud.com:443urn:opc:resource:consumer::all&client_id=7b81dbf2c6f84d16b816d6819838035c&client_secret=0391070b-bef9-473b-8920-8b0533171da0'
        )
        .then(function(res) {
          if(res.data.access_token){          
            sendRequest(res.data.access_token)
          }
        })
        .catch(error => {
          console.log("Auth_token",error)
        });
      }
    };
  return(
    <Box >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={PO.boxDiv}>
            <div className={PO.uploaddiv}>
              <h4>PO ENQUIRY</h4>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Box 
  //      component="fieldset"
  //      display="inline-block"
  //      sx={{
  //       '& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"},
  //          height:"20VH",
  //          marginLeft:"5px",
  //      width:"100%",
  // // backgroundColor:"red",
  //      //borderRadius: 1,
       
  //      border: 0,
  //      borderBottom:2,
      // }}
      sx={{'& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"},height:"100px" }}
      >
     
        <TextField
          id="PO"
          name="poNumber"
          label="PO"
          onChange={handlePO}
          variant="standard"
          sx={{ width: { sm: 200, md: 300 }}}
          error={valid}
          helperText={valid === true ? "*Required" : null}
          required
        />
        <Button variant="contained" 
          sx={{ margin:"32px 0px 0px 100px", textAlign: 'right',width:'15ch' }}  
          onClick={handleSubmit} startIcon={<SearchIcon />} >
        Search</Button>
      </Box>
{/* <div><h1>ORDER DETAILS</h1></div> */}
    {Object.keys(dTable).map((eachTable)=>(

      <Box 
        display="flex"
        sx={{
          //backgroundColor:"yellow",
          width:"200vh",
          height:"auto"
        }}
        >
          {/* <TableContainer style={{ maxHeight:300 }} component={Paper}> */}

        <Paper sx={{ maxWidth: "100%", maxHeight: "auto", mb: 2 }}>
          <h2>{eachTable.toUpperCase()}</h2>
          <TableContainer sx={{ overflowX: "scroll", overflowY: "scroll",height: "fit-content", maxHeight: "70vh" }} component={Paper}>
              <Table  sx={{ maxWidth: "100%" }}
                aria-labelledby="tableTitle"
                size="small">
                <TableHead>
                  <TableRow sx={{backgroundColor:"DodgerBlue"}} >
                      {(Object.keys(dTable[eachTable])).map((row) => (
                        <TableHeaderCell sx={{color:"white",textTransform:"uppercase",fontWeight:"bold",fontFamily:"system-ui"}}>{row}</TableHeaderCell>))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(Object.values(dTable[eachTable])).map((val) => (
                    <TableCell >
                        {val}
                    </TableCell>
                  ))}
                </TableBody> 
              </Table>
          </TableContainer>
        </Paper>
      </Box>

    ))}
   </Box>
  )
}


export default POrder;



