import {
    Paper, styled, TableCell, tableCellClasses
} from "@mui/material";
import { useRef } from "react";
// Draggable Dialog imports
import Draggable from 'react-draggable';
import { DraggableCore } from "react-draggable";

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
        padding: "0px 0px 0px 3px",
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
        padding: "0px"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "11px",
        textAlign: "left",
        borderRight: "1px solid #ccc", // Add border between columns
        padding: "0px"
    },
}));
// export function PaperComponent(props) {
//     return (
//         <Draggable
//             handle="#draggable-dialog-title"
//             cancel={'[class*="MuiDialogContent-root"]'}
//             bounds="body"
//         >
//             <Paper {...props} />
//         </Draggable>
//     );
// }
export function PaperComponent(props) {
    const paperRef = useRef(null);

    return (
        <DraggableCore
            nodeRef={paperRef} // Use the ref API
            handle="#draggable-dialog-title"
            bounds="body"
        >
            <Paper ref={paperRef} {...props} />
        </DraggableCore>
    );
}
