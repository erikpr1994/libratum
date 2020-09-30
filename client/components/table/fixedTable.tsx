import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { useState, useContext } from 'react';

import { balanceContext } from 'hooks/useBalance';

const columns = [
  { id: 'code', label: 'COIN', align: 'center' },
  {
    id: 'balance',
    label: 'BALANCE',
    align: 'center',
    format: (value) => value,
  },
  {
    id: 'value',
    label: 'VALUE',
    align: 'center',
    format: (value) => `${value.toFixed(2)} €`,
  },
  {
    id: 'total',
    label: 'TOTAL',
    align: 'center',
    format: (value) => `${value.toFixed(2)} €`,
  },
];

function createData(code, balance, value, total) {
  return { code, balance, value, total };
}

let rows = [];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    overflow: 'scroll',
    width: '100%',
    height: '90%',
  },
});

export default function StickyHeadTable() {
  const { balance } = useContext(balanceContext);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (balance.length) {
    rows = [];
    balance.map((value, key) => {
      value.code = value.code.startsWith('LD')
        ? `${value.code.substring(2)} (Lending)`
        : value.code;
      rows.push(
        createData(
          value.code,
          `${(Math.round(value.balance * 100000000) / 100000000).toFixed(8)} ${
            value.code
          }`,
          value.totalInEur / value.balance,
          value.totalInEur
        )
      );
    });
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
