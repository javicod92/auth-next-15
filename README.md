# Credentials Creation and Validation System

This project is a modern platform for **creating and validating user credentials**

## 🛠️ Used technologies
- **Next.js 15**: React framework, for creating faster server-side web applications
- **React 19**: JavaScript library for creating dynamic and reusable user interfaces
- **TypeScript**: JavaScript superset for adding static typing and error prevention
- **Tailwindcss and Sass**: To provide the user with modern interfaces
- **Axios**: JavaScript library used to easily handle HTTP requests and responses
- **Bcryptjs**: Secure encryption for user passwords
- **Cookie**: used to handle session and authentication data
- **Jsonwebtoken (jwt)**: Used to create secure tokens for authentication systems
- **Mongoose**: Used to manage the non-relational database MongoDb
- **Resend**: Used for sending e-mails for password changes and notifications
- **Zod**: Used for schema and data validation to guarantee integrity

## 🚀 Main Functions
**Credential creation**:
- User registration with data validation via Zod
- Secure passwords with Bcrypt encryption

**Credential validation**:
- Login with JWT-based authentication
- Secure session management with cookies and middlewares
- Integration with MongoDB to store and manage users

**Advanced password validation**:
- Minimum length of 8 characters
- Requires at least one uppercase letter, one lowercase letter, one number and one special character

**Modular design**:
- Clear folder structure for easy maintenance and collaboration

## 📸 Project Screenshots
**Login Page**
![Captura de pantalla 2024-11-21 202722](https://github.com/user-attachments/assets/522c62f5-8277-4e81-84b7-a3554c03c566)

**Register Page**
![Captura de pantalla 2024-11-21 203115](https://github.com/user-attachments/assets/32fadf1c-c463-4ddc-b549-c90c555562b3)

**Recover Password Page**
![Captura de pantalla 2024-11-21 203138](https://github.com/user-attachments/assets/34c8dc50-588a-40c5-b4bf-6d23b60e95e7)

**User in Database (Local)**
![Captura de pantalla 2024-11-21 203309](https://github.com/user-attachments/assets/cf517e6a-e25e-4500-abc7-7bf5447f9d4a)

**Password recovery email**
![Captura de pantalla 2024-11-21 204438](https://github.com/user-attachments/assets/05a072f4-d607-4fe7-ad47-1cf1b9855adb)

**Change Password Page**
![Captura de pantalla 2024-11-21 204541](https://github.com/user-attachments/assets/70e0443a-5efd-4344-ab98-67fd5812cb15)

## 🥁 What makes this project interesting?
- **Advanced security**: Use of encryption and strong authentication with JWT
- **Full validations**: Ensures correct data using Zod, which avoids common errors
- **Modern integration**: Mail notifications with Resend for a better user experience
- **Scalable code**: Modular structure for easy maintenance and new features

## 💻 Installation and Configuration
1) **Clone this repository**: https://github.com/javicod92/auth-next-15.git
2) **Installs the dependencies**: npm install
3) **Run the development server**: npm run dev

## 🙌 acknowledgments
This project was made possible thanks to the resources and learning shared at:
-[Mauro](https://www.youtube.com/watch?v=_Xa2meKyXas&t=1132s)
