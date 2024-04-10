
# Hotels Application

A replica of the "Booking.com". The user can select the place that he wants to visit and filter the data based on filters. The application was build using booking's api.


## How to use

Clone or download repo NodeJS / NPM / Yarn should be installed in your PC

Open terminal or Git for Windows (Git Bash) Run these commands:

## Install Dependencies

```bash
  yarn install

  OR

  npm install
```

## Run App

```bash
  yarn start

  OR

  npm start
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

## Build App

```bash
  npm run build
```
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
## API Reference

### App was build using booking's api from rapidapi.com

#### Get selected location

```http
  GET https://booking-com.p.rapidapi.com/v1/hotels/locations
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `location` | `string` | **Place location** |

#### Get hotels 

```http
  GET https://booking-com.p.rapidapi.com/v1/hotels/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `checkin_date`      | `string` | **Check in date** |
| `checkout_date`      | `string` | **Check out date** |
| `room_number`      | `number` | **Number of rooms** |
| `adults_number`      | `number` | **Number of travelers** |
| `order_by`      | `string` | **Order by** |
| `dest_id`      | `string` | **Destination id** |


