from pydantic import BaseModel


class GoogleConfig(BaseModel):
    clientId: str
    apiKey: str
    scope: str
    discoveryDocs: list[str]
