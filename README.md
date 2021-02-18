# Solution

This is a suuuuper simple and basic chat. Two main parts: A server that holds up to 20 messages (latest) in a array and serves a socket.io for the client to connect to and broadcast messages. The client is a react app built with Next.js and Tailwind that fetches on load (server render) the latest messages and connects to the server socket to emit and receive messages.

On launch, an unique ID is created and stored on the user's local storage, then a name is requested using a window prompt. From there and after a reload, we're able to show sent messages by matching this ID to the user's id in the message we are displaying.

# Areas of improvements

- The fact that the ID is stored in the localStorage allows a user with knowledge to send messages on behalf of other users.
- Ideally, we should store all the messages (data is everything!) and only return the last 20 or so messages on launch.
- The ui automatically focuses the input and scrolls to the bottom of the messages when a message is received, what if the user is reading something? We should take care of this for a better experience

# Usage

To use this project, simply do: `docker-compose build` and then `docker-compose up`. You can then open a browser to http://localhost:3000/ to access the app or http://localhost:4000/api/messages to see the last 20 messages. Open multiple apps (incognito or different browsers) to chat as multiple users.
