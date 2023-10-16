# discord-clone

The Discord Clone was another fun full-stack project which put my knowledge of React and Node to the test. This application contains the basic functionalities of the Discord App which include creating, updating, and deleting an account, adding or deleting friends, and sending messages to those on your friend's list.

At the beginning during the design phase, I struggled a bit with creating the data models because I wasn't sure how I was going to implement a friend request system and how I was going to handle the chats/messages between users. But after doing some research on potential solutions, I opted to create a friend model to manage the friend status between users and a chat model to store messages between the participating users on top of having the basic user and message models. I mostly only used two models in my previous projects, so I never realized how powerful of a method populate was until I started populating nested paths for data from other documents. I was really impressed because populating gave me all the information I needed to display on my React page without having to call the API a second time.


