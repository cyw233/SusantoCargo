# Introduction
A **MERN stack** website built with MongoDB, Express.js, React.js and Node.js, which is mainly for shipment management.

You can simply click [here](https://vast-refuge-19212.herokuapp.com/) to view the website. This app is deployed using [Heroku](http://www.heroku.com/) and the database of this app is managed by [mLab](https://www.mlab.com)

# Usage

1. Clone or download this repo.

2. Create a file called *keys_dev.js* in the *config* folder, and add following code:

   ```
   module.exports = {
     mongoURI: <YOUR_OWN_MONGODB_URI>,
     secretOrKey: <YOUR_OWN_SECRET>
   };
   ```

3. Make sure you have [Node.js](https://nodejs.org/en/) installed  

4. Run the following commands to install required library packages and start the app

   ```
   # Install dependencies for server
   $ npm install
   
   # Install dependencies for client
   $ npm run client-install
   
   # Run the client & server with "concurrently" library
   $ npm run dev
   ```

# Functions

**1. Authentication**

Shipper and Collector as two super users can login with pre-defined email and password (You need to manually add these two accounts to the database). Normal customers can sign up with personal information.

**2. User Profile**

Normal users can update their personal information.

**3. Password Reset**

Normal users can reset their password after login.

**3. Shipment Booking Management**

Shipper can modify the status of bookings. Normal customers can create shipment bookings by providing information like number of boxes, departure, destination, period and an optional message. 

**4. Shipment Acknowledgement**

After users create an shipment, they can view the shipment information and status by clicking the "View Status" button. The shipment status is synchronously updated as Shipper updates it.

**4. Automatic Email Notification**

Whenever a shipment status is changed by the shipper, an automatic email notification including the latest shipment status will be sent to the corresponding customer. 













