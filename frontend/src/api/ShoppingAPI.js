import ItemBO from './ItemBO'
import PartyBO from './PartyBO'
import UserBO from './UserBO'
import ListBO from './ListBO'


export default class ShoppingAPI {

    // Singelton instance
    static #api = null;

    //Standard URL für MySQL Backend
    #shoppingServerBaseURL = '/shopping';

    //URL für Fakebackend
    //#shoppingServerBaseURL = '/api/shopping';

    //Invitation
    #getInvitationByIdURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`
    #getPendInvitationsBySourceUserIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitation-by-source-user/${id}`
    #getPendInvitationsByTargetUserIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitation-by-target-user/${id}`
    #getAcceptedInvitationsBySourceUserIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitation-by-source-user/${id}`
    #getAcceptedInvitationsByTargetUserIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitation-by-target-user/${id}`
    #getPendInvitationsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitations-by-user-in-party/${id}`
    #getAcceptedInvitationsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitations-by-user-in-party/${id}`
    #addInvitiationURL = () => `${this.#shoppingServerBaseURL}/invitation`
    #updateInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`
    #deleteInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`

    //Item related


    //List related
    #getListByIdURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`
    #getListsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/list-by-party/${id}`
    #addInvitiationURL = () => `${this.#shoppingServerBaseURL}/list`
    #updateInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`
    #deleteInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`

    //Listentry related
    #getListEntryByIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    #getListEntryByListIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-list/${id}`
    #getListEntryByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-user/${id}`
    #addListEntryURL = () => `${this.#shoppingServerBaseURL}/listentry`
    #updateListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    #deleteListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`

    //Party related
    #getPartyByIdURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`
    #addPartyURL = () => `${this.#shoppingServerBaseURL}/party`
    #updatePartyURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`
    #deletePartyURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`

    
    //Retailer related
    #getRetailerByidURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`
    #addRetailerURL = () => `${this.#shoppingServerBaseURL}/retailer`
    #updateRetailerURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`
    #deleteRetailerURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`


    //StandardListEntry related
    #getStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    #getStandardListEntryByListIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-list/${id}`
    #getStandardListEntryByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-user/${id}`
    #addStandardListEntryURL = () => `${this.#shoppingServerBaseURL}/standardlistentry`
    #updateStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    #deleteStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`

    //User related
    #getUserByIdURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}` 
    #getUserByEmailURL = (email) => `${this.#shoppingServerBaseURL}/user-by-email/${email}`
    #updateUserURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}`
    #deleteUserURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}`

    static getAPI() {
        if (this.#api == null) {
            this.#api = new ShoppingAPI();
        }
        return this.#api;
    }

    /**
    *  Returns a Promise which resolves to a json object.
    *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
    *  fetchAdvanced throws an Error also an server status errors
    */
    #fetchAdvanced = (url, init) => fetch(url, init).then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

    //Items

    getAllItems() {
        return this.#fetchAdvanced(this.#getAllItemsURL()).then((responseJSON) => {
            let ItemBOs = ItemBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(ItemBOs)
            })
        })
    }

    //Parties

    getPartiesByUser(id) {
        return this.#fetchAdvanced(this.#getAllPartiesByUserURL()).then((responseJSON) => {
            let PartyBOs = PartyBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(PartyBOs)
            })
        })
    }


    //User

    getUser() {
        return this.#fetchAdvanced(this.#getUserURL()).then((responseJSON) => {
            let UserBOs = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(UserBOs)
            })
        })
    }


    //ShoppingList

    getListsByParty(id) {
        return this.#fetchAdvanced(this.#getAllListsByPartyURL()).then((responseJSON) => {
            let ListBOs = ListBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(ListBOs)
            })
        })
    }
}