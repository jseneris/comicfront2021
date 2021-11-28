import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getUser } from '../../../helpers/api/getUser';
const keys = require('../../../config/keys.js');

export default withApiAuthRequired(async function publishers(req, res) {
  try {
    const user = await getUser(req, res);
    const publishers = await fetch(`${keys.comicApi}admin/publishers`, {});
    const data = await publishers.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
