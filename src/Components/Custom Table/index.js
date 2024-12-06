// Core React Imports
import React, { useEffect, useState } from "react";

// Material-UI Components & Utilities
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControlLabel, InputLabel, Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow, TableSortLabel, TextField, IconButton,
    TableCell
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

// Material-UI Icons
import {
    DoneAll as DoneAllIcon, Cancel as CancelIcon, Search as SearchIcon,
    ViewColumn as ViewColumnIcon, Animation as AnimationIcon,
    CalendarToday as CalendarTodayIcon, Download as DownloadIcon,
    Info as InfoIcon, RestartAlt as RestartAltIcon
} from "@mui/icons-material";

// Third-Party Libraries
import DatePicker from "react-datepicker"; // Date Picker
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillEraserFill } from "react-icons/bs"; // React Icons
import Select from "react-select"; // Select Component

// Custom Utilities, Styled Components, and Styles
import { generateExcel } from "./excelExport";
import { getComparator, stableSort, handleRequestSort } from "./sorting";
import { StyledTableCell, StyledTableCellBody, TableInlineFltr, PaperComponent } from "./styledComponents";
import { useStyles, styleSelectCell } from "./customStyle";



export default function CustomTable(
    { reportName, data, setData, headColumns, currentPageData, setcurrentPageData, inputVal, setInputVal, page, setPage,
        rowsPerPage, selected, setSelected, allPageSelected, setAllPageSelected,
        selectedRow, setSelectedRow, editableCols, isChanged, setIsChanged, dropDownCol, dropDownVal
    }) {
    // Custom Styles
    const customStyle = useStyles();
    // Table Sorting & Pagination
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [currentPageRows, setcurrentPageRows] = useState(currentPageData);
    const [selectedRows, setSelectedRows] = useState({});

    // Input & Header States
    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);

    // Dialogs and Popups
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState('');
    const [openDialogManage, setOpenDialogManage] = useState(false);

    // Download CSV Status
    const [dwnldStatus, setDwnldStatus] = useState(true);

    // Screen & Hover States
    const [isScreenBigger, setIsScreenBigger] = useState(window.innerWidth >= 1500);
    const [isSHovered1, setIsHovered1] = useState(false);
    const handleSEnter1 = () => setIsHovered1(true);
    const handleSLeave1 = () => setIsHovered1(false);

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        setIsScreenBigger(screenWidth < 1500 ? false : true);
    };

    // TABLE RESIZE
    useEffect(() => {
        // document.title = 'Alloc Summary';
        window.addEventListener('resize', handleResize);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /*
                     #########################################
                     ########## CHECKBOX SELECTION ###########
                     #########################################
 */
    // Checkbox Selection & Input Management
    const isSelected = (name) => (selected.length && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;
    const handleClick = (event, name) => {
        const selectedIndex = selected.length && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
            ? selected[0][page].indexOf(name)
            : -1;
        let newSelected = [];
        if (selectedIndex === -1) {
            if (selected.length && Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page))) {
                newSelected = [{ ...selected[0], [page]: [name] }];
            } else if (selected.length && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
                newSelected = selected;
                newSelected[0][page].push(name);
            } else if (selected.length === 0 || Object.keys(selected[0]).length === 0) {
                const pageselected = { [page]: [name] };
                newSelected.push(pageselected);
            }
        } else {
            if (selected[0][page].length === 1) {
                newSelected = selected.map((obj) => {
                    if (obj.hasOwnProperty(String(page))) {
                        const newObj = { ...obj };
                        delete newObj[String(page)];
                        return newObj;
                    }
                    return obj;
                });

            } else if (selected[0][page].length > 1) {
                selected.forEach((obj) => {
                    if (obj.hasOwnProperty(page)) {
                        const index = obj[page].indexOf(name);
                        obj[page].splice(index, 1);
                    }
                });
                newSelected = selected;
            }
        }
        const combinedList = Object.values(newSelected[0]).flat()
        setAllPageSelected(combinedList);
        setSelected(newSelected);
        // setBreakChk([]);
        return;
    };
    const handleSelectAllClick = (event) => {
        const lastPage = Math.ceil((data.length) / rowsPerPage);
        const filteredArray = currentPageData
        const newSelected = filteredArray.map((n) => n.SR_NO);
        const pageselected = { [page]: newSelected };

        if (event.target.checked && (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
        ) {
            const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }]
                : [pageselected]).sort((a, b) => {
                    const keyA = Object.keys(a)[0];
                    const keyB = Object.keys(b)[0];
                    return keyA - keyB;
                });
            setSelected(sortedArray);
            const combinedList = Object.values(sortedArray[0]).flat()
            setAllPageSelected(combinedList);
            return;
        } else if (event.target.checked && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
            const updatedArray = selected.map((obj) => {
                if (obj.hasOwnProperty(page)) {
                    delete obj[page];
                }
                return obj;
            });
            updatedArray.sort((a, b) => {
                const keyA = Object.keys(a)[0];
                const keyB = Object.keys(b)[0];
                return keyA - keyB;
            });
            setSelected(updatedArray);
            const combinedList = Object.values(updatedArray[0]).flat()
            setAllPageSelected(combinedList);
            return;
        } else if (event.target.checked && (Object.keys(selected[0]).length === 0)) {
            setSelected([pageselected]);
            const combinedList = Object.values(pageselected).flat()
            setAllPageSelected(combinedList);
            return;
        }
        setSelected([{}]);
        setAllPageSelected([]);
    };
    /*
                      #########################################
                      ######### INLINE-FILTER FUNCTIONALITY #########
                      #########################################
  */
    const handleDateErase = (label) => {
        setInputVal((prev) => {
            return {
                ...prev,
                [label]: "",
            };
        });

    };
    const handleDateEraseHeader = (label) => {
        // setSearchData((prev) => {
        //     return {
        //         ...prev,
        //         [label]: "",
        //     };
        // });

    };
    const gridFilter = (e) => {
        const { name, value } = e.target;
        if (name.toLowerCase().includes('date')) {
            if (value === null || value === "") {
                setInputVal((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            } else {
                const Cdate = new Date(value);
                const year = String(Cdate.getFullYear());
                const month = String(Cdate.getMonth() + 1).padStart(2, '0');
                const day = String(Cdate.getDate()).padStart(2, '0');
                const formattedDate = `${month}-${day}-${year}`;
                setInputVal((prev) => ({
                    ...prev,
                    [name]: formattedDate,
                }));
            }
        } else {
            setInputVal((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }
    useEffect(() => {
        if (Object.keys(inputVal).length > 0) {
            for (let i = 0; i < Object.keys(inputVal).length; i++) {
                var temp_dict = {}
                if (inputVal[Object.keys(inputVal)[i]].includes("&") || inputVal[Object.keys(inputVal)[i]].includes("%")) {
                    inputVal[Object.keys(inputVal)[i]].slice(1);

                    temp_dict[Object.keys(inputVal)[i]] = inputVal[Object.keys(inputVal)[i]].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    const temp = currentPageRows.filter((props) => String(props[Object.keys(inputVal)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase())
                    setcurrentPageData(temp);
                }
                else {
                    const filteredTable = currentPageRows.filter((props) =>
                        Object.entries(inputVal).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setcurrentPageData(filteredTable);
                }
            }
        } else if (Object.keys(inputVal).length === 0) {
            setcurrentPageData(currentPageRows);
        }
    }, [inputVal]);

    // console.log("Inline Filter :", inputVal)
    /*
      #################################################
      ##########  MANAGE COLUMNS IN TABLE  ############
      #################################################
*/

    const HandleManageHeader = () => {
        setOpenDialogManage(true);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const temp = data.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
            .filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        // setInputVal([]);
        //setIsLoading(false);

    };

    const handleCloseDialogManage = (e) => {
        if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
        else { setOpenDialog(true); setDialogData("Table must contain atleast one column."); }
    }
    const handleManageHeaderClick = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderData, name];
            setManageHeaderData(updatedManageHeaderData);
        } else {
            const updatedManageHeaderData = ManageHeaderData.filter(item => item !== name);
            setManageHeaderData(updatedManageHeaderData);
        }
    }
    const handleShowAllManageHeader = () => {
        var temp = []
        headColumns.map(row => temp.push(row.id));
        setManageHeaderData(temp);
    }
    const headerManage = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {headColumns.map((key, index) => (
                    <div key={key.index}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClick(event, key?.id)]}
                                    checked={ManageHeaderData.includes(key.id)}
                                    style={{ padding: "0px", textAlign: "center", }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label={<InputLabel
                                sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                                {key.label}</InputLabel>}
                        /></div>
                ))}
            </div>
        </Box>
    )
    if (ManageHeaderCheck && headColumns.length > 0) {
        var temp = []
        headColumns.map(row => temp.push(row.id));
        setManageHeaderData(temp);
        setManageHeaderCheck(false);
    }

    /*
                      #########################################
                      ######### SORTING FUNCTIONALITY #########
                      #########################################
   */
    const handleSort = (event, property) => {
        handleRequestSort(event, property, setOrder, setOrderBy, order, orderBy);
    };
    function TabHead(props) {
        const { onSelectAllClick, order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        }
        const maxValues = createKeyLengthObject(currentPageData);
        //sx={row[col]!==undefined && (row[col].toString()).length>0 && {maxWidth:calculateWidth(row[col].toString())}}

        return (
            <>
                <TableHead className={customStyle.TitleHead} sx={{ margin: "0", padding: "0" }}>
                    <TableRow className={customStyle.TitleRow} sx={{ margin: "0", padding: "0" }}>
                        <StyledTableCell
                            size="small"
                            style={{
                                whiteSpace: "nowrap", padding: "0px", margin: "0px",
                            }}

                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                indeterminate={selected.length && Object.keys(selected[0]).length > 0
                                    && Object.keys(selected[0]).includes(String(page))
                                    && selected[0][page].length < currentPageData.length}
                                checked={currentPageData.length > 0 && selected.length && Object.keys(selected[0]).length > 0
                                    && Object.keys(selected[0]).includes(String(page))
                                    && selected[0][page].length === currentPageData.length}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all data',
                                }}
                                style={{ color: "#fff", padding: "3px", }}
                            />
                        </StyledTableCell>
                        {headColumns.map((column) => (ManageHeaderData.includes(column.id) &&

                            <StyledTableCell
                                key={column.id}
                                size="small"
                                sortDirection={orderBy === column.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px"
                                }}
                            >

                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : "asc"}
                                    onClick={createSortHandler(column)}
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
                                        padding: "0px", margin: "0px",
                                        ...(maxValues[column.id] !== undefined && maxValues[column.id].toString().length > 0 && {
                                            width: calculateWidth(maxValues[column.id].toString(), column.id)
                                        }),
                                    }}
                                >
                                    {column.label}
                                    {orderBy === column ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}

                                        </Box>) : null}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))
                        }
                    </TableRow>

                </TableHead>
                {/* Filter Row (Search Filters) */}

            </>
        )
    }
    const handleRowChange = (e, col, index) => {
        const modifiedData = data.map((row, rowIndex) => {
            if (rowIndex === index - 1) {
                return { ...row, [col]: e.target.textContent };
            }
            return row;
        });
        const pageData = modifiedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .filter((row) => row !== undefined);

        setcurrentPageData(pageData);
        setData(modifiedData);
        // console.log("ischange", isChanged)
        if (!isChanged.includes(index)) {
            setIsChanged([...isChanged, index]);
        }
    };
    const calculateWidth = (text, column) => {
        const baseWidth = 20; // Minimum width in pixels
        const perCharacterWidth = 5;
        const longerString = column.toUpperCase().includes('_DATE')
            ? Math.max(text.length, column.length, 16)
            : Math.max(text.length, column.length);
        return `${baseWidth + longerString * perCharacterWidth}px`;
    };

    const createKeyLengthObject = (currentPageData) => {

        if (!Array.isArray(currentPageData) || currentPageData.length === 0) return {};

        // Initialize an object to store the key and its longest value
        const result = {};

        // Iterate over the keys of the first object
        Object.keys(currentPageData[0]).forEach((key) => {
            let maxLengthValue = "";

            currentPageData.forEach((row) => {
                const value = row[key] !== undefined && row[key] !== null
                    ? row[key].toString()
                    : ""; // Convert to string, handle null/undefined

                if (value.length > maxLengthValue.length) {
                    maxLengthValue = value; // Keep the longest string
                }
            });

            // Assign the longest string value to the result object
            result[key] = maxLengthValue;
        });

        return result;
    };

    return (
        <>
            <Box
                component="fieldset"
                display="inline-block"
                sx={{
                    backgroundColor: "", padding: "0px 0px 0px 0px", borderRadius: 1, boxShadow: 2, border: "0", margin: "25px 0px 0px 0px",
                    borderBottom: 3, backgroundColor: "", width: isScreenBigger ? "calc(95vw - 0px)" : "calc(93vw - 6px)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    {reportName.length > 0 &&
                        <div title="Download"
                            style={{
                                flex: "0", borderRadius: '20%', padding: "0px 0px 0px 5px", margin: "2px",
                                height: "30px", minHeight: "30px", display: "flex", alignItems: "center",
                            }}
                            onClick={(e) => {
                                setDwnldStatus(false); setOpenDialog(true); setDialogData(`Do you want to download the '${reportName}' report?`);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f5f5f5";
                                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "white";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        ><DownloadIcon fontSize="small" style={{ color: 'DodgerBlue', marginTop: '3px' }} />
                        </div>
                    }

                    <div title="Manage Columns" onMouseEnter={handleSEnter1} onMouseLeave={handleSLeave1}
                        style={{
                            flex: "0", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                            borderRadius: '20%', padding: "0px 8px", margin: "2px", height: "30px",
                            minHeight: "30px", display: "flex", alignItems: "center", // Centers the icon vertically
                        }}
                    >
                        <ViewColumnIcon
                            style={{ padding: "0px", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white', color: "DodgerBlue", cursor: "pointer" }}
                            onClick={HandleManageHeader}
                            title="Manage Columns"
                        />
                    </div>

                </div>
                <Paper
                    sx={{
                        width: isScreenBigger ? "calc(95vw - 0px)" : "calc(92vw - 0px)",
                        margin: "0px 0px 0px 0px", padding: "0px 5px 5px 5px", borderRadius: 0, boxShadow: 0, border: "0",
                    }}
                >
                    <TableContainer sx={{
                        maxHeight: (isScreenBigger ? 710 : 420),
                        borderRadius: '7px', padding: 0, margin: 0,width:'100%'
                    }} component={Paper}>
                        
                        <Table aria-label="customized table" style={{ padding: 0, margin: 0, width:'100%'}}>
                            <TabHead className={customStyle.TitleHead}
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleSort}
                                order={order}
                                orderBy={orderBy}

                            />
                            <TableHead className={customStyle.SearchHead}>
                                <TableRow>
                                    {/* <TableInlineFltr padding="checkbox" style={{ whiteSpace: "nowrap", padding: "0px" }}> */}
                                    <TableCell padding="checkbox" sx={{ padding: "0px", width: "10px", margin: "0px", borderRight: "1px solid #ccc" }} >

                                        <IconButton small="small" sx={{ padding: "0px", }} onClick={() => {
                                            setInputVal({});
                                            const updatedSelected = { ...selected };
                                            // if (Object.keys(selectedRows)) {
                                            //     const key = Object.keys(selectedRows)[0];
                                            //     const valueToRemove = selectedRows[key];

                                            //     // Check if the key exists in selected and filter the array for that key
                                            //     if (updatedSelected[key]) {
                                            //         updatedSelected[key] = updatedSelected[key].filter(item => item !== valueToRemove);
                                            //     }
                                            //     // Update the state with the modified selected data
                                            //     setSelected(updatedSelected);
                                            //     setSelectedRows({})
                                            // }
                                        }}>
                                            <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                        </IconButton>
                                    </TableCell>
                                    {/* </TableInlineFltr> */}

                                    {ManageHeaderData.map((column) => {
                                        const rowCol = headColumns.find((col) => col.id === column);
                                        const col = rowCol?.id;
                                        const placeholderName = rowCol?.label
                                        return (
                                            <TableInlineFltr
                                                // key={column}  // Using the column as the unique key directly
                                                size="small"
                                                style={{
                                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px"
                                                }}
                                            >
                                                {
                                                    (col.toLowerCase().includes('_date')) ? (
                                                        <DatePicker
                                                            autoComplete="off"
                                                            selected={inputVal && inputVal[col] ? new Date(inputVal[col]) : null}
                                                            onChange={(date) => gridFilter({ target: { name: col, value: date } })}
                                                            onChangeRaw={(event) => event.preventDefault()}
                                                            placeholderText="MM-DD-YYYY"
                                                            dateFormat="MM-dd-yyyy"
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            scrollableMonthYearDropdown
                                                            scrollableYearDropdown
                                                            yearDropdownItemNumber={300}
                                                            className="date-picker"
                                                            popperPlacement="bottom-start" // Position the calendar
                                                            customInput={
                                                                <TextField
                                                                    variant="standard"
                                                                    sx={{
                                                                        width: "100px",
                                                                        "& .MuiInput-underline:before": {
                                                                            borderBottom: "1px solid black", // Default 1px border
                                                                            transform: "translateY(2px)",
                                                                        },
                                                                        "& .MuiInput-underline:hover:before": {
                                                                            borderBottom: "2px solid black", // Hover 2px border
                                                                            transform: "translateY(2px)",
                                                                        },
                                                                        "& .MuiInput-underline:after": {
                                                                            borderBottom: 0, // Focused 2px border
                                                                            transform: "translateY(2px)",
                                                                        },
                                                                    }}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <>
                                                                                <CalendarTodayIcon
                                                                                    style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }}
                                                                                />
                                                                                {(inputVal && inputVal[col] ? new Date(inputVal[col]) : null) && (
                                                                                    <BsFillEraserFill
                                                                                        fontSize="medium"
                                                                                        onClick={() => handleDateErase(col)}
                                                                                    />
                                                                                )}
                                                                            </>
                                                                        ),
                                                                        sx: {
                                                                            "& input::placeholder": { fontSize: "12px" },
                                                                            fontSize: 12,
                                                                            padding: "0px 0px 0px 3px",
                                                                            height: "20px",
                                                                            textAlign: "left",
                                                                        },
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    )
                                                        :
                                                        (<TextField
                                                            variant="standard"
                                                            autoComplete="off"
                                                            name={col}
                                                            onChange={gridFilter}
                                                            value={inputVal && inputVal[col] ? inputVal[col] : ""}
                                                            placeholder={placeholderName}
                                                            sx={{
                                                                width: "100%",
                                                                "& .MuiInput-underline:before": {
                                                                    borderBottom: "1px solid black", // Default 1px border
                                                                    transform: "translateY(2px)",
                                                                },
                                                                "& .MuiInput-underline:hover:before": {
                                                                    borderBottom: "2px solid black", // Hover 2px border
                                                                    transform: "translateY(2px)",
                                                                },
                                                                "& .MuiInput-underline:after": {
                                                                    borderBottom: 0, // Focused 2px border
                                                                    transform: "translateY(2px)",
                                                                },
                                                            }}
                                                            slotProps={{
                                                                htmlInput: {
                                                                    sx: {
                                                                        fontSize: 12,
                                                                        padding: "0px 0px 0px 3px",
                                                                        height: "20px",
                                                                        textAlign: "left",
                                                                        "&::placeholder": {
                                                                            textAlign: "left",
                                                                            padding: "0px",
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                        />)
                                                }
                                            </TableInlineFltr>
                                        )
                                    }
                                    )}

                                </TableRow>
                                {/* </TableRow> */}
                            </TableHead>
                            <TableBody >


                                {currentPageData.length > 0 ?
                                    stableSort(currentPageData, getComparator(order, orderBy)).map((row, rowIndex) => {
                                        const isItemSelected = isSelected(row.SR_NO);
                                        const labelId = `enhanced-table-checkbox-${rowIndex}`;
                                        const makeEditable = (selected.length && Object.keys(selected[0]).length > 0) ?
                                            selected.flatMap(obj => Object.values(obj).flat()) : [];
                                        return (
                                            <TableRow
                                                key={row}
                                                // onClick={() => handleRowClick(row)}
                                                style={selectedRow === row ? { backgroundColor: "#CDF0FF" } : null}
                                                sx={{
                                                    backgroundColor: rowIndex % 2 === 0 ? "#F2F2F2" : "#DCDCDC",
                                                }}
                                            >
                                                <TableCell padding="checkbox" sx={{ padding: "0px", width: "10px", margin: "0px", borderRight: "1px solid #ccc" }} >
                                                    <Checkbox
                                                        size="small" color="primary"
                                                        onClick={(event) => {
                                                            handleClick(event, row?.SR_NO);
                                                            setSelectedRows({ page: row?.SR_NO })
                                                        }}
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                        style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                </TableCell>
                                                {ManageHeaderData.map((key, index) => {
                                                    const rowCol = headColumns.find((col) => col.id === key);
                                                    const col = rowCol?.id;
                                                    const editRow = row.SR_NO; if (key !== "SR_NO") {
                                                        return (
                                                            (!(editableCols === undefined) && editableCols.includes(col) && makeEditable.includes(editRow)) ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                    textAlign: "left",
                                                                    fontSize: "12px",
                                                                    outline: "none",
                                                                    verticalAlign: "left",
                                                                    margin: "0px 0px 0px 0px",
                                                                }}
                                                                    contentEditable={true}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === "Enter") {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onInput={(e) => handleRowChange(e, col, editRow)}
                                                                    suppressContentEditableWarning={true}
                                                                >
                                                                    <Box sx={{
                                                                        backgroundColor: '#fff',
                                                                        padding: "1px 0px 0px 3px",
                                                                        height: "22px",
                                                                        border: "1px solid lightgrey",
                                                                        borderRadius: "3px",
                                                                        fontSize: 12,
                                                                        margin: "0px"
                                                                    }}>
                                                                        {row[col]}
                                                                    </Box>
                                                                </TableCell>
                                                                :
                                                                (!(dropDownCol === undefined) && dropDownCol.includes(col) && makeEditable.includes(editRow)) ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "center", fontSize: "12px" }}>
                                                                        <Select
                                                                            name={col}
                                                                            maxMenuHeight={150}
                                                                            classNamePrefix="mySelect"
                                                                            getOptionLabel={option => `${option.mode.toString()}`}
                                                                            getOptionValue={option => option.code}
                                                                            options={dropDownVal[col] || []} // Dynamically fetch options for the column
                                                                            isSearchable={true}
                                                                            menuPlacement="bottom"
                                                                            // onChange={(e) => onTableCellChange(e, row.LOC, col)} // Pass column dynamically
                                                                            value={(dropDownVal[col] || []).filter(obj => obj.code === row[col])} // Match value dynamically
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            styles={styleSelectCell}
                                                                            style={{ maxWidth: '20px' }}
                                                                        />
                                                                    </TableCell>
                                                                    :

                                                                    (key.toLowerCase().includes('_desc') && row[key].length > 0) ?
                                                                        <StyledTableCellBody align="right" sx={{
                                                                            padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap',
                                                                            overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "100px", borderRight: "1px solid #ccc",
                                                                        }}>
                                                                            <Box display="flex" justifyContent="space-between" >
                                                                                <InputLabel
                                                                                    sx={{
                                                                                        paddingTop: "3px", fontSize: "12px", fontFamily: "system-ui",
                                                                                        color: "rgb(10, 10, 10)", paddingLeft: "0px", paddingRight: "0px",
                                                                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                                                                    }}
                                                                                >
                                                                                    {row[col]}
                                                                                </InputLabel>
                                                                                <Button sx={{ backgroundColor: "", '&:hover': { backgroundColor: "", }, border: 0, color: "CadetBlue", padding: "0px" }}
                                                                                    style={{ maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start" }}
                                                                                    size='small' className={customStyle.textField}
                                                                                    onClick={() => { setOpenDialog(true); setDialogData(String(row[key])); }}
                                                                                    startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                >
                                                                                </Button>
                                                                            </Box>
                                                                        </StyledTableCellBody>
                                                                        :
                                                                        <StyledTableCellBody
                                                                            key={index} align="right" textAlign="right"

                                                                        >
                                                                            {row[col]}
                                                                        </StyledTableCellBody>
                                                        )
                                                    }
                                                }
                                                )}

                                            </TableRow>

                                        )
                                    }
                                    ) : null}
                                {/* {(key.toLowerCase().includes('date') && row[key].length > 0) ? convertDateFormat(row[key]) : row[key]} */}

                                {currentPageData.length < (isScreenBigger ? 30 : 15) ?
                                    [...Array((isScreenBigger ? 30 : 15) - currentPageData.length).keys()].map((row, rowIndex) => (
                                        <TableRow
                                            sx={{
                                                backgroundColor: rowIndex % 2 === 0 ? "#F2F2F2" : "#DCDCDC",
                                            }}
                                        >
                                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "10px", margin: "0px", borderRight: "1px solid #ccc" }} >
                                                <Checkbox size="small" color="primary" disabled={true} style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                            </TableCell>
                                            {ManageHeaderData.map((row, index) => {
                                                return (
                                                    <StyledTableCellBody align="right"
                                                        sx={{
                                                            fontFamily: "system-ui", textAlign: "left", fontSize: "75%",
                                                            padding: "0px 0px 0px 3px", height: "20px"
                                                        }}></StyledTableCellBody>
                                                )
                                            })}

                                        </TableRow >
                                    )) : null}

                            </TableBody>

                        </Table>
                    </TableContainer>
                    {/* {data.length > 10 ? */}
                    {data.length > 0 ?
                        <div style={{ display: 'flex', alignItems: '', justifyContent: "space-between", }}>
                            <span
                                style={{
                                    margin: '13px 0px 0px 15px', fontSize: '14px',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                {selected.length && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
                                    ? "Selected : " + String(selected[0][page].length)
                                    : null}
                            </span>
                            <div>
                                <div className={customStyle.header_child}>
                                    <span
                                        style={{
                                            margin: '13px 0px 0px 15px', fontSize: '14px',
                                            fontFamily: 'Arial, sans-serif',
                                        }}
                                    >
                                        {"Total Selected: " + String(allPageSelected.length)}
                                    </span>
                                </div>
                                <div className={customStyle.header_child}>
                                    <TablePagination
                                        rowsPerPageOptions={[30]}
                                        component="div"
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        //onRowsPerPageChange={handleChangeRowsPerPage}
                                        sx={{ '& .MuiToolbar-root': { minHeight: '20px', maxHeight: '40px' }, }}
                                    />
                                </div>
                            </div>
                        </div> : null}

                    {/* : null} */}
                </Paper>
            </Box>
            {/* DISPLAY ERROR IF ANY */}
            <div>
                <Dialog
                    fullWidth={true} maxWidth="xs" open={openDialog} PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title" disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {dialogData}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{
                            backgroundColor: "", fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                            width: "100px", marginLeft: "5px", marginTop: "2px",
                        }}
                            onClick={dwnldStatus ? () => { setOpenDialog(false); setDialogData(""); }
                                : () => {
                                    setDwnldStatus(true); setOpenDialog(false); setDialogData("");
                                    generateExcel(data, reportName);
                                }} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                        {!dwnldStatus && (
                            <Button
                                sx={{
                                    backgroundColor: "maroon", width: "100px", marginLeft: "5px", marginTop: "2px",
                                    fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                }} startIcon={<CancelIcon />} variant="contained"
                                onClick={() => { setDwnldStatus(true); setOpenDialog(false); setDialogData(""); }}
                            >Cancel</Button>)}
                    </DialogActions>
                </Dialog>
            </div>
            {/* MANAGE COLUMNS */}
            <div>
                <Dialog
                    // fullWidth={true}
                    maxWidth="xs"
                    open={openDialogManage}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ fontSize: '18px', height: '25px', padding: '2px 0px 2px 12px', margin: "0px 0px 0px 0px", }}>Manage Columns</DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px" }} >
                        {headerManage()}
                    </DialogContent>
                    <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                            onClick={handleShowAllManageHeader} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                            Show All
                        </Button>
                        <Box>
                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                onClick={handleCloseDialogManage} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                Ok
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>

            </div>


        </>
    )
}