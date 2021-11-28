import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getUser } from '../../../helpers/api/getUser';

export default withApiAuthRequired(async function user(req, res) {
  try {
    const user = await getUser(req, res);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
