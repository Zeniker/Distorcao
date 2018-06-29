class json_response(object):
    def __init__(self):
        self.status = ""
        self.data = None

    def to_dict(self):
        return dict(
            status=self.status,
            data=self.data
        )