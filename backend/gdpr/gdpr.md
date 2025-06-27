# Documentation on how we implemented GDPR compliance in our backend

## User Creation

It is assumed that the user has already agreed to the GDPR terms and conditions when the request is made to create a new user.
Therefore, we just create an acceptance record in the `gdpr` collection with the user ID and the current timestamp.
