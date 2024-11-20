import {
    Paper ,styled, TableCell, tableCellClasses
} from "@mui/material";

// Draggable Dialog imports
import Draggable from 'react-draggable';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        height: "28px",
        padding: "0px",
        opacity: 1,
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "DodgerBlue",
        color: theme.palette.common.black,
        fontSize: "12px",
        textAlign: "left",
        borderRight: "1px solid #ccc",
        opacity: 1,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "11px",
        textAlign: "left",
        borderRight: "1px solid #ccc",
        opacity: 1,
    },
}));

export const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        height: "20px",
        padding: "0px",
        opacity: 1,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "11px",
        textAlign: "left",
        borderRight: "1px solid #ccc",
        opacity: 1,
    },
}));

export const TableInlineFltr = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.black,
        fontSize: "12px",
        textAlign: "left",
        borderRight: "1px solid #ccc", // Add border between columns
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "11px",
        textAlign: "left",
        borderRight: "1px solid #ccc", // Add border between columns
    },
}));
export function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            bounds="body"
        >
            <Paper {...props} />
        </Draggable>
    );
}
