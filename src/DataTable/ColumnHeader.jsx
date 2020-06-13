import React from 'react'

const columnLabels = [
  'Avatar',
  'Name',
  'Email',
  'Username',
  'Gender',
  'Location',
  'Job Title',
  'Company',
  'Favorite Movie',
  'School',
  'Department',
];

const DataTableExampleHeader = ({ columnIndex, rowIndex, style }) => {
  return rowIndex === 0 && (
    <div className="column_header_container" style={style}>
      <span className="column_header_text">{columnLabels[columnIndex]}</span>
    </div>
  );
};

export default DataTableExampleHeader;
