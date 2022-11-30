import React, {useEffect,useState} from 'react';
import ReactDOM from "react-dom/client";
import { makeStyles,withStyles,styled  } from "@mui/styles";
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import swal from '@sweetalert/with-react';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
// MyFormControlLabel.propTypes = {
//     /**
//      * The value of the component.
//      */
//     value: PropTypes.any,
//   };
  
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
    },
    boxDiv: {
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
    },
    inputField: {
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
  });
const styleSelect = {
    control: base => ({
      ...base,
      width:"200px",
      fontSize:"14px",
      boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      
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

const ScheduleAlloc=()=>{
    const ScheduleAllocation = useStyles();
    useEffect(() => {
        document.title = 'Allocation';
      },[]);
    const Header=()=>(
        <Box 
            component="fieldset"
            display="inline-block"
            justifyContent={"center"}
            sx={{
                height:"auto",
                marginLeft:"5px",
                marginTop:"20px",
            backgroundColor:"#F5F5F5",
            borderRadius: 1,
            width:"100%",
            boxShadow: 2, border: 0,
            borderBottom:3,
            }}
            >
            <legend style={{fontWeight:"bold",color:"#191970",}}>Header</legend>        
            <Box display="inline" justifyContent={"flex-start"}>
                <div className={ScheduleAllocation.float_container}>
                    <div>
                    <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                    Allocation ID</InputLabel>
                    </div>
                    <div className={ScheduleAllocation.multiselectfield}>
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
                        className: ScheduleAllocation.inputField,
                        }}
                    />
                    </div> </div> 
                <div className={ScheduleAllocation.float_container}>
                <div>
                <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                Desc</InputLabel>
                </div>
                <div className={ScheduleAllocation.multiselectfield} >
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
                        className: ScheduleAllocation.inputField,
                        }}
                    />
                    </div> </div> 
                    <Button sx={{
                        backgroundColor: "", '&:hover': {
                            backgroundColor: "",
                        }, border: 0, color: "CadetBlue"
                        }}
                        style={{
                            maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                        }}
                        size='small'
                        className={ScheduleAllocation.textField}
                        onClick={() => {
                            swal(
                            <div>
                                <p>desc</p>
                            </div>
                            )
                        }}
                        startIcon={<InfoIcon />}
                        >
                    </Button> 
            </Box>
            <Box 
            display="inline"
            sx={{height:"fit-content", width:"auto",border: 0,}}
            >
                <Button sx={{backgroundColor:"green",'&:hover': {
                            backgroundColor: "#228B22",textShadow:"0 0 #000"},fontSize:"12px" ,margin: "0rem",height:"38"}}
                    variant="contained"
                    type="submit"
                    //onClick={handleOK}
                    startIcon={<DoneAllIcon/>}
                    >
                        OK
                </Button> 
                <Button sx={{backgroundColor:"maroon",'&:hover': {
                            backgroundColor: "maroon",boxShadow:3},fontSize:"12px", margin: "0rem 2.7rem",height:"38"}}
                    variant="contained"
                    className={ScheduleAllocation.textField}
                    type="submit"
                    //onClick={handleCancel}
                    startIcon={<CancelIcon/>}
                    >
                        Cancel
                </Button>
            </Box>
        </Box>
      )


      const Paramters=()=>(
        <Box 
            component="fieldset"
            display="inline-block"
            sx={{
                height:"auto",
                marginLeft:"5px",
                marginTop:"20px",
            backgroundColor:"#F5F5F5",
            borderRadius: 1,
            //width:"100%",
            boxShadow: 2, border: 0,
            borderBottom:3,
            }}
            >
            <legend style={{fontWeight:"bold",color:"#191970",}}>Parameters</legend>        
            <Box  display="grid" sx={{width:"100%"}} 
                    gridTemplateColumns="repeat(13, 1fr)" gap={1}
                    >
                <Box gridColumn="span 6">
                    <div className={ScheduleAllocation.float_container}>
                        <div>
                        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                        Status</InputLabel>
                        </div>
                        <div className={ScheduleAllocation.multiselectfield}>
                        <Select 
                            closeMenuOnSelect={true}
                            isSearchable={true}                
                            styles={styleSelect}  
                            //onChange={selectedSKU}     
                            //isMulti 
                            isClearable={true} 
                        />
                    </div></div> 
                    <Box
                        component="fieldset"
                        display="inline-block"
                        sx={{
                            height:"auto",
                            marginLeft:"5px",
                            marginTop:"20px",
                        backgroundColor:"white",
                        borderRadius: 1,
                        width:"fit-content",
                        boxShadow: 3, border: 0,
                        borderBottom:1,
                        }}>
                        <legend style={{fontWeight:"bold",color:"#191970",fontSize:13}}>Date Range</legend>
                        <div className={ScheduleAllocation.float_container}>
                            <div>
                            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                            From</InputLabel>
                            </div>
                            <div className={ScheduleAllocation.multiselectfield}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    type="date"
                                    //name="ESID_FROM"
                                    helperText=""
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                        backgroundColor: "#f0f0f0"
                                        }
                                    }}
                                    //onChange={onChangeCPO}
                                    id="outlined-disabled"
                                    // label="EISD From"
                                    InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                    InputProps={{
                                        style: { fontSize: 12 ,backgroundColor:"white"},
                                        //className: ScheduleAllocation.inputFielddate,
                                        className: ScheduleAllocation.inputField,
                                    }}
                                />
                        </div></div>    
                        <div className={ScheduleAllocation.float_container}>
                            <div>
                            <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                            To</InputLabel>
                            </div>
                            <div className={ScheduleAllocation.multiselectfield}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    type="date"
                                    //name="ESID_FROM"
                                    helperText=""
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                        backgroundColor: "#f0f0f0"
                                        }
                                    }}
                                    //onChange={onChangeCPO}
                                    id="outlined-disabled"
                                    // label="EISD From"
                                    InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                    InputProps={{
                                        style: { fontSize: 12 ,backgroundColor:"white"},
                                        //className: ScheduleAllocation.inputFielddate,
                                        className: ScheduleAllocation.inputField,
                                    }}
                                />
                        </div></div>    
                    </Box>
                </Box>
                <Box gridColumn="span 5" display="inline-block">
                    <Box
                            component="fieldset"
                            display="inline-block"
                            sx={{
                                height:"auto",
                                 backgroundColor:"white",
                                 borderRadius: 1,
                                 width:"fit-content",
                                 boxShadow: 3, 
                                border: 0,
                                // borderBottom:1,
                            }}>
                            <legend style={{fontWeight:"bold",color:"#191970",fontSize:13}}>Audit Trail</legend>
                    <Box>
                    <div className={ScheduleAllocation.float_container}>
                        <div>
                        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                        Create By</InputLabel>
                        </div>
                        <div className={ScheduleAllocation.multiselectfield}>
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
                                className: ScheduleAllocation.inputField,
                                }}
                            />
                        </div> 
                    </div> 
                    <div className={ScheduleAllocation.float_container}>
                        <div>
                        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                        Create Date</InputLabel>
                        </div>
                        <div className={ScheduleAllocation.multiselectfield}>
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
                                className: ScheduleAllocation.inputField,
                                }}
                            />
                        </div> 
                    </div> 
                    </Box>
                    <Box 
                        sx={{
                            height:"auto",
                            //marginLeft:"5px",
                            marginTop:"20px",}}
                    >
                    <div className={ScheduleAllocation.float_container}>
                        <div>
                        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                        Modified By</InputLabel>
                        </div>
                        <div className={ScheduleAllocation.multiselectfield}>
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
                                className: ScheduleAllocation.inputField,
                                }}
                            />
                        </div> 
                    </div> 
                    <div className={ScheduleAllocation.float_container}>
                        <div>
                        <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"2px 0px 0px 0px", display: 'inline', float: 'left'}}>
                        Modified Date</InputLabel>
                        </div>
                        <div className={ScheduleAllocation.multiselectfield}>
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
                                className: ScheduleAllocation.inputField,
                                }}
                            />
                        </div> 
                    </div> 
                    </Box>
                </Box>
                </Box>
            </Box>

            <Box  display="grid" sx={{width:"100%"}} 
                    gridTemplateColumns="repeat(13, 1fr)" gap={1}
                    >
            <Box 
                 gridColumn="span 9"
                component="fieldset"
                display="inline-block"
                sx={{
                    height:"auto",
                    marginTop:"20px",
                    backgroundColor:"white",
                    borderRadius: 1,
                    width:"fit-content",
                    boxShadow: 3, 
                    border: 0,
                    // borderBottom:1,
                }}>
                <legend style={{fontWeight:"bold",color:"#191970",fontSize:13}}>Allocation Day</legend>
                        {/* <FormControlLabel value="first" label="Sunday"  control={<Radio />} />
                        <FormControlLabel value="second" label="Monday" control={<Radio />} />
                        <FormControlLabel value="first" label="Tuesday"  control={<Radio />} />
                        <FormControlLabel value="second" label="Wednesday" control={<Radio />} />
                        <FormControlLabel value="first" label="Thursday"  control={<Radio />} />
                        <FormControlLabel value="second" label="Friday" control={<Radio />} />
                        <FormControlLabel value="first" label="Saturday"  control={<Radio />} /> */}
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Sunday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Monday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Tuesday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Wednesday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Thursday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Friday" />
                         <FormControlLabel control={<Checkbox defaultChecked />} label="Saturday" />
                </Box>
                <Box 
                 gridColumn="span 3"
                component="fieldset"
                display="inline-block"
                sx={{
                    height:"auto",
                    marginTop:"20px",
                    backgroundColor:"white",
                    borderRadius: 1,
                    width:"fit-content",
                    boxShadow: 3, 
                    border: 0,
                    // borderBottom:1,
                }}>
                    <legend style={{fontWeight:"bold",color:"#191970",fontSize:13}}>Frequency</legend>
                    
                    <FormControlLabel value="first" label="Weekly" control={<Radio />} />
                    <FormControlLabel value="second" label="Bi-Weekly" control={<Radio />} />
                    
                </Box></Box>
        </Box>
      )

    return(
        <Box sx={{
            marginTop:"50px",
            }}>
            
            <div sx={{display: "flex",flexDirection:"row"}}>
                <Grid id="top-row" container spacing={0}>
                    <div className={ScheduleAllocation.course_box}>
                        {Header()}
                    </div>               
                </Grid>
          </div>
          <div sx={{display: "flex",flexDirection:"row"}}>
                <Grid id="top-row" container spacing={0}>
                    <div className={ScheduleAllocation.course_box}>
                        {Paramters()}
                    </div>               
                </Grid>
          </div>
        </Box>
    );
}
export default ScheduleAlloc;