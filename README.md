# Multi-Factor Authentication

This project implements a Multi-Factor Authentication (MFA) system using **Passport.js**, **Speakeasy** for 2FA, and Express middleware. The authentication flow includes username/password verification and an optional 2FA layer using a QR code for added security.

## Features

- **User Registration & Login**: Users can register with a username and password, which are stored securely with bcrypt hashing.
- **2FA Setup & Verification**: Users can enable two-factor authentication (2FA) to add a second layer of security.
- **QR Code Generation**: Users can scan a QR code to configure their authentication app for 2FA.
- **Session Management**: Sessions are managed using Express session middleware and Passport.js.
- **Logout & MFA Reset**: Users can log out and reset their MFA configuration if needed.

## Technology Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework for handling routing and middleware.
- **MongoDB & Mongoose**: Database and ODM for user data.
- **Passport.js**: Middleware for authentication.
- **bcryptjs**: Library for hashing passwords.
- **Speakeasy**: Library for generating and verifying 2FA tokens.
- **QR Code**: Generates QR codes for setting up 2FA.
- **Express-Session**: Middleware for session management.
- **dotenv**: Loads environment variables.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ruwais-zaid/MultiFactor_Authentication
   
   cd MultiFactor_Authentication
