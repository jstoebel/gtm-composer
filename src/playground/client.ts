import secrets  from './secrets.json'
import {google} from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  secrets.client.client_id,
  secrets.client.client_secret,
  secrets.client.redirect_uris[0]
);

oauth2Client.on('tokens', (tokens: any) => {
  if (tokens.refresh_token) {
    // TODO: write refresh token back to secrets.json
    console.log('got a new refresh token!', tokens.refresh_token);
  }
});

oauth2Client.setCredentials(secrets.user)

export default google.tagmanager({
  version: 'v2',
  auth: oauth2Client,
});
