interface Error {
  domain: string;
  location: string;
  locationType: string;
  message: string;
  reason: string;
}

interface ErrorDetail {
  '@type': string;
  domain: string;
  metadata: { service: string; method: string };
  reason: string;
}

export default interface ErrorMessage {
  code: number;
  message: string;
  status: string;
  details: Array<ErrorDetail>;
  errors: Array<Error>;
}
