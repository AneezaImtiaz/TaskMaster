# Task Master

**Note**: Ensure you have completed the [Setup](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) before proceeding.


## Table of Contents
- [Installation](#installation)
- [Starting the Application](#starting-the-application)
- [Testing](#testing)
- [Storybook](#storybook)
- [Troubleshooting](#troubleshooting)
- [Improvements](#improvements)

## Installation

### Step 1: Install the Dependencies

First, you need to install all required dependencies. To install, run the following command from the _root_ of your project:

```bash
npm i
```

## Starting the Application

### Step 2: Start the Development Server

Start the development server using Vite. Run the following script from the root of your Vue project:

```bash
npm run dev
```
This will start the Vite development server, and you can view your application at http://localhost:5173.

## Testing

To run the unit tests, execute the following script:

```bash
npm run test
```

## Storybook

To run the storybook, execute the following script:

```bash
npm run storybook
```
This will start the Vite development server and you can view your storybooks at http://localhost:6006.

## Troubleshooting

If you encounter issues running the app, run the following script to clear all caches and reinstall everything from scratch:

```bash
npm run cleanNpm
```

If you encounter issues running the storybooks, run the following script to clear all caches:

```bash
npm run clear-storybook-cache
```

## Improvements

- **Search Feature**: Enhance functionality by providing a search feature for the task to filter the list of task according to your demand.