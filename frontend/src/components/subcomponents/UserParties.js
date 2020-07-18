import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import AddListDialog from '../dialogs/AddListDialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateListDialog from '../dialogs/UpdateListDialog';

class UserParties extends Component {

    constructor(props) {
        super(props)

        this.state = {
            parties: [],
            lists: [],
            expanded: true
        }
    }

    componentWillMount() {
        this.getPartiesByUser()
    }


    getListsByParty = (party_id) => {
        ShoppingAPI.getAPI().getListsByPartyId(party_id)
            .then(function (list) {
                this.setState({ lists: list });
                this.setState({ expanded: this.state.expanded !== party_id ? party_id : false })
            }.bind(this)
            )
    }

    getPartiesByUser = () => {
        ShoppingAPI.getAPI().getAcceptedInvitationsByTargetUserId(1)
            .then(invitations => this.getPartyByInvitations(invitations))
    }

    getPartyByInvitations = (invitations) => {
        invitations.forEach(invitation => {
            ShoppingAPI.getAPI().getPartyById(invitation.getPartyiId())
                .then(function (party) {
                    this.setState({
                        parties: [...this.state.parties, party]
                    })
                }.bind(this))
        });
    }

    deleteList = (listId) => {
        //*console.log("versuche eine Liste zu löschen")
        ShoppingAPI.getAPI().deleteList(listId)
            .then(this.setState({
                lists: this.state.lists.filter(list => list.getID() !== listId)
            }
            ))

    }

    replaceNewList = (list) => {

        var Liste = this.state.lists

        var TargetList = Liste.filter(singleList => singleList.getID() === list.getID())

        Liste[Liste.indexOf(TargetList)] = list

        this.setState({ lists: Liste })


    }






    render() {
        const userParties = this.state.parties
        const lists = this.state.lists
        return (
            <div>
                {userParties.map((party) =>
                    <ExpansionPanel expanded={this.state.expanded === party.getID()} onChange={() => this.getListsByParty(party.getID())} key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >

                            {party.getName()}
                            <AddListDialog partyId={party.getID()} getListsByParty={this.getListsByParty} ></AddListDialog>
                            <IconButton component={RouterLink} to={`/standardlistmanagement/${party.getID()}`}>
                                <FavoriteIcon />
                                <ListIcon />
                            </IconButton>
                            <div style={{ alignSelf: "right" }}>
                                <IconButton component={RouterLink} to={`/manageparty/${party.getID()}`} >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </ExpansionPanelSummary>
                        {lists.map((list) =>

                            <ExpansionPanelDetails key={list.getID()}>

                                <Button component={RouterLink} to={`/partyshoppinglist/${list.getID()}`} > {list.getName()} </Button>
                                <UpdateListDialog list={list} replaceNewList={this.replaceNewList}></UpdateListDialog>
                                <IconButton onClick={() => this.deleteList(list.getID())}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </ExpansionPanelDetails>
                        )}
                    </ExpansionPanel>
                )}
            </div>
        )
    }
}
export default UserParties