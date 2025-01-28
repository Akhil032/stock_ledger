import React, { useEffect, useState, useRef } from "react";
import { getDailyCountRequest, getStageCountRequest, getErrorCountRequest } from "../../Redux/Action/dashBoard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid2, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle,Modal } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Icon for the "Ok" button
import { styled } from "@mui/material/styles";
import Draggable from 'react-draggable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#d9d9d9",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'} bounds="body"
    ><Paper {...props} />
    </Draggable>
  );
}
const Dashboard = () => {
  const hasRendered = useRef(true);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [dailyCount, setDailyCount] = useState('');
  const [stageCount, setStageCount] = useState('');
  const [errCount, setErrCount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DashboardData = useSelector((state) => state.DashboardReducers);

  useEffect(() => {
    const fetchAsyncData = async () => {
      setLoading(true);
      // Dispatching the actions to fetch data
      await Promise.all([
        dispatch(getDailyCountRequest()),
        dispatch(getStageCountRequest()),
        dispatch(getErrorCountRequest())
      ]);
    };
    if (refresh) {
      setRefresh(false);
      fetchAsyncData();
    }
    if (!hasRendered.current) return;
    fetchAsyncData();
    hasRendered.current = false;
  }, [dispatch, refresh]); // Adding dispatch to dependencies to avoid warning

  useEffect(() => {
    setLoading(false);
    if (DashboardData?.data) {
      const { DailyCount, StageCount, ErrorCount } = DashboardData.data;

      if (DailyCount) setDailyCount(DailyCount);
      else if (StageCount) setStageCount(StageCount);
      else if (ErrorCount) setErrCount(ErrorCount);
    }

    // Handle error status (if status is 500, show error message)
    if (DashboardData?.data?.status === 500 && DashboardData?.data?.message) {
      setDialogData(DashboardData.message);  // Set the error message to dialog data
      setOpenDialog(true);
      setLoading(false);
    }
    if (dailyCount.length > 0 && stageCount.length > 0 && errCount.length > 0) {
      setLoading(false);
    }
  }, [DashboardData?.data]);
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '70px',
          width: '100%'  // Ensures full width to spread the items
        }}
      >
        <h4 style={{ margin: "0px" }}>Dashboard</h4>
        <Button
          size="small"
          variant="contained"
          onClick={() => setRefresh(true)}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      </Box>
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
      {!loading && (
        <Box sx={{ marginTop: "20px" }}>
          <Grid2
            container
            justifyContent="space-between" // Ensures even distribution
            sx={{ marginTop: "20px" }}
          >
            {[
              { title: "Unaudited Data Count", bg: "#b2e3ed", data: stageCount },
              { title: "Audited Data Count", bg: "#ededb2", data: errCount },
              { title: "Stock Ledger Processing Count", bg: "#dab0eb", data: dailyCount },
            ].map(({ title, bg, data }, index) => (
              <Grid2
                item
                key={index}
                sx={{
                  width: "100%", // Default width is 100% of the available space
                  maxWidth: "400px", // Ensure no grid item exceeds 400px
                  marginBottom: "20px", // Add margin for vertical spacing
                }}
              >
                <Item style={{ background: bg, height: "220px", width: "100%" }}>
                  <h3>{title}</h3>
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                      {key} : {value.toString()}
                    </div>
                  ))}
                </Item>
              </Grid2>
            ))}
          </Grid2>
        </Box>

      )}
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

    </>
  );
};

export default Dashboard;
