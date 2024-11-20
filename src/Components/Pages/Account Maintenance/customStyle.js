
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
  export const styleSelect1 = {
    control: (base) => ({
      ...base,
      width: "200px",                     // Set width
      height: "25px",                     // Set control height
      fontSize: "13px",                   // Font size
      marginBottom: "0px",                // Margin at the bottom
      border: "1px solid rgb(170, 170, 170)",  // Border color
      padding: '0px 5px',                 // No padding (top-bottom) to keep it smaller
      boxShadow: "none",                  // Remove shadow
      display: 'flex',                    // Flex layout
      alignItems: 'center',               // Vertically align text
      minHeight: '25px',                  // Ensure min height is 25px
    }),
  
    // Clear and dropdown indicators
    clearIndicator: (base) => ({
      ...base,
      padding: 0,
      color: 'rgb(90,90,90)',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 1,
    }),
  
    // Input field (the part where the user types or selects the value)
    input: (provided) => ({
      ...provided,
      width: "100%",                       // Full width of input
      padding: '0px',                      // Remove padding
      fontSize: "13px",                    // Font size for input
      lineHeight: "25px",                  // Ensures the text fits within 25px height
    }),
  
    // Dropdown options (menu items)
    option: (provided, state) => ({
      ...provided,
      height: '30px',                       // Set height for options
      lineHeight: '30px',                   // Vertical centering for options
      backgroundColor: state.isSelected
        ? "#d3f4ff"                         // Highlight for selected option
        : state.isFocused
        ? "#f0f0f0"                         // Hover color
        : "white",                           // Default color
      cursor: "pointer",                    // Pointer on hover
      fontSize: "12px",                     // Font size for options
      color: "black",                       // Text color for options
    }),
  
    // Dropdown menu (list container)
    menu: (base) => ({
      ...base,
      maxHeight: '150px',                   // Max height for dropdown
      marginTop: 0,                         // No margin
      zIndex: 9999,                         // Ensure dropdown appears on top
    }),
  
    // Menu list (list of options)
    menuList: (base) => ({
      ...base,
      padding: 0,                           // No padding
    }),
  
    // Single selected value (inside input)
    singleValue: (provided) => ({
      ...provided,
      padding: '0px',
      fontSize: '12px',                     // Font size for selected value
      lineHeight: '25px',                   // Vertically center selected value
    }),
  
    // Value container (where the selected value appears)
    valueContainer: (provided) => ({
      ...provided,
      minHeight: '25px',                    // Min height for value container
      height: '25px',                       // Set height to 25px
      paddingTop: '0px',                    // No padding at the top
      paddingBottom: '0px',                 // No padding at the bottom
      display: 'flex',                      // Flex display
      alignItems: 'center',                 // Vertically align selected value
    }),
  };
  