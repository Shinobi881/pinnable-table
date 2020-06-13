import React from 'react';
import DataTableExample from './DataTable/Table';
import { users } from './mockData.json';

const containerStyles = {
  height: '100vh',
  width: '100vw',
  padding: '1.5em',
}

function App() {
  return (
    <div style={containerStyles}>
      <div>DataTableExample</div>
      <DataTableExample data={users} />
    </div>
  );
}

export default App;
