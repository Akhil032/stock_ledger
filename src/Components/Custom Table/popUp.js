import { Button, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import {
    DoneAll as DoneAllIcon, //Cancel as CancelIcon
} from "@mui/icons-material";
import { PaperComponent } from "./styledComponents";

export default function PopUpDialog ({openDialog,dialogData,setDialogData,setOpenDialog}) {
    return (
        <>
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialog}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    onClose={(event, reason) => {
                        // Prevent closing when clicking on the backdrop
                        if (reason === "backdropClick") return;
                        setOpenDialog(false);
                    }}
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
    )
}