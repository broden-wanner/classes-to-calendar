from typing import List

from pydantic import BaseModel


class GoogleConfig(BaseModel):
    clientId: str
    apiKey: str
    scope: str
    discoveryDocs: List[str]
