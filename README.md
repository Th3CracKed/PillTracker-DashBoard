# PillTracker-DashBoard


# To Access APi As Mobile (Authorization Code Flow with PKCE) for testing purpose:

- Use access to token with admin permission 
- You can use GET :auth0 to get CODE_CHALLENGE and CODE_VERIFIER


First get the authorization code : 

https://dev-8a2udvoy.auth0.com/authorize?
    response_type=code&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    client_id=CLIENT_ID&
    redirect_uri=http://localhost:3000/callback&
    scope=openid%20profile%20email%20admin%20offline_access&
    audience=https://PillTracker/api&
    state=STATE

then get the id/access/refresh tokens
curl --request POST \
  --url 'https://dev-8a2udvoy.auth0.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=authorization_code \
  --data 'client_id=CLIENT_ID' \
  --data code_verifier=CODE_VERIFIER \
  --data code=CODE \
  --data 'redirect_uri=http://localhost:3000/callback'
  


# Resources : 
[NodeJS 23 security best practices](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d)