import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Box, Button, Drawer, Dialog, DialogActions, DialogContent,
    DialogTitle, InputLabel, Modal, TextField
} from "@mui/material";
import {
    DoneAll as DoneAllIcon, Cancel as CancelIcon, Search as SearchIcon,
    ViewColumn as ViewColumnIcon, Animation as AnimationIcon,
    CalendarToday as CalendarTodayIcon, Download as DownloadIcon,
    Info as InfoIcon, RestartAlt as RestartAltIcon
} from "@mui/icons-material";
import Select from 'react-select';
import CustomTable from "../../Custom Table";
import { useStyles, styleSelect, } from "./customStyle";
import { PaperComponent } from "../../Custom Table/styledComponents";
// API DISPATCH 
import { postCurrencyGLRequest } from "../../../Redux/Actions/global";
import { postGLAccountTabRequest } from "../../../Redux/Actions/Account";

const initData = {
    PRIMARY_ACCOUNT: "",
    CURRENCY: [],
};
const AccountView = () => {
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState('');
    const [selected, setSelected] = useState([{}]);
    const [allPageSelected, setAllPageSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const [searchData, setSearchData] = useState(initData);
    const [curData, setCurData] = useState([]);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const dispatch = useDispatch();
    const globalData = useSelector((state) => state.GlobalReducers);
    // Custom Styles
    const customStyle = useStyles();
    useEffect(() => {
        document.title = 'Account Maintanence';//CurrencyGL
        dispatch(postCurrencyGLRequest([{}]));
        setLoading(true);
    }, []);
    useEffect(() => {
        if (curData.length > 0) {
            setLoading(false);
        }
        if (globalData?.data) {
            const { CurrencyGL } = globalData.data;

            setCurData(CurrencyGL)
        }
        // Handle error status (if status is 500, show error message)
        if (globalData?.data?.status === 500 && globalData?.data?.message) {
            setDialogData(globalData.message);  // Set the error message to dialog data
            setOpenDialog(true);
            setLoading(false);
        }

    }, [globalData?.data])
    const togglePopover = () => {
        setPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setPopoverOpen(false);
    };

    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                count++;

                newTabledata.push(item);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const tabData = serializedata([{
        "Hier1": "124",
        "Hier2": "1300",
        "Hier3": "2188",
        "Extended Attribute": "",
        "Attribute Value": "",
        "Item": "015878432",
        "Item Description": "Bluetooth Red Speaker W/ Carabiner",
        "Variant": "RED",
        "Location": 7,
        "On Hand In Stores": 780,
        "Allocated Qty": 0,
        "Weeks of Supply": 0
    },
    {
        "Hier1": "124",
        "Hier2": "1300",
        "Hier3": "2188",
        "Extended Attribute": "",
        "Attribute Value": "",
        "Item": "015878432",
        "Item Description": "Bluetooth Red Speaker W/ Carabiner",
        "Variant": "RED",
        "Location": 10,
        "On Hand In Stores": 2,
        "Allocated Qty": 14,
        "Weeks of Supply": 0
    }])


    const tableColumns = Object.keys({
        "Hier1": "124",
        "Hier2": "1300",
        "Hier3": "2188",
        "Extended Attribute": "",
        "Attribute Value": "",
        "Item": "015878432",
        "Item Description": "Bluetooth Red Speaker W/ Carabiner",
        "Variant": "RED",
        "Location": 20,
        "On Hand In Stores": 2,
        "Allocated Qty": 14,
        "Weeks of Supply": 0
    }).map(str => {

        const label =
            str
                .toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase())
            ;

        return { id: str, label };
    });
    const handleSubmit = () => {

    }
    const handleChange = (event) => { setSearchData((prev) => { return { ...prev, PRIMARY_ACCOUNT: event.target.value, }; }); }
    const selectCurrency = (selectedOptions) => {
        console.log("dispatch  selectedOptions:", selectedOptions)
        // Update the CURRENCY field in searchData with the selected options
        const selectedCurrencies = selectedOptions ? selectedOptions.map(option => option.CURRENCY) : [];
        setSearchData((prevData) => ({
            ...prevData,
            CURRENCY: selectedCurrencies,
        }));
    };


    // Adjust options order to display selected options at the top
    const sortedOptions = [
        ...curData.filter(option => searchData.CURRENCY.includes(option.CURRENCY)), // Selected options
        ...curData.filter(option => !searchData.CURRENCY.includes(option.CURRENCY)), // Remaining options
    ];
    console.log("dispatch sortedOptions, ", sortedOptions)
    const searchPanel = () => (
        <Box
            sx={{ width: 300, marginTop: "80px", }}
            role="presentation"
            component="form"
            onSubmit={handleSubmit}
        >
            <div className={customStyle.float_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                        Description</InputLabel>
                </div>
                <div className={customStyle.multiselectfield}>
                    <TextField
                        size="small"
                        onChange={handleChange}

                        id="outlined-disabled"
                        autoComplete='off'
                        value={searchData.PRIMARY_ACCOUNT}
                        // label="Not Before Date To"
                        sx={{
                            width: "200px",
                            '& input + fieldset': { boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px", },

                        }}
                        slotProps={{
                            htmlInput: {
                                sx: {
                                    fontSize: 12,
                                    padding: "0px 0px 0px 3px",
                                    height: "30px",
                                    textAlign: "left",
                                    "&::placeholder": {
                                        textAlign: "left",
                                        padding: "0px",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className={customStyle.float_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                        Currency</InputLabel>
                </div>
                <div className={customStyle.multiselectfield}>
                    <Select
                        classNamePrefix="mySelect"
                        onChange={selectCurrency}
                        maxMenuHeight={180}
                        getOptionLabel={(option) => option.CURRENCY}
                        getOptionValue={(option) => option.CURRENCY}
                        options={curData}
                        value={curData.filter(option => searchData.CURRENCY.includes(option.CURRENCY))} // Filter based on searchData.CURRENCY
                        hideSelectedOptions={false} // Show selected options at the top
                        styles={styleSelect}
                        menuPlacement="bottom"
                        isClearable={true}
                        closeMenuOnSelect={false} // Allow multi-selection without closing
                        isMulti
                    />
                </div>
            </div>
            <Button
                size="small"
                variant="contained"
                sx={{
                    backgroundColor: "", fontSize: "12px",
                    padding: "5px", fontFamily: "system-ui",
                    width: "100px",
                    marginLeft: "15px", paddingLeft: "0px", marginTop: "12px",
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        backgroundColor: 'DodgerBlue',
                        color: '#fff',
                    },
                }}
                startIcon={<SearchIcon />}
            >
                Search
            </Button>
        </Box>
    )

    console.log("Dispatch", searchData)
    return (<>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '70px',
                width: '100%'  // Ensures full width to spread the items
            }}
        >
            <h4 style={{ margin: "0px" }}>Account Maintanence</h4>
            <Button
                size="small"
                variant="contained"
                onClick={toggleDrawer("right", true)}
                startIcon={<SearchIcon />}
                sx={{
                    backgroundColor: "", fontSize: "12px",
                    padding: "5px", fontFamily: "system-ui",
                    width: "100px", paddingLeft: "0px", marginRight: "30px",
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        backgroundColor: 'DodgerBlue',
                        color: '#fff',
                    },
                }}
            >
                Search
            </Button>
            <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                transitionDuration={700}
            >
                {searchPanel("right")}
            </Drawer>
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                width: '100%'  // Ensures full width to spread the items
            }}>

            {/* <div style={{ position: "relative", padding: "20px" }}>
      {isPopoverOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px", // Adjust to your layout
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            zIndex: 100,
          }}
        >
          <p>This is the Popover content!</p>
          <button
            onClick={closePopover}
            style={{
              padding: "5px 10px",
              backgroundColor: "dodgerblue",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

      <button
        onClick={togglePopover}
        style={{
          padding: "10px 20px",
          backgroundColor: "dodgerblue",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Toggle Popover
      </button>
    </div> */}

            < CustomTable
                reportName={"Account Maintenance"}
                data={tabData}
                headColumns={tableColumns}
                selected={selected} setSelected={setSelected}
                allPageSelected={allPageSelected} setAllPageSelected={setAllPageSelected}
                selectedRow={selectedRow} setSelectedRow={setSelectedRow}
            />
        </Box>
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={openDialog}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                disableBackdropClick
            >
                <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px" }}></DialogTitle>
                <DialogContent
                    id="draggable-dialog-title"
                    sx={{
                        fontSize: "16px",
                        userSelect: 'text',
                        padding: "0px 0px 0px 10px",
                    }}
                >
                    {dialogData}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            fontSize: "12px",
                            padding: "5px",
                            width: "100px",
                            marginLeft: "5px",
                            marginTop: "2px",
                        }}
                        onClick={() => {
                            setOpenDialog(false);
                            setDialogData("");
                        }}
                        autoFocus
                        variant="contained"
                        startIcon={<DoneAllIcon />}
                    >
                        Ok
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
        {/* LOADING */}
        <Modal open={loading}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        </Modal>
    </>
    )
}
export default AccountView;