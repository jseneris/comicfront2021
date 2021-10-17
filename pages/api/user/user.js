import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Console } from 'console';
import { access } from 'fs';
import jwt from 'jsonwebtoken';

const keys = require('../../../config/keys.js');

export default withApiAuthRequired(async function user(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const auth0User = await fetch(
      `https://${keys.AUTH0_ISSUER_BASE_URL}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await auth0User.json();

    var token = jwt.sign(userData, keys.jwtKey);

    const userProfile = await fetch(`${keys.comicApi}user/currentuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await userProfile.json();
    res.status(200).json(data);
  } catch (error) {
    console.log('error', error);
    res.status(error.status || 500).json({ error: error.message });
  }
});
