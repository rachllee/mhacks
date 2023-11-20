## Installation
First install the necessary packages by running npm install in terminal. Then, run the app by calling command npx expo start. If it doesn't work, try npx expo start --tunnel

## Inspiration
Students love finding and wearing cute school spirit, especially at games or tailgates. However, tailgating clothes specific to a college are quite hard to find, especially at a reasonable price or secondhand. We created a platform that makes it easy for students of a particular campus to trade and pass down their school spirit, building the community and helping the planet in the process.

## What it does
A student creates and logs in with their account info to be taken to an interface of four pages. The first is a home page, where they can scroll through other listings and filter results based on their preferences. The second is a cart they can add to once they discover pieces they like. The third is a profile page, where they can access their information as well as pieces they've previously bought, listed, or sold. The fourth is a seller's page, where they can upload a picture and other information to be listed to other students. 

## How we built it
Most of our work was built with React Native. A Firebase database stores account and item information and links relevant data to the specific user.

## Challenges we ran into
1. Servers. We ran into trouble in hosting them both locally and on Google Cloud, which resulted in a significant setback for the incorporation of our various API's.
2. Storing images. Storing user input for images in a database was surprisingly more complicated than expected. We first attempted to use Firebase's built in storage feature, but couldn't find a way to link the image with the rest of the item data. We then attempted to encode the user's image into a Base64, then decode it on the homepage. Unfortunately, the built in method for encoding an image failed to produce a valid encoding.
   
## Accomplishments that we're proud of
Pretty frontend and color schemes, a fully functioning and fully integrated database, ability to list items and add items to cart, individual users and unique logins, and more

## What we learned
Mobile is hard

## What's next for CampusCloset
AI feature that automatically tags pictures with their attributes, location filtering to find the closest listings to a user, filtering based on item attribute, and more!

