import { GoogleAuth } from './GoogleAuth';

describe('GoogleAuth class', () => {
  it('should construct correctly', () => {
    const ga = new GoogleAuth();
    expect(ga.access_token).toBe('');
    expect(ga.client).toBe(undefined);
  });

  it('should initialize the client', () => {
    const ga = new GoogleAuth();
    ga.initClient();
  });
});
