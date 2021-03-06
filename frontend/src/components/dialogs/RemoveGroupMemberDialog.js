import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from "@material-ui/core"
import Theme from "../../Theme"
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingAPI from '../../api/ShoppingAPI';
/**
 * @author  Jens, Anny
 */
class RemoveGroupMemberDialog extends Component {

  constructor(props) {
    super(props);
    /** Propübergabe von Manageparty */
    this.state = {
      open: false,
      invitation: props.invitation,
    }
  }

  /** Funktion zum Öffnen des Dialogs */
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  /** Funktion zum Schließen des Dialogs */
  handleClose = () => {
    this.setState({ open: false });

  };
  //** Löschen einer Invitation; Prop Übergabe von Manage Party */
  handleInvDelete = () => {
    console.log("Invitation ID: ", this.state.invitation[0].getID())
    console.log("invitation:", this.state.invitation)
    ShoppingAPI.getAPI().deleteInvitation(this.state.invitation[0].getID())
      .then(function () {
        this.props.handleInvitationDelete(this.props.index);
        this.handleClose()
      }.bind(this))
  };

  render() {
    return (
      <ThemeProvider theme={Theme}>

        <Button onClick={this.handleClickOpen}>
          <RemoveIcon fontSize='medium' color='primary' />
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Mitglied entfernen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchten Sie das Gruppenmitglied wirklich entfernen?
            </DialogContentText>

          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleInvDelete}>
              Ja
            </Button>
            <Button onClick={this.handleClose}>
              Nein
            </Button>
          </DialogActions>
        </Dialog>

      </ThemeProvider>
    )
  }
}

export default RemoveGroupMemberDialog
