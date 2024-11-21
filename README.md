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
