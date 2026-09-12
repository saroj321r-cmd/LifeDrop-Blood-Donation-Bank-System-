# LifeDrop Blood Bank Management System

Black + red Blood Bank Management System using Node.js, Express, EJS, MongoDB and JWT.

## Authentication
JWT is accepted from:
- Authorization: Bearer <token>
- Cookie: token

The cookie is HTTP-only. JWT payload contains userId, name, email and role.

## Roles
- user
- admin

A user can register as a donor; donor is a profile/feature, not a separate login role.

## Run
1. Create `.env` from `.env.example`.
2. Add your MongoDB URI.
3. Choose your own JWT_SECRET.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open http://localhost:5001

Do not upload `.env` to GitHub.
# LifeDrop-Blood-Donation-Bank-System-
