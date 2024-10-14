import { useState, FC, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface NewEmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (employee: Employee) => void;
  employee?: Employee | null; // Allow for editing
}

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

export const NewEmployeeForm: FC<NewEmployeeFormProps> = ({ open, onClose, onAddEmployee, employee }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [x, setX] = useState<string>('');
  const [picture, setPicture] = useState<string>('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setDescription(employee.description);
      setRole(employee.role);
      setLinkedin(employee.linkedin);
      setGithub(employee.github);
      setX(employee.x);
      setPicture(employee.picture);
    } else {
      setName('');
      setDescription('');
      setRole('');
      setLinkedin('');
      setGithub('');
      setX('');
      setPicture('');
    }
  }, [employee]);

  const handleSubmit = () => {
    const newEmployee: Employee = {
      id: employee ? employee.id : Date.now(), // Generate a new ID
      name,
      description,
      role,
      linkedin,
      github,
      x,
      picture,
    };

    onAddEmployee(newEmployee);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? 'Edit Employee' : 'New Employee'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Role"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <TextField
          margin="dense"
          label="LinkedIn"
          fullWidth
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <TextField
          margin="dense"
          label="GitHub"
          fullWidth
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <TextField
          margin="dense"
          label="X Profile"
          fullWidth
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Picture URL"
          fullWidth
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {employee ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
