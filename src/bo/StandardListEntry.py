from bo.BusinessObject import BusinessObject


class StandardListEntry(BusinessObject):

    def __init__(self):
        super().__init__()
        self._item_id = 0
        self._retailer_id = 0
        self._user_id = 0
        self._list_id = 0

    def get_item_id(self):
        """Auslesen des Produkts in dem Listeneintrag"""
        return self._item_id

    def set_item_id(self, item_id):
        """Setzen des Produktes in dem Listeneintrag"""
        self._item_id = item_id

    def get_retailer_id(self):
        """Auslesen des Einkaufsladen in dem Listeneintrag"""
        return self._retailer_id

    def set_retailer_id(self, retailer_id):
        """Setzen des Einkaufsladen in dem Listeneintrag"""
        self._retailer_id = retailer_id

    def get_user_id(self):
        """Auslesen des Zugehörigen Käufer in dem Listeneintrag"""
        return self._user_id

    def set_user_id(self, user_id):
        """Setzen des Zugehörigen Käufer in dem Listeneintrag"""
        self._user_id = user_id

    def get_list_id(self):
        """Auslesen der übergeordneten Liste des Listenelement"""
        return self._list_id

    def set_list_id(self, list_id):
        """Setzen der Übergeordneten Liste des Listenelements"""
        self._list_id = list_id