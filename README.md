# Node_React_Web_Application
This is a full stack web application where user have to create their account and can start creating their favourite book list.

Backend - Javascript, Node.js
Frontend - HTML, CSS, React.js
Database - MongoDB

**Features**
1. Created **Login/Signup Page**.
2. Used **JWT Token Authentication** as middleware for authorizing API calls and navigating to dashboard.
3. Created **CRUD APIs** on Book Lists.
4. **Add Book**, **Delete Book**, **Edit Book** buttons are available.
5. **Logout** functionality is Implemented.
6. Code Reusability as used same screen for login/signup and same form for edit and add new book card.


-> This is the opening page of our appliction. If user has already signed up he can login using its credentils or can click on **Need to sign up?** button.
![Screenshot from 2023-02-13 00-06-33](https://user-images.githubusercontent.com/30487756/218331129-f399fd31-eaf9-4a91-9058-7c60cfa0517f.png)

-> This is the sign up form and user can create his account here.
![Screenshot from 2023-02-13 00-08-21](https://user-images.githubusercontent.com/30487756/218331341-24887d58-b815-46fe-856c-4247b33cd138.png)

-> Added Validations in email and password. Only proper email and password can be used rather than any garbage data.
![Screenshot from 2023-02-13 00-07-45](https://user-images.githubusercontent.com/30487756/218331386-32492de5-a29e-4c16-947a-194bfa7ef67f.png)

-> After successfull login user redirects to dashboard with create, read, edit and delete functionality.
![Screenshot from 2023-02-13 00-18-47](https://user-images.githubusercontent.com/30487756/218331434-0f0718db-a442-4dbd-86b1-ac365070a1b9.png)

-> When clicked on **Add Book** button user redirects to new form where he can add his another favourite book in the list.
![Screenshot from 2023-02-13 00-19-55](https://user-images.githubusercontent.com/30487756/218331491-a223d184-aa8c-447a-90b7-1a76162e3649.png)

-> when clicked on **Edit** button on any book card. He can update his book details and save them.
![Screenshot from 2023-02-13 00-24-36](https://user-images.githubusercontent.com/30487756/218331588-e774042c-bc30-44cd-b0c2-af1502d89864.png)

-> User can **Delete** any book card.
