import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();

// export default handleAuth({
//   async login(req, res) {
//     try {
//       await handleLogin(req, res, {
//         authorizationParams: {
//           audience: 'http://localhost:3000/api/auth', // or AUTH0_AUDIENCE
//           // Add the `offline_access` scope to also get a Refresh Token
//           scope: 'openid profile email read:products', // or AUTH0_SCOPE
//         },
//       });
//     } catch (error) {
//       res.status(error.status || 400).end(error.message);
//     }
//   },
// });
