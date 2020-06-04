import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ThemeProvider} from "@material-ui/core"
import Theme from "../../Theme"

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme = {Theme}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Gruppe erstellen
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Gruppe erstellen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Geben sie einen Gruppennamen ein !!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Gruppenname"
            type="string"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button>Gruppenmitglied hinzufügen</Button>
          
          <Button onClick={handleClose} color="primary">
            Erstellen
          </Button>
        
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}

















