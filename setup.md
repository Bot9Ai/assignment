# Project Setup

Follow these steps to set up and run the project locally.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- npm (Node package manager, comes with Node.js)
- Sequelize CLI (if not installed globally, install with `npm install -g sequelize-cli`)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project Directory **

```Bash
cd <project-directory>
```

3. **Install the node modules**

```bash
npm install
```

4. Run Sequelize migrations

```bash
npx sequelize-cli db:migrate
```

5. **Start the development server**

```bash
npm run dev
```

**To get requirement about the available rooms**

```bash
curl --location 'http://localhost:4000/api/chat' \
--header 'Content-Type: application/json' \
--data '{
    "userId":"1",
    "query":"can you provide information about available rooms"
}
'
```

**To Book the Room**

```bash
curl --location 'http://localhost:4000/api/chat' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId":"1",
    "query":"I would like to book a room. The room name is Deluxe Suite, my full name is John Doe, my email is johndoe@example.com, and I want to book it for 3 nights."
}
'
```
