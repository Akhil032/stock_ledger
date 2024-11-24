
import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    float_child: { display: "inline-block", marginBottom: "0.1rem", marginLeft: "1rem" },
    multiselectfield: { display: "inline-block", margin: "0rem", padding: "0rem 0rem", verticalAlign: "Top", },
    
});
export const styleSelect = {
    control: base => ({
      ...base,
      width: "200px", fontSize: "13px", minHeight: '25px',height: "32px", marginBottom: "0px",
      border: "1px solid rgb(170, 170, 170)", paddingBottom: '0px',
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    }),
    clearIndicator: (base) => ({ ...base, padding: 0, color: 'rgb(90,90,90)', }),
    dropdownIndicator: (base) => ({ ...base, padding: 1, }),
    input: (provided) => ({ ...provided, width: "100%", }),
    option:  (provided, state) => ({ ...provided,
      
      backgroundColor: state.isSelected
            ? "#d3f4ff" // Highlight color for selected options
            : state.isFocused
            ? "#f0f0f0" // Hover color
            : "white",  // Default background color
        color: state.isSelected ? "black" : "black",
        cursor: "pointer", fontSize: "12px", }),
    menu: base => ({ ...base, borderRadius: 0, marginTop: 0 }),
    menuList: base => ({ ...base, padding: 0, }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
    menuList: base => ({ ...base, padding: 0, }),
    singleValue: (provided) => ({ ...provided, }),
    valueContainer: (provided) => ({ ...provided, minHeight: '20px', height: '30px', paddingTop: '0px', paddingBottom: '0px', }),
  };
 