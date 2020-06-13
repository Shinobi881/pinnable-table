import React, { Component } from 'react';
import { ArrowKeyStepper, AutoSizer, MultiGrid } from 'react-virtualized';
import ColumnHeader from './ColumnHeader';
import './styles.css';

const STYLE = {
  border: '1px solid #ddd',
};

const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};

const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};

const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};

const STYLE_BOTTOM_RIGHT_GRID = {
  outline: 'none',
};

const CELLS_MODE = 'cells';
const EDGES_MODE = 'edges';

const cellAccessors = [
  { dataKey: 'avatar', columnWidth: 70 },
  { dataKey: 'fullName', columnWidth: 200 },
  { dataKey: 'email', columnWidth: 300 },
  { dataKey: 'username', columnWidth: 150 },
  { dataKey: 'gender', columnWidth: 150 },
  { dataKey: 'location', columnWidth: 150 },
  { dataKey: 'jobTitle', columnWidth: 200 },
  { dataKey: 'company', columnWidth: 300 },
  { dataKey: 'favoriteMovie', columnWidth: 300 },
  { dataKey: 'school', columnWidth: 400 },
  { dataKey: 'department', columnWidth: 150 },
];

class DataTableExample extends Component {
  state = {
    mode: CELLS_MODE,
    isClickable: true,
    scrollToColumn: 0,
    scrollToRow: 0,
  };

  getCellData = (rowIndex, columnIndex) => {
    const rowData = this.props.data[rowIndex];
    const accessor = cellAccessors[columnIndex].dataKey;
    
    return {
      key: rowData.id, 
      cellContent: rowData[accessor],
      accessorProps: cellAccessors[columnIndex],
    } 
  };

  selectCell = ({ scrollToColumn, scrollToRow }) => {
    this.setState({ scrollToColumn, scrollToRow });
  };

  renderAvatar = (imgUrl) => (
    <img alt="avatar" src={imgUrl} height={50} width={50} />
  );

  renderTableCell = (cellContent) => (
    <span className="cell_content">{cellContent}</span>
  );

  cellRenderer = (cellProps) => {
    const { columnIndex, key, rowIndex, style, scrollToColumn, scrollToRow } = cellProps;
    const { cellContent } = this.getCellData(rowIndex, columnIndex);
    const isSelectedRow = scrollToRow === rowIndex;
    const isSelectedColumn = scrollToColumn === columnIndex;
    const isSelectedCell = isSelectedRow && isSelectedColumn;
    // const isFocusedRow = this.state.mode === EDGES_MODE && isSelectedRow;
    const isFocusedRow = this.state.mode === CELLS_MODE && isSelectedRow;
    // const isFocusedCell = this.state.mode === CELLS_MODE && isSelectedCell;
    const isFocusedCell = this.state.mode === EDGES_MODE && isSelectedCell;
    const classNames = `cell ${isFocusedRow ? 'focused_row': ''} ${isFocusedCell ? 'focused_cell': ''}`

    // console.warn('Name: ', isSelectedCell)
    if (isFocusedRow) {
      // console.warn('Row Index: ', rowIndex)
      // console.warn('Scroll To Row: ', scrollToRow)
    }

    return rowIndex === 0 ? (
      <ColumnHeader {...cellProps} />
    ) : (
      <div className={classNames} key={key} style={style}>
        {columnIndex === 0 ? (
          this.renderAvatar(cellContent)
        ) : (
          this.renderTableCell(cellContent)
        )}
      </div>
    );
  }

  render() {
    const { mode, scrollToColumn, scrollToRow } = this.state;

    return (
      <ArrowKeyStepper
        columnCount={100}
        isControlled
        onScrollToChange={(stuff) => {
          console.warn('Stuff 1: ', stuff)
          this.selectCell(stuff)
        }}
        mode={mode}
        rowCount={this.props.data.length}
        scrollToColumn={scrollToColumn}
        scrollToRow={scrollToRow}
      >
        {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
          <AutoSizer>
            {({width}) => (
              <MultiGrid
                enableFixedColumnScroll
                cellRenderer={(cellProps) => this.cellRenderer({ ...cellProps, scrollToRow, scrollToColumn })}
                onSectionRendered={(stuff) => {

                  
                  console.warn('Stuff2: ', stuff)
                  onSectionRendered(stuff)
                }}
                columnCount={cellAccessors.length}
                columnWidth={({ index }) => cellAccessors[index].columnWidth}
                fixedColumnCount={2}
                fixedRowCount={1}
                scrollToColumn={scrollToColumn}
                scrollToRow={scrollToRow}
                height={700}
                rowHeight={40}
                rowCount={100}
                width={1000}
                style={STYLE}
                styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                styleBottomRightGrid={STYLE_BOTTOM_RIGHT_GRID}
              />
            )}
          </AutoSizer>
        )}
      </ArrowKeyStepper>
    );
  }
}

export default DataTableExample