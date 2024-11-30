import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Iconify } from 'src/components/iconify';
import axios from 'axios';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

export type EmployeeProps = {
  id: number;
  name: string;
  description: string;
  role: string;
  linkedin: string;
  github: string;
  x: string;
  picture: string;
};

type UserTableRowProps = {
  row: EmployeeProps;
  selected: boolean;
  onSelectRow: () => void;
  onEdit: () => void; // Callback for editing
};

export function UserTableRow({ row, selected, onSelectRow, onEdit }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = () => {
    setOpenPopover(null); // Only close the popover, not trigger delete
  };

  const handleDelete = () => {
    const employee = {
      id: row.id,
    };

    axios
      .delete('/deleteEmployee', { data: employee })
      .then((response) => {
        console.log('Employee deleted:', response.data.message);
        toast.success('Employee deleted successfully!');
        setRefresh((prev) => !prev); // Refresh state after deletion
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
        toast.error('Failed to delete employee. Please try again.');
      });

    handleClosePopover(); // Close the popover after the delete action
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.picture} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.description}</TableCell>

        <TableCell>{row.role}</TableCell>
        <TableCell>{row.linkedin}</TableCell>
        <TableCell>{row.github}</TableCell>
        <TableCell>{row.x}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onEdit();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
