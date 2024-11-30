import { useState, FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { NewEmployeeForm } from '../new-employee-form';
import toast from 'react-hot-toast';

// Types
interface Employee {
  id: number;
  name: string;
  description: string;
  role: string;
  linkedin: string;
  github: string;
  x: string;
  picture: string;
}

export const UserView: FC = () => {
  const table = useTable();
  const [filterName, setFilterName] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]); // Start with an empty list
  const [open, setOpen] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    axios.get('/getEmployees').then((res) => {
      setEmployees(res.data.employees);
    });
  }, []);

  const handleAddEmployee = (newEmployee: Employee) => {
    axios
      .post('/addEmployee', newEmployee)
      .then((res) => {
        toast.success(res.data.message); // Notify user of success
        setEmployees((prev) => [...prev, newEmployee]); // Add new employee to state
        setOpen(false); // Close the dialog
      })
      .catch((err) => {
        toast.error('Failed to add employee. Please try again.'); // Notify user of failure
        console.error(err);
      });
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    axios
      .put('/updateEmployee', updatedEmployee)
      .then((res) => {
        toast.success(res.data.message);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === updatedEmployee.id ? res.data.employee : emp))
        );
        setEditingEmployee(null);
        setOpen(false);
      })
      .catch((err) => {
        toast.error('Failed to update employee. Please try again.');
        console.error(err);
      });
  };

  const dataFiltered = applyFilter({
    inputData: employees,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Employees
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => {
            setEditingEmployee(null); // Clear editing state for new entry
            setOpen(true);
          }}
        >
          New Employee
        </Button>
      </Box>

      <NewEmployeeForm
        open={open}
        onClose={() => setOpen(false)}
        onAddEmployee={editingEmployee ? handleEditEmployee : handleAddEmployee}
        employee={editingEmployee}
      />

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={employees.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    employees.map((user) => user.name)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'role', label: 'Role' },
                  { id: 'linkedin', label: 'LinkedIn', align: 'center' },
                  { id: 'github', label: 'GitHub', align: 'center' },
                  { id: 'x', label: 'X Profile', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.name)}
                      onSelectRow={() => table.onSelectRow(row.name)}
                      onEdit={() => {
                        setEditingEmployee(row); // Set employee to edit
                        setOpen(true); // Open the form for editing
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, employees.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={employees.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
};

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const onSelectAllRows = (checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSelectRow = (inputValue: string) => {
    const newSelected = selected.includes(inputValue)
      ? selected.filter((value) => value !== inputValue)
      : [...selected, inputValue];

    setSelected(newSelected);
  };

  const onResetPage = () => {
    setPage(0);
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    onResetPage();
  };

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
