import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import jwt from 'jsonwebtoken';

const keys = require('../../config/keys.js');

export { getUser };

async function getUser(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  const auth0User = await fetch(`${keys.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await auth0User.json();

  var token = jwt.sign(userData, keys.jwtKey);

  const userProfile = await fetch(`${keys.comicApi}user/currentuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await userProfile.json();

  return data;
}
