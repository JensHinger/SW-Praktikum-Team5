from server.bo.BusinessObject import BusinessObject


class User(BusinessObject):

    def __init__(self):
        super().__init__()
        self._email = ""
        self._google_id = ""

    def get_email(self):
        """Auslesen der Email des gewählten Users"""
        return self._email

    def set_email(self, email):
        """Setzen der Email des gewählten Users"""
        self._email = email

    def get_google_id(self):
        """Auslesen der google_id des gewählten Users"""
        return self._google_id

    def set_google_id(self, google_id):
        """Setzen der google_id des gewählten Users"""
        self._google_id = google_id

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen listentry()."""
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_id(dictionary["google_id"])
        return obj
