# Attendance Portal Frontend

This is the frontend application for the Attendance Portal, a full-stack web application for managing attendance records using React.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

The frontend of the Attendance Portal is a React application responsible for providing a user interface for managing attendance records. It interacts with the backend API to perform operations such as user authentication, marking attendance, viewing records, etc.

## Prerequisites

Before running the frontend application, ensure you have the following installed:

- Node.js (v14 or later)
- npm (Node.js package manager)
- Access to the backend server (ensure the backend server is running)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Chandrasura25/Attendance-Portal-Frontend
   ```

2. Navigate to the frontend directory:

   ```bash
   cd attendance-portal-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the frontend development server, run the following command:

```bash
npm run dev
```

The development server will start running at `http://localhost:5173`, and you can access the application in your web browser.

## Folder Structure

The folder structure of the frontend application is as follows:

```
attendance-frontend/
  |- public/
  |- src/
     |- components/
     |- pages/
     |- utils/
     |- App.js
     |- index.js
  |- ...
```

- `public/`: Contains static assets and the HTML template.
- `src/`: Contains the source code of the React application.
- `components/`: Contains reusable UI components.
- `pages/`: Contains page components representing different routes.
- `utils/`: Contains utility functions or modules.
- `App.js`: Entry point of the React application.
- `index.js`: Main file for rendering the React application.

## Dependencies

The frontend application uses the following major dependencies:

- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: Library for declarative routing in React applications.
- `axios`: Promise-based HTTP client for the browser and Node.js.

For a complete list of dependencies, refer to the `package.json` file in the project directory.

## Contributing

Contributions to the frontend of the Attendance Portal are welcome! If you find any bugs, want to suggest new features, or contribute improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).