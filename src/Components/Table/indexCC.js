import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CommonTable from "./commonTable/indexCC";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

function descendingComparator(a, b, orderBy) {
  //console.log("ab",a,b,orderBy)
  let c,d;
  if(orderBy == "LOCATION_NAME"){
    c=b[orderBy].slice(b[orderBy].indexOf("-")+1);
    d = a[orderBy].slice(a[orderBy].indexOf("-")+1);
       c = isNaN(c)?c:parseInt(c);
       d = isNaN(d)?d:parseInt(d);  
  }else if(orderBy == "TRAN_SEQ_NO"){
    c =(b[orderBy]);
    d =(a[orderBy]);    
  }else {
     c = isNaN(b[orderBy])?b[orderBy]:parseInt(b[orderBy]);
     d = isNaN(a[orderBy])?a[orderBy]:parseInt(a[orderBy]);
  } 
  if(c==="NULL" || d==="NULL")
  {
    if(c==="NULL" && d !=="NULL"){
      return -1
    }
    else if (d==="NULL" && c !=="NULL"){
      return 1
    }
    else{
      return 1
    }
  }
  else{
  if (c < d) {
    return -1;
  }
  if (c > d) {
    return 1;
  }
}
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
   //console.log("data:",array)
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
  tableData,
  handleSearch,
  searchText,
  handleEdit,
  seteditRows,
  editRows,
  setUpdateRow,
  headCells,
  setTabledata,
  pageName,
  allData,
  handleSearchClick,
  freeze,
  handleCopyDown,
  setDeleteId,
  setAllData,
  setInputValue,
  setSearched,
  setTabledataclone,
  tabledataclone,
  inputValue,
  setFreeze,
  setEditSelect,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const[allSelectObject,setallSelectObject]=React.useState({});
  const[s_selecVal,sets_selecVal]=React.useState({});
  const[selectPageNo,setallSelectPageNo]=React.useState([]);
  const[singleSPageNo,setSingleSPageNo]=React.useState([]);
  const[rowsc,setselectedrows]=React.useState(0);
  const[s_object,sets_object]=React.useState({});
  const[uncheck,setuncheck]=React.useState(false);
  const[newObj,setnewObj]=React.useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === "asc");
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    let stageData = [...tableData];
    if(s_object.hasOwnProperty(page)){
      const Rindex=selected;
      let newSelected = [];
      for (var i= 0; i < s_object[page].length; i++) {
        const rem=selected.indexOf( s_object[page][i]);
        Rindex.splice(rem,1);
      }
      newSelected = newSelected.concat(Rindex)
      delete s_object[page];
      sets_selecVal(s_object)
      setSelected(newSelected)
      return;
  }
    if (event.target.checked && !(selectPageNo.includes(page))) {
        const newallselect=[];
        const newSelecteds = stableSort(stageData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((value) => {  return new Array(value['SR_NO']?value['SR_NO']:value['ITEM'],value['SR_NO']?value['SR_NO']:value['LOCATION']); });      
        allSelectObject[page]=newSelecteds;  
        for(const key in allSelectObject){
            newallselect.push(...(allSelectObject[key]))}
        setallSelectPageNo(oldArray => [...oldArray, page]);
        setSelected(oldArray => [...oldArray,...newSelecteds]);
         //EditRow handling
        if(editRows.length>0){
          seteditRows(oldArray => [...oldArray,...newSelecteds])
        }else{
          seteditRows(newSelecteds);}
        setselectedrows(rowsc+allSelectObject[page].length);
        if ( Object.keys(s_object).length > 0 && s_object.hasOwnProperty(page)){
          for(var i=0;i<s_object[page].length;i++)
          {const index = selected.indexOf(s_object[page][i]);
            if (index > -1) { 
              selected.splice(index, 1);
            }
          }
          delete s_object[page];
        }
        return;
    }else if(selectPageNo.includes(page)){
        const index = selectPageNo.indexOf(page);
        const Rindex=selected;
        setselectedrows(rowsc-allSelectObject[page].length);
        if((selectPageNo.length>1) || (Object.keys(s_object)).length > 1 || !(s_object.hasOwnProperty(page))){          
          const unselectedarray=allSelectObject[page] ;
          if (s_object.hasOwnProperty(page) && uncheck){
            setuncheck(false);
            if(s_object[page].length>0){
              for (var i= 0; i < s_object[page].length; i++) {
                const rem=unselectedarray.indexOf(s_object[page][i]);
                unselectedarray.splice(rem,1);
              }
              delete s_object[page];
            }
          }
          for (var i= 0; i < unselectedarray.length; i++) {
            const rem=selected.indexOf(unselectedarray[i]);
            Rindex.splice(rem,1);
          }
          //EditRow handling
          if(editRows.length>allSelectObject[page].length){
            const filterEditRows=editRows.filter(value=>!allSelectObject[page].includes(value));
            seteditRows(filterEditRows)
          }else{
            seteditRows([]);
          }
          delete allSelectObject[page];
          setSelected(Rindex);
          if (index > -1) { 
              selectPageNo.splice(index, 1);
            }
            
        }else{
            setSelected([]);
            seteditRows([]);
            if (index > -1) { 
              selectPageNo.splice(index, 1);
          }}
        }
   };
   //console.log(tableData.length/rowsPerPage,)
  const handleClick = (event, name) => {
    setSingleSPageNo(rowsPerPage);
    if ( Object.keys(s_object).length > 0 && s_object.hasOwnProperty(page)){
        const index = (s_object[page].map(JSON.stringify)).indexOf(JSON.stringify(name));
        if (index > -1) { 
          s_object[page].splice(index, 1);
          if(s_object[page].length===0){
            delete s_object[page];
          }
        }
       else{
          const Main_check=Math.ceil(tableData.length/rowsPerPage)
          console.log((tableData.slice((Main_check-1)*rowsPerPage,((Main_check-1)*rowsPerPage)+rowsPerPage)).length,(s_object[page].length +1))
          if(!(s_object[page].map(JSON.stringify)).includes(JSON.stringify(name)) &&( (s_object[page].length +1)===rowsPerPage|| (s_object[page].length +1)===(tableData.slice((Main_check-1)*rowsPerPage,((Main_check-1)*rowsPerPage)+rowsPerPage)).length)){
            s_object[page].push(name);
            allSelectObject[page]=s_object[page];
            delete s_object[page];
            selectPageNo.push(page)
          }
        else{
            s_object[page].push(name)
          }
       }
    }else{
      if((allSelectObject.hasOwnProperty(page)))
      {         // console.log(121,allSelectObject[page].map(JSON.stringify),name)

        if( (allSelectObject[page].map(JSON.stringify)).includes(JSON.stringify(name))){
          const index=(allSelectObject[page].map(JSON.stringify)).indexOf(JSON.stringify(name));
          if (index > -1) {
            console.log(121)

          allSelectObject[page].splice(index,1);
          s_object[page]=allSelectObject[page];
          delete allSelectObject[page];
          selectPageNo.pop(page)
          }
      }}
    else{const arr=[]
    arr.push(name)
    s_object[page]=arr}
    }
    Array.prototype.indexOfForArrays = function(search)
    {
      var searchJson = JSON.stringify(search); // "[3,566,23,79]"
      var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

      return arrJson.indexOf(searchJson);
    };
    const selectedIndex = selected.indexOfForArrays(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      console.log(12)

      //setSingleSPageNo(oldArray => [...oldArray, page]);
      newSelected = newSelected.concat(selected, [name]);
    } else if (selectedIndex === 0) {
      console.log(1234)

      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      console.log(123)

      setuncheck(true)
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      setuncheck(true)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    
    }
    //const selecItem=newSelected.map((value) => {return value[0];})
    setSelected(newSelected);
    sets_selecVal(s_object)
    seteditRows(newSelected); 
  };

if(Object.keys(s_selecVal).length >0)
  {
    if(s_selecVal[Object.keys(s_selecVal)[0]].length!==rowsPerPage && singleSPageNo===0){
    setSingleSPageNo(s_selecVal[Object.keys(s_selecVal)[0]].length)
    }
  }
  const handleDelete = () => {
    const id = selected;
    const data = [...tableData];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
  });
  const data1 = [...tabledataclone];
    const updatedTabledata = data1.filter((val) => {
      return !id.includes(val.SR_NO);
  });
    setTabledata(updatedTable)
    setTabledataclone(updatedTabledata)
    setAllData(updatedTabledata);
    setSelected([]);
    setDeleteId(id);
  };
console.log("Data_check:",selectPageNo,s_selecVal,allSelectObject)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  Array.prototype.indexOfForArrays = function(search)
  {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
  };
  //const selectedIndex = selected.indexOfForArrays(name);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // Updating SINGLE SELECT (OBJECT) When RPP (parseInt(event.target.value, 10)) is changed
    if(parseInt(event.target.value, 10) !==singleSPageNo && singleSPageNo !==0 && Object.keys(s_selecVal).length >0 ){
      var Temp_table=[];
      var selected_Array={};
      const keys=Object.keys(s_selecVal);
        if(parseInt(event.target.value, 10) > singleSPageNo){
          for(let i=0;i<keys.length; i++){
            if(parseInt(keys[i])!==0){
              var end=(parseInt(keys[i])+1)*singleSPageNo;
              var start=((parseInt(keys[i])+1)*singleSPageNo) - singleSPageNo;
              Temp_table.push(...(tableData.slice(start,end)));
              const newArr = (Temp_table.map((data)=>{ return [data["ITEM"],data["LOCATION"]]})).map(JSON.stringify);
              for(let j=0;j< s_selecVal[keys[i]].length;j++){
                const index=newArr.indexOf(JSON.stringify(s_selecVal[keys[i]][j]));
                let page_num = Math.floor((index+start)/parseInt(event.target.value, 10));
                if(!(selected_Array.hasOwnProperty(page_num))){
                  selected_Array[page_num]=[];
                  selected_Array[page_num].push(s_selecVal[keys[i]][j]);
                }else{
                  if( !((selected_Array[page_num].map(JSON.stringify)).includes(JSON.stringify(s_selecVal[keys[i]][j])))){
                    selected_Array[page_num].push(s_selecVal[keys[i]][j]);}
                  }
              }
              Temp_table=[];
            }else{selected_Array[0]=s_selecVal[0];}
          }
        }
        if(parseInt(event.target.value, 10) < singleSPageNo){
          var count=0
          for(let i=0;i<keys.length; i++){
              var end=(parseInt(keys[i])+1)*singleSPageNo;
              var start=((parseInt(keys[i])+1)*singleSPageNo) - singleSPageNo;
              Temp_table.push(...(tableData.slice(start,end)));
              const newArr = (Temp_table.map((data)=>{ return [data["ITEM"],data["LOCATION"]]})).map(JSON.stringify);
              for(let j=0;j< s_selecVal[keys[i]].length;j++){
                const index=newArr.indexOf(JSON.stringify(s_selecVal[keys[i]][j]));
                if(index > -1)
                { count=count+1
                  let page_num = Math.floor((index+start)/parseInt(event.target.value, 10));
                  if(!(selected_Array.hasOwnProperty(page_num))){
                    selected_Array[page_num]=[];
                    selected_Array[page_num].push(s_selecVal[keys[i]][j]);
                  }else{
                    if( !((selected_Array[page_num].map(JSON.stringify)).includes(JSON.stringify(s_selecVal[keys[i]][j])))){
                      selected_Array[page_num].push(s_selecVal[keys[i]][j]);}
                    }
                }
              }
              Temp_table=[];
          }
        }
      if(Object.keys(selected_Array).length >0)
      {
        const keys=Object.keys(selected_Array)
        for(let i=0;i<keys.length;i++){
          if(selected_Array.hasOwnProperty(keys[i])){
            if(selected_Array[keys[i]].length===parseInt(event.target.value, 10))
            {
              if(allSelectObject.hasOwnProperty(keys[i])){
                delete allSelectObject[keys[i]]; 
                allSelectObject[keys[i]]=selected_Array[keys[i]]
                delete selected_Array[keys[i]]; 
              }else{
                allSelectObject[keys[i]]=selected_Array[keys[i]]
              }
            }
          }
        }
      }
      //sets_selecVal(selected_Array)
      const key=Object.keys(selected_Array)
      Object.keys(s_selecVal).forEach(key => {
        delete s_selecVal[key];
      })
      for(let i=0;i<key.length;i++){
        s_selecVal[key[i]]=selected_Array[[key[i]]]
      }
      for(let i=0;i<key.length;i++){
        if(selected_Array[[key[i]]].length===parseInt(event.target.value, 10)){
          allSelectObject[[key[i]]]=selected_Array[[key[i]]];
          delete selected_Array[[key[i]]];
          delete s_selecVal[[key[i]]];
        }
      }
      
      setSingleSPageNo(parseInt(event.target.value, 10))
    }
    // updating SELECT ALL (OBJECT) When RPP (parseInt(event.target.value, 10)) is changed
  if(Object.keys(allSelectObject).length >0 && parseInt(event.target.value, 10) !== allSelectObject[Object.keys(allSelectObject)[0]].length ){
    // When current RPP (parseInt(event.target.value, 10)) is Greater than previous RPP
    if(parseInt(event.target.value, 10) > allSelectObject[Object.keys(allSelectObject)[0]].length ){
      var arr=[]
      var diff=0
      var d_count=0
      var cond=false
      var check2=false
      var count=0
      var page_num=0
      const row_count=parseInt(event.target.value, 10)/10;
      const keys=Object.keys(allSelectObject)
      for(let i=0;i< keys.length;i++){
        var end=10
        var start=0 
        for(let j=0;j<allSelectObject[keys[i]].length;j=j+10){
          if(i!==0 && !cond){
              if(keys[i]!==keys[i-1]){
                diff=(keys[i]-keys[i-1])-1;
                d_count=diff * allSelectObject[keys[i]].length;
                cond=true;
              }
          } 
          if(d_count>0){
              d_count=d_count-10;
              j=j-10;
          }else{
              
              if(parseInt(keys[i])!==0 && !cond)
              { 
                check2=true
                diff=keys[i]-0;
                d_count=diff * allSelectObject[keys[i]].length-10;
                cond=true;
              }else{
                if(count===4 && check2){ j=j-10
                }
              arr.push(...(allSelectObject[keys[i]].slice(start,end)));
              start=start+10;
              end=end+10;}
            }
          count=count+1
          if(arr.length=== parseInt(event.target.value, 10) || (count===row_count &&arr.length >0) || (arr.length >0 && i=== Object.keys(allSelectObject).length-1 && (j===allSelectObject[keys[i]].length-10))){
            count=0
            newObj[page_num]=arr;
            page_num=page_num+1;
            arr=[];
            }
        }
        if(d_count===0){cond=false;}
      }
    }
    // When current RPP (parseInt(event.target.value, 10)) is less than previous RPP
    if(parseInt(event.target.value, 10) < allSelectObject[Object.keys(allSelectObject)[0]].length && Object.keys(allSelectObject).length >0 ){
      const keys=Object.keys(allSelectObject)
      const row_count=parseInt(event.target.value, 10)/10;
      var arr_Rpp_less=[];
      var count=0;
      var page_num=0;
      var diff=0
      var d_count=0
      var cond=false
      for(let i=0;i< keys.length;i++){
        var end=10
        var start=0
        for(let j=0;j<allSelectObject[keys[i]].length;j=j+10){
          count=count+1;
          if(i!==0 && !cond){
            if(keys[i]!==keys[i-1]){
              diff=(keys[i]-keys[i-1])-1;
              d_count=diff * allSelectObject[keys[i]].length;
              cond=true;
            }
          } 
          if(d_count>0){
            d_count=d_count-10;
            j=j-10;
          }else{
            arr_Rpp_less.push(...(allSelectObject[keys[i]].slice(start,end)));
            start=start+10;
            end=end+10;
          }
          if(count===row_count &&arr_Rpp_less.length >0)
          {
            newObj[page_num]=arr_Rpp_less;
            page_num=page_num+1;
            arr_Rpp_less=[];
            count=0;
          }
          if(count===row_count &&arr_Rpp_less.length ===0 ){ 
            page_num=page_num+1;
            count=0;
          }
        }
        if(d_count===0){cond=false;}
      }
    }
    var f_page=[]
    if(Object.keys(allSelectObject)[0].includes(0)){
      f_page.push(...allSelectObject[0])
    }
    Object.keys(allSelectObject).forEach(key => {
      delete allSelectObject[key];
    })
    if(Object.keys(newObj).length >0 )
    {
      let page_keys=Object.keys(newObj)
      for(let i=0;i<page_keys.length;i++){
        if(newObj[page_keys[i]].length!==parseInt(event.target.value, 10)){
          if((s_selecVal.hasOwnProperty(page_keys[i])) && !(s_selecVal[page_keys[i]].map(JSON.stringify)).includes(JSON.stringify(newObj[page_keys[i]][0]))){
            s_selecVal[page_keys[i]].push(...newObj[page_keys[i]])
          }
          else if(!(s_selecVal.hasOwnProperty(page_keys[i]))){
            s_selecVal[page_keys[i]]=newObj[page_keys[i]]
          }
        }
        else{
          if((s_selecVal.hasOwnProperty(page_keys[i]))){
            delete s_selecVal[page_keys[i]];
          }
          if(!allSelectObject.hasOwnProperty(page_keys[i])){
          allSelectObject[page_keys[i]]=newObj[page_keys[i]];
          }else{
            delete allSelectObject[page_keys[i]];
            allSelectObject[page_keys[i]]=newObj[page_keys[i]];              
          }
        }
      }
      selectPageNo.splice(0,selectPageNo.length);
      if(Object.keys(allSelectObject).length >0){
        const key_page=(Object.keys(allSelectObject))
        for(let i=0;i<key_page.length;i++){
        setallSelectPageNo(oldArray => [...oldArray,parseInt(key_page[i])]);}
        
      }else{setallSelectPageNo([])}
      sets_object(s_selecVal)
      setSingleSPageNo(parseInt(event.target.value, 10))
    }
  }

  };

  const isSelected = (name) =>{ 
    Array.prototype.indexOfForArrays = function(search)
      {
        var searchJson = JSON.stringify(search); // "[3,566,23,79]"
        var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]
        return arrJson.indexOf(searchJson);
      };
  return selected.indexOfForArrays(name) !== -1;
 // return selected[0].indexOf(name) !== -1;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  
  return (
    <>
    {(selected.length > 0 && pageName == "stage") && 
    <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />} sx={{position:"fixed",top:"75px", zIndex:"99",right:"215px"}} >
    Delete</Button>
    }
     <Box sx={{ width: "100%", marginTop: "8px" }}>
        <CommonTable
          handleClick={handleClick}
          handleSearchClick={handleSearchClick}
          freeze={freeze}
          setFreeze={setFreeze}
          handleCopyDown={handleCopyDown}
          handleSelectAllClick={handleSelectAllClick}
          handleRequestSort={handleRequestSort}
          handleChangePage={handleChangePage}
          isSelected={isSelected}
          handleSearch={handleSearch}
          searchText={searchText}
          handleEdit={handleEdit}
          rows={tableData}
          selected={selected}
          setSelected ={setSelected}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          order={order}
          orderBy={orderBy}
          stableSort={stableSort}
          getComparator={getComparator}
          page={page}
          headCells={headCells}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          pageName={pageName}
          tableData={tableData}
          setTabledata={setTabledata}
          setAllData={setAllData}
          allData={allData}
          tabledataclone={tabledataclone}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSearched={setSearched}
          allSelectObject={allSelectObject}
          selectPageNo={selectPageNo}
          rowsc={rowsc}
          s_selecVal={s_selecVal}
        />
      </Box>
    </>
  );
}
