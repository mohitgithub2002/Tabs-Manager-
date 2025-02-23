# Tabs Manager Backend Service

A robust Next.js-powered backend service that provides the core functionality for the Toby browser extension clone. This service handles tab collection management, user authentication, and session storage with a focus on security and scalability.

## 🚀 Features

- **Authentication & Authorization**
  - Google OAuth 2.0 integration
  - Secure session management
  - Role-based access control

- **Collection Management**
  - Create and organize tab collections
  - Session-based tab grouping
  - Bulk operations support
  - Real-time updates

- **Data Management**
  - MongoDB integration
  - Efficient data querying
  - Data validation and sanitization
  - Automatic backup support

- **Security**
  - CORS protection
  - Rate limiting
  - Input validation
  - Data encryption

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (v5.0 or higher)

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/mohitgithub2002/tabs-manager.git
cd tabs-manager
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables by creating a `.env` file:
```env
# Authentication
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_string
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# API Configuration
API_RATE_LIMIT=100
API_RATE_WINDOW=900000
CORS_ORIGIN=chrome-extension://your-extension-id

# Environment
NODE_ENV=development
```

## 🚦 Development

Start the development server:
```bash
npm run dev
```

For production build:
```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm start` - Runs production server
- `npm test` - Runs test suite
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code using Prettier


## 📚 API Documentation

Comprehensive API documentation is available in the [API Documentation](./docs/api.md) file. The API includes:

- Collection Management
- Session Handling
- User Authentication
- Tab Organization

## 🏗️ Project Structure

```
backend/
├── app/              # Application logic
├── components/       # Reusable components
├── docs/            # Documentation
├── lib/             # Utility functions
├── middleware/      # Custom middleware
├── models/          # Database models
├── public/          # Static files

```

## 🔒 Security

- All endpoints require authentication
- Data is validated using mongoose schemas
- CORS is configured for extension-only access
- Rate limiting prevents abuse
- Input sanitization prevents injection attacks

## 🚀 Deployment

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Start the server:
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow the existing code style
- Include tests for new features
- Update documentation as needed
- Create issues for major changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication

## 📞 Support

For support, please open an issue in the GitHub repository or contact the team at mohit.work2002@gmail.com.
