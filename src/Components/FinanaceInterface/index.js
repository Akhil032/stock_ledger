import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Modal, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getFinanceInterfaceRequest } from "../../Redux/Action/financeInterface";
import CircularProgress from "@mui/material/CircularProgress";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from '@mui/material/styles';
import CustomTable from "../Custom Table";
import { serializedata, deserializeData } from "../Custom Table/serialize";
import { generateTableColumns, tabDataDisplay } from "./tabHead";
import PopUpDialog from "../Custom Table/popUp";

const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
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

});

const CostChange = () => {
  const hasRendered = useRef(true);

  const [tabledata, setTabledata] = useState("");

  const [tabCols, setTabCols] = useState(generateTableColumns(tabDataDisplay));
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [currentPageData, setcurrentPageData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [page, setPage] = useState(0);
  const [inputVal, setInputVal] = useState({});


  // State for table-specific configurations
  const [isChanged, setIsChanged] = useState([]);
  const [selected, setSelected] = useState([{}]);
  const [allPageSelected, setAllPageSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState('');
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const FinanceInterfaceClasses = useStyles();
  const FinanceInterfaceData = useSelector(
    (state) => state.FinanceInterfaceReducers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Finance Interface';
  }, []);
  useEffect(() => {
    if (!hasRendered.current) return;
    setTimeout(() => {
      setLoading(true);
      dispatch(getFinanceInterfaceRequest())
    }, 1000)

    hasRendered.current = false;
  }, []);


  useEffect(() => {
    if (FinanceInterfaceData?.isError && (FinanceInterfaceData?.message).length > 0) {
      setOpenDialog(true);
      setDialogData(FinanceInterfaceData?.message);
      setLoading(false);
    }
  }, [FinanceInterfaceData?.isError])


  useEffect(() => {
    if (isSearch) {
      dispatch(getFinanceInterfaceRequest())
    }
  }, [isSearch])



  useEffect(() => {
    if (FinanceInterfaceData?.data?.Data && Array.isArray(FinanceInterfaceData?.data?.Data)) {
      const serializedData = serializedata(FinanceInterfaceData?.data?.Data);
      setTabledata(serializedData);
      // Slice data for pagination immutably
      const pageData = serializedData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((row) => row !== undefined);
      setcurrentPageData(pageData);
      setLoading(false);
      setSearch(false);
      setPage(0);
      setSelected([]);
      setInputVal({});
    }

    else {
      setSearch(false)
    }
  }, [FinanceInterfaceData?.data])



  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    setSearch(true);
    setState({ ...state, 'right': open });
  }
  return (
    <Box className={FinanceInterfaceClasses.maindiv}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '70px 0px 20px 0px',
          width: '100%'  // Ensures full width to spread the items
        }}
      >
        <h4 style={{ margin: "0px" }}>Finance Interface</h4>
        <Button
          size="small"
          variant="contained"
          onClick={handleSubmit}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      </Box>

      <Modal open={loading}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', }} >
          <CircularProgress color="secondary" />
        </div>
      </Modal>
      <CustomTable
        reportName={"Finance interface"}
        data={tabledata}
        setData={setTabledata}
        headColumns={tabCols}
        currentPageData={currentPageData}
        setcurrentPageData={setcurrentPageData}
        inputVal={inputVal} setInputVal={setInputVal}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        selected={selected} setSelected={setSelected}
        allPageSelected={allPageSelected} setAllPageSelected={setAllPageSelected}
        selectedRow={selectedRow} setSelectedRow={setSelectedRow}

        isChanged={isChanged}
        setIsChanged={setIsChanged}
        dropDownColFltr={[]}
        dropDownValFltr={[]}
        enbSearch={false}
        RmvChkBox={true}
      />

      {openDialog &&
        <PopUpDialog
          openDialog={openDialog}
          dialogData={dialogData}
          setOpenDialog={setOpenDialog}
          setDialogData={setDialogData}
        />
      }
    </Box>
  );
};

export default CostChange;
