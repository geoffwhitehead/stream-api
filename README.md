# Stream API

# Description

Build a service in Node.js that exposes an API which can be consumed from
any client. The service must check how many video streams a given user is watching and
prevent a user watching more than 3 video streams concurrently.

## Requirements

- docker
- docker-compose

## Running the app

1. Install requirements above
2. `cd` into repo
3. run `docker-compose up`

## Description

A user can only request 3 streams at the same time.
A user id stored in the request header is used to uniquely identify a user `x-user-id` and simulate mocking of a token.
Redis is used as a simple data store. A count is stored against a user id which represents the number of active streams for this user.
As streams start and end this count is increased and decreased. A check is performed to ensure that a stream is not opened if the count would exceed `MAX_STREAMS` defined in the environment variables.

## Testing

- set the `slowdown` property in `src/config.ts` to give time to open multiple requests.
- You can run this in a terminal to test. `curl -H "x-user-id: <userId>" -X GET "http://localhost:3000/resource/a" --no-buffer --output test.mp4 -v` providing a userId header. The `-v` property will provide detailed response information.

#### Responses

- 200 OK
- 400 Max simultaneous streams reached
- 404 Asset not found
