
import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    maindiv: {
        position: "relative", margin: "40px 0px 0px 10px",
        "& table": {
            "& tr": {
                "& td:nth-child(26)": { display: "none", },
                "& td:nth-child(27)": { display: "none", },
                "& td:nth-child(28)": { display: "none", },
            },
        },
    },
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    float_child: { display: "inline-block", marginBottom: "0.1rem", marginLeft: "0.5rem" },
    TitleHead: { position: "sticky", top: -1, zIndex: 1, width: "100%", },
    SearchHead: {
        position: "sticky",
        top: "26px", zIndex: 1,
        background: '#fff',
    },
    resetfilter: {
        padding: "6px 6px !important",
        // top: "0px",
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
    },
    header_child: {
        display: "inline-block",
        // border: "1px solid red",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
});