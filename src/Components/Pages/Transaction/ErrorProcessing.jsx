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
    Info as InfoIcon, RestartAlt as RestartAltIcon,
    Send as SendIcon,
} from "@mui/icons-material";
import Select from 'react-select';
import CustomTable from "../../Custom Table";
import { useStyles, styleSelect, } from "./customStyle";
import { PaperComponent } from "../../Custom Table/styledComponents";
// API DISPATCH 
import { postCurrencyGLRequest } from "../../../Redux/Actions/global";
import { postGLAccountTabRequest, postGLAccountUpdRequest } from "../../../Redux/Actions/Account";
import { tabDataErrp } from "./tabDataErrp";
const initData = {
    PRIMARY_ACCOUNT: "",
    CURRENCY: [],
};
const ErrorProcessing = () => {
    // State for loading and dialog management
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState('');

    // State for data handling
    const [data, setData] = useState([]);
    const [currentPageData, setcurrentPageData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [page, setPage] = useState(0);
    const [inputVal, setInputVal] = useState({});

    // State for table-specific configurations
    const [tabCols, setTabCols] = useState([]);
    const [selected, setSelected] = useState([{}]);
    const [allPageSelected, setAllPageSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editableCols, setEditableCols] = useState([]);
    const [isChanged, setIsChanged] = useState([]);
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const [searchData, setSearchData] = useState(initData);
    const [curData, setCurData] = useState([]);

    // State for sidebar drawer
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // Redux
    const dispatch = useDispatch();
    const globalData = useSelector((state) => state.GlobalReducers);
    const AcoountData = useSelector((state) => state.AccountTabReducer);

    // Custom styles
    const customStyle = useStyles();

    // Helper functions
    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                count++;
                newTabledata.push(item);
            });
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    };
    const deserializeData = (tableData) => {
        if (!Array.isArray(tableData)) return []; // Handle invalid input gracefully
    
        return tableData.map(({ SR_NO, ...rest }) => rest); // Remove the `SR_NO` property
    };
    

    useEffect(() => {
        document.title = 'Account Maintanence';//CurrencyGL
        dispatch(postCurrencyGLRequest([{}]));
        setLoading(true);
    }, []);
    useEffect(() => {
        data && Array.isArray(data)
        if (curData.length > 0 || data.length > 0) {
            setLoading(false);
        }
        if (globalData?.data) {
            const { CurrencyGL } = globalData.data;

            setCurData(CurrencyGL)
        }
        if (AcoountData?.data?.GLAccountTab && Array.isArray(AcoountData?.data?.GLAccountTab)) {
            // Create an immutable copy of the GLAccountTab data
            const tableData = AcoountData?.data?.GLAccountTab.map((item) => ({
                ...item, // Ensure no direct mutation of the state
            }));
            const columns = Object.keys(tableData[0]); // Get all column names
            const columnsContainingSegment = columns.filter(col =>
                col.toUpperCase().includes("SEGMENT") // Check if "SEGMENT" is in the column name
            );
            setPage(0);
            setSelected([]);
            console.log(columnsContainingSegment); // Outputs all matching columns


            setEditableCols(columnsContainingSegment)
            // Generate columns immutably
            const tableColumns = columns.map((str) => {
                const label = str
                    .toLowerCase()
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                return { id: str, label };
            });

            setTabCols(tableColumns); // Set columns immutably

            // Serialize the data immutably
            const serializedData = serializedata(tableData);

            // Update main table data
            setData(serializedData);

            // Slice data for pagination immutably
            const pageData = serializedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((row) => row !== undefined);

            setcurrentPageData(pageData); // Set current page data immutably
        }

        // Check for error status and set appropriate dialog messages
        const errorMessage =
            globalData?.data?.CurrencyGL?.status === 500 && globalData?.data?.CurrencyGL?.message
                ? globalData.data.CurrencyGL.message
                : AcoountData?.data?.GLAccountTab?.status === 500 && AcoountData?.data?.GLAccountTab?.message
                    ? AcoountData.data.GLAccountTab.message
                    : AcoountData?.data?.GLAccountUpd?.status === 500 && AcoountData?.data?.GLAccountUpd?.message
                        ? AcoountData.data.GLAccountUpd.message
                        : null;

        if (errorMessage) {
            setDialogData(`Error: ${errorMessage}`); // Add a prefix for better clarity
            setOpenDialog(true); // Show the dialog with the error message
            setLoading(false); // Stop the loading state
        }

        if ((AcoountData?.data?.GLAccountUpd?.status === 200 && AcoountData?.data?.GLAccountUpd?.message)) {
            setDialogData(AcoountData?.data?.GLAccountUpd?.message);  // Set the error message to dialog data
            setOpenDialog(true);
            dispatch(postGLAccountTabRequest([searchData]));
            setLoading(true);
        }

    }, [globalData?.data, AcoountData?.data])
    const togglePopover = () => {
        setPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setPopoverOpen(false);
    };


    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const tabData = serializedata(tabDataErrp)


    const tableColumns = Object.keys(tabDataErrp[0]).map(str => {

        const label =
            str
                .toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase())
            ;

        return { id: str, label };
    });
    const handleSubmit = () => {
        // if (searchData.PRIMARY_ACCOUNT.length>0  || searchData.CURRENCY.length>0){
        dispatch(postGLAccountTabRequest([searchData]));
        setLoading(true);
        // }
        setState({ ...state, 'right': false });
    }
    const handleReset = () =>{
        setSearchData(initData);
        setData([]);
        setcurrentPageData([]);
        setPage(0);
        setInputVal({});
    }
    const handleUpdate = () => {
        const updatedRows =data.filter((row)=> isChanged.includes(row.SR_NO))
        dispatch(postGLAccountUpdRequest(deserializeData(updatedRows)));
        setLoading(true);
        setIsChanged([]);
    }
    const handleChange = (event) => { setSearchData((prev) => { return { ...prev, PRIMARY_ACCOUNT: event.target.value, }; }); }
    const selectCurrency = (selectedOptions) => {
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
    const searchPanel = () => (
        <Box
            sx={{ width: 300, marginTop: "80px", }}
            role="presentation"
            component="form"
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
                onClick={handleSubmit}
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
            <Button
                size="small"
                variant="contained"
                onClick={handleReset}
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
                startIcon={<RestartAltIcon />}
            >
                Reset
            </Button>
        </Box>
    )
    console.log("dialog : ", openDialog, dialogData)
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
            <h4 style={{ margin: "0px" }}>Error Processing</h4>
            <div>
                {isChanged.length> 0 &&
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                            setOpenDialog(true);
                            setDialogData("Do you want to submit data?");
                        }}
                        startIcon={<SendIcon />}
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
                        Submit
                    </Button>
                }
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

            </div>

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
                // marginTop: '10px',
                width: '100%'  // Ensures full width to spread the items
            }}>

            {tabData.length > 0 &&
                < CustomTable
                    reportName={"Error Processing"}
                    data={tabData}
                    setData={setData}
                    headColumns={tableColumns}
                    currentPageData={tabData.slice(0, 30)}
                    setcurrentPageData={setcurrentPageData}
                    inputVal={inputVal} setInputVal ={setInputVal}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    selected={selected} setSelected={setSelected}
                    allPageSelected={allPageSelected} setAllPageSelected={setAllPageSelected}
                    selectedRow={selectedRow} setSelectedRow={setSelectedRow}
                    editableCols={editableCols}
                    isChanged ={isChanged}
                    setIsChanged={setIsChanged}
                />}
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
                            if (isChanged.length>0) {
                                handleUpdate();
                            }
                        }}
                        autoFocus
                        variant="contained"
                        startIcon={<DoneAllIcon />}
                    >
                        Ok
                    </Button>
                    {isChanged.length>0 &&
                        <Button
                            sx={{
                                backgroundColor: "maroon", width: "100px", marginLeft: "5px", marginTop: "2px",
                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                            }} startIcon={<CancelIcon />} variant="contained"
                            onClick={() => { setOpenDialog(false); setDialogData(""); }}
                        >Cancel</Button>}
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
export default ErrorProcessing;