# MyHeadphones (cf-project)
This project can be accessed on [GitHub Pages.](https://yd24.github.io/cf-project)

## Objective
Create a website that can be used to keep track of personal headphone collections. Inspired by database collection sites
such as MyFigureCollection.

## Requirements
* Website should use HTML/CSS and vanilla Javascript. Javascript libraries such as jQuery or React should not be used, nor CSS
frameworks such as Bootstrap or extensions such as SASS. Resource scripts such as fonts and icons are fair game.
* Website should be responsive and display properly on desktop formats.
* Deployed on Github Pages.
* Accept user input and have persistent user states.

## Description
### Website Architecture
MyHeadphones has the following structure:
* Landing page
  * All Headphones page
    * Single Headphone page
  * About Us page
  * User Profile page

The Single Headphone page and User Profile page are populated with dynamic data. URL routing is implemented through
the user of query params and Javascript.

### Accounts
Users can create an account or login to an existing account from any point on the site. 

Since GitHub Pages does not support serverside code, account data is stored in localStorage and validation performed by Javascript. Should this website ever be taken to production state, it is recommended to use a backend service so that data can be persisted across machines.
And use of a database rather than localStorage would bring performance improvements and better data encapsulation/security.

As currently, user accounts only persist on the user's browser, test accounts are created when first visiting the landing page. Users
are all given a random profile image, as there is currently no way to upload and store personal images.

### Data
We have three main objects in use through the site:
* Headphone
* User
* Review

Prepared headphone data is fetched from **test.json** and kept in memory as a replacement for a database. Review objects act similarly to an
associative table, keeping track of a many-to-many relationship between Headphone and User. All persistent data is kept on localStorage.

Should anyone want to add or edit the existing headphones data, they can simply modify **test.json** and follow the JSON structure.

### User Flow
* Upon visiting the site, the user can create an account by clicking the **Sign Up** buttons to access the login modal. They will be automatically logged in after account creation.
* The user can browse the current list of headphones on the **All Headphones** page. Multiple filters and sorting can be applied
to the list.
* The user can see individual information for each Headphone and see reviews from themselves/other users.
* If the user wants to manage their personal collection, they can do so from their **User Profile** page.
* On the **User Profile** page, the user can add/remove headphones from their collection. By pressing the **Add Headphones** button,
the user can access a modal that lists all of the headphones that they can add to their collection. By pressing the **Remove Headphones** button, the user can then remove headphones from their collection by pressing the X buttons and clicking **Save.**
* They can also add/edit/remove reviews for headphones that they already own. By clicking **Add Review**, the user can pick a headphone
that they own and add their own review. By clicking the **Edit** symbol next to their reviews, they can choose to edit the review content
or delete the review.

## Closing Thoughts
This project was a good way to apply the fundamentals of web development and the basics of handling persistent user data. 
Should there be a chance to work on this project more in the future, I would like to transition the site to using a backend service
and database so that data can persist outside of the user's browser. I would also like to adjust the design to be mobile-friendly
and be better compliant to web accessibility standards. 

Additional features that I'd like to implement are:
* An admin panel for adding headphones and managing users.
* Ability to upload profile images and add profile details such as Bio.
* Ability to post and browse blog/thread entries.
* Ability to upload personal images and FR measurements for headphones.
* Ability to compare headphones.
