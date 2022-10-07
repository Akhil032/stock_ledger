import React, { useEffect, useState } from "react";
import Header from "../Header/indexCH";
import Autocomplete from '@mui/material/Autocomplete';
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,Paper, Checkbox, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableToolbar from "../Toolbar/index";
import { trnType } from "../../ErrorProcessing/transType";
import "../index.css";
import { bgcolor } from "@mui/system";

const useStyles = makeStyles({
  tabCell: {
    padding: "6px 4px !important",
    fontSize: "0.7rem !important",
    width:"110px"
},
  input: {
    '& .MuiInput-root': {
    fontSize: '12px !important',
      '& .MuiInput-input':{
        padding:'4px 0 1px',
      }
    },
  },
  '& .Mui-disabled': {
    opacity: '0.3',
  }
});

const CommonTable = ({
  handleClick,
  handleSelectAllClick,
  handleRequestSort,
  handleChangePage,
  isSelected,
  handleDelete,
  handleSearch,
  handleEdit,
  seteditRows,
  setSelected,
  editRows,
  setUpdateRow,
  searchText,
  rows,
  selected,
  order,
  orderBy,
  stableSort,
  getComparator,
  page,
  rowsPerPage,
  emptyRows,
  handleChangeRowsPerPage,
  headCells,
  pageName,
  setTabledata,
  allData,
  handleSearchClick,
  freeze,
  handleCopyDown,
  tableData,
  setAllData,
  tabledataclone,
  setInputValue,
  inputValue,
  setSearched,
  selectPageNo,
  allSelectObject,
  s_object,
  s_selecVal,
}) => {


  const [updateData, setupdateData] = useState({});  
  const rowClasses = useStyles();  

  const onBlur = (event, value , row) => {
    let temp = {...updateData};
    //console.log(temp);
    temp[row?.ITEM] = row;
    temp[row?.ITEM][event.target.name] = event.target.value;    
    setupdateData(temp)
  }

  useEffect(() => {
    if(setUpdateRow){
    setUpdateRow(updateData);
    }
  },[updateData])

  const edArr= editRows.map(JSON.stringify);
  
  return (
    <>
      <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2 }}>
      {(pageName != "stage" && pageName != 'reconciliation' && pageName != 'inquiry') &&
        <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows} setUpdateRow={setUpdateRow} setSelected={setSelected} editRows={editRows} setupdateData={setupdateData} setTabledata={setTabledata} allData={allData}/>
        } 
        <TableContainer sx={{ overflowX: "scroll", overflowY: "scroll",height: "fit-content", maxHeight: "70vh" }}>
          <Table
            sx={{ maxWidth: "100%" }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              handleSearch={handleSearch}
              searchText={searchText}
              headCells={headCells}
              editRows={editRows}
              checkEditrows={true}
              freeze={freeze}
              handleCopyDown={handleCopyDown}
              pageName={pageName}
              tableData={tableData}
              setTabledata={setTabledata}
              setAllData={setAllData}
              tabledataclone={tabledataclone}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setSearched={setSearched}
              rowsPerPage={rowsPerPage}
              selectPageNo={selectPageNo}
              page={page}
              allSelectObject={allSelectObject}
              s_object={s_object}
              s_selecVal={s_selecVal}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(new Array(row?.SR_NO?row?.SR_NO:row?.ITEM,row?.SR_NO?row?.SR_NO:row?.LOCATION));
                 // console.log("isItemSelected",isItemSelected,isSelected)
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={ new Array(row?.SR_NO?row?.SR_NO:row?.ITEM,row?.SR_NO?row?.SR_NO:row?.LOCATION)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" style={{width: '1%'}}>
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, new Array(row?.SR_NO?row?.SR_NO:row?.ITEM,row?.SR_NO?row?.SR_NO:row?.LOCATION))}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{
                            color: "#635b5bb8",
                          }}
                         // disabled={editRows && editRows.length > 0}
                        />
                      </TableCell>
                      
                      { edArr?.includes(JSON.stringify(new Array((row?.ITEM)?row?.ITEM:row?.SR_NO ,(row?.LOCATION)?row?.LOCATION:row?.SR_NO)))? <>
                        {Object.entries(row).map(([key, value]) => {
                            let editable;
                          if(pageName == "cost_maintenance"){
                              editable = false;
                              if(key == "UNIT_COST"){
                                editable = true
                            }
                          }

                            return <TableCell padding="none" align="left" key={key} className={rowClasses.tabCell}>
                              {
                                <TextField 
                            disabled={!editable}
                            size="small"
                            variant="standard"
                            className={rowClasses.input}
                            defaultValue={value} name={key} onChange={ (event, value) => onBlur(event,value,row)} />
                             
                              
                              }
                            
                           </TableCell>
                              }
                      )}
                      </> :           
                      <>
                      {Object.entries(row).map(([key, value])=> 
                          <TableCell align="left" key={key} className={rowClasses.tabCell} sx={((key == 'SR_NO')?'display:none':'')}>
                             {(value == "NULL")?"":value }
                          </TableCell>
                      )}
                      </> }
                      
                    </TableRow>

                  );
                })}

              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />        
        </Paper>
    </>
  );
};

export default CommonTable;
