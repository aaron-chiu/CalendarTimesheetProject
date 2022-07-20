import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { nanoid } from 'nanoid'

const rows = [
  { id: 1, 1: 'Hello', 2: 'World' },
  { id: 2, 1: 'DataGridPro', 2: 'is Awesome' },
  { id: 3, 1: 'MUI', 2: 'is Amazing' },
];

function GetColumns(year, month) {
  let result = [{ field: 'name', headerName: 'Event Name', flex: 1 }]
  let days = new Date(year, month + 1, 0).getDate();
  for (let x = 1; x < days + 1; x++) {
    result.push({ field: x, headerName: `${month}/${x}`, width: 35 })
  }
  return result
}

function GetRows(events) {
  return events.map(({ name, durationPerDay }, index) => ({ id: index, name, ...durationPerDay }))
}

export default function TimeSheetDataGrid(props) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={GetRows(props.events)} columns={GetColumns(props.year, props.month)} />
    </div>
  )
}
