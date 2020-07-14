import React, { Component } from 'react'
import ShoppingAPI from '../../api/ShoppingAPI'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Theme from "../../Theme"
import { ThemeProvider } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import ListBO from '../../api/ListBO';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
class AddListDialog extends Component {

    constructor(props){
        super(props);

        this.state = {

            open: false,
            listName: "",


        }





    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAddList(list) {
        this.setState({ listName: list })
    };

    addList = () => {
        const list = new ListBO
        list.setName(this.state.listName)
        list.setPartylId(this.props.partyId)
        ShoppingAPI.getAPI().addList(list)
            .then(setTimeout(() => { this.props.getListsByParty(this.props.partyId) }, 500))
        this.handleClose()
    }

    render() {
        return(
            <div>
                <ThemeProvider theme={Theme}>
                    <IconButton onClick={() => this.handleClickOpen()}>
                        <PlaylistAddIcon fontSize='large' color='primary' />
                    </IconButton>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title"> Liste hinzufügen</DialogTitle>
                        <DialogContent>

                            <TextField
                                onChange={(event) => this.handleAddList(event.target.value)}
                                margin="dense"
                                id="listName"
                                label="Geben Sie einen namen ein"
                                type="string"
                                fullWidth
                            />

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => this.addList()}>
                                Liste hinzufügen
                    </Button>
                            <Button onClick={() => this.handleClose()}>
                                Abbrechen
                    </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>









            </div>
        );








    }

}

export default AddListDialog;





 
    














