import React, {useState} from 'react';
import ReactDOM from "react-dom/client";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { makeStyles,withStyles,styled  } from "@mui/styles";
import { yellow } from '@mui/material/colors';
import {Table, TableBody, TableContainer, TableCell,Paper,TableRow,TableHead} from "@mui/material";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InputLabel from '@mui/material/InputLabel';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

const animatedComponents = makeAnimated();
const styleTextfield = {
    input1: {
      height: 50
    },
    input2: {
      height: 200,
      fontSize: "3em"
    }
  };
const styleSelect = {
    control: base => ({
      ...base,
      width:"200px",
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
  });
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
  
const LikeItemMap=()=>{
    const LikeItem = useStyles();
    const Like_Criteria=()=>(
    <Box 
        component="fieldset"
        display="inline-block"
        sx={{
            height:"auto",
            marginLeft:"5px",
        width:"100%",
        //backgroundColor:"#F0FFFF",
        backgroundColor:"#F5F5F5",
        borderRadius: 1,
        
        boxShadow: 2, border: 0,
        borderBottom:3,
        }}
        >
        <legend style={{fontWeight:"bold",color:"#191970",}}>Like Item Criteria</legend>
        
{/*         
<div className={LikeItem.float_container}> */}
            <div className={LikeItem.float_container}>
                <div>
                <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                Dept:</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
            <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                placeholder={"Dept"}
                styles={styleSelect}
                components={animatedComponents}  
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
                placeholder={"class"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
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
                placeholder={"subclass"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA1:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA1 Value:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA2:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div> 
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA2 Value:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div>
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA3:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
                />
                </div> </div>
            <div className={LikeItem.float_container}>
            <div>
            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
            UDA3 Value:</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
                <Select 
                closeMenuOnSelect={true}
                isSearchable={true}                
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
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
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
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
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
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
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
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
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true} 
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
                //placeholder={"UDA1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
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
                // onChange={onChange}
                //value={searchData.ESID_FROM}
                id="outlined-disabled"
                // label="EISD From"
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
                //control={<Android12Switch defaultChecked />}
                control={<Switch defaultChecked />} 
                /></div></div>
    <Box 
        component="fieldset"
        display="flex"
        justifyContent="flex-end"
        sx={{height:"auto", marginTop:"15px",width:"auto",border: 0,}}
        >
            {/* <Grid container justify="flex-end"> */}
    {/* <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2,border:0 }}> */}
    <Button sx={{backgroundColor:"",fontSize:"12px" ,height:"38"}}
           variant="contained"
           //className={CreateAllocationClasses.textField}
           type="submit"
           //onClick={SubmitList}
           >
            Map</Button> 
    <Button sx={{backgroundColor:"#B22202",'&:hover': {
                backgroundColor: "#B22202",
            },fontSize:"12px", margin: "0rem 2.7rem",}}
           variant="contained"
           className={LikeItem.textField}
           type="submit"
           //onClick={SubmitList}
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
           //onClick={SubmitList}
           startIcon={<DoneAllIcon/>}
           >
            OK</Button> 
    <Button sx={{backgroundColor:"maroon",'&:hover': {
                backgroundColor: "#B22222",boxShadow:3},fontSize:"12px", margin: "0rem 2.7rem",height:"38"}}
           variant="contained"
           className={LikeItem.textField}
           type="submit"
           //onClick={SubmitList}
           startIcon={<CancelIcon/>}
           >
            Cancel</Button>
        {/* </Paper> */}
    </Box>
    </Box>
    )
    return(
        <Box sx={{
            marginTop:"50px",
            // backgroundColor: 'primary.dark',
            // '&:hover': {
            //   backgroundColor: 'primary.main',
            // },
          }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Box className={LikeItem.boxDiv}>
                {console.log("akhil")}

                <div className={LikeItem.boxDiv}>
                    <h4>PO ENQUIRY</h4>
                </div>
                </Box>
            </Grid>
            </Grid>
            <Box sx={{'& .MuiTextField-root': { m: 0, width: '35ch',margin:"20px 0px 0px 20px"},height:"100px" }}>

            </Box>
            

           <div sx={{display: "flex",flexDirection:"row"}}>
            <Grid id="top-row" container spacing={0}>
            <div className={LikeItem.course_box}>
            {Like_Criteria()}
            </div>               
            </Grid>
          </div>


        </Box>
    )


}
export default LikeItemMap;