# T.H.E.R.E.: The Hottest Electronic Rave Experience
Find me on: [LinkedIn](https://www.linkedin.com/in/manilabui/)
<!-- [Portfolio](www.manilabui.com)|[LinkedIn](https://www.linkedin.com/in/manilabui/) -->

## About
T.H.E.R.E. is a virtual fanny pack for EDM (electronic dance music) fest schedules for fest attendees. As an EDM fan and fest attendee, I felt the pains of having only my unreliable memory to keep track of who I planned to see at each fest while traversing many different apps to find fest lineups. 

My app seeks to resolve these issues by allowing users to find these lineups in a single place while also giving them the ability to save fests to which they're going. In order to ease fest day planning, users can plan which artists they want to see at each of those fests with the app as well.

## Setup for Running Locally
Requirements: [NPM](https://www.npmjs.com/get-npm) | [JSON-Server](https://www.npmjs.com/package/json-server)

1. Clone this repository
1. `cd` into the directory it creates
1. In the `api` directory, create a copy of the `database.json.example` and remove the .example extension.
1. From the `api` directory, run `json-server -p 5002 -w database.json`.
1. Run `npm install` and wait for all dependencies to be installed
1. From the project root directory, run `npm start`.
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser in development mode.

---

###### Any user, including those without accounts, may look at the list of available fests as well as their corresponding lineups and schedules.
![](src/assets/there_loggedOutUser.gif)

###### Logged-in users can see a timeline of their upcoming events, and they may also either confirm or express interest (checkmark icon vs star icon) of their attendance to a set.
![](src/assets/there_loggedInUser.gif)

---

#### Technology Stack
- Mockup: Figma (Check out the mockup [here](https://www.figma.com/file/9VNwMnHPQYdneR0sDGsgWy/T.H.E.R.E.?node-id=4%3A2))
- JS: React with Hooks
- Styles: Tachyons, CSS
- Libraries: Lodash, Moment
- Graphics: Logo + some custom icons designed by me in Figma (Others were Material icons, also from Figma.)
- DB: JSON Server
- Version Control: Git, GitHub
