import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import * as crypto from 'crypto';
import { UserProfile } from '../v1/models';
import CONFIG from '../configs/config';
const jwtAuthz = require('express-jwt-authz');


/**
 *  Validate the JWT and sets the req.user with the information contained in the JWT
 */
export const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

export const isAdmin = jwtAuthz(['admin']);


const base64URLEncode = (str) => {
  return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
};

const sha256 = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest();
};
/**
 * Utility function to authentificate (Native app eg android/ios...)
 */
export const codeFlowWithPCKE = () => {
const verifier = base64URLEncode(crypto.randomBytes(32));
const challenge = base64URLEncode(sha256(verifier));
  return {
    challenge: challenge,
    verifier: verifier
  };
};