import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { nanoid } from 'nanoid'

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

function GetRows(headers) {

}

function GetColumns(headers, year, month) {
    let result = headers.map((header, index) => ({field: `title${index}`, headerName: header.name, width: 150 }))
    let days = new Date(year, month + 1, 0).getDate();
    for (let x = 1; x < days+1; x++) {
        result.push({field: `day${month}/${x}`, headerName: `${month}/${x}`, width: 50})
    }
    return result
}

export default function TimeSheetDataGrid(props) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={GetColumns(props.headers, props.year, props.month)} />
    </div>
  )
}
