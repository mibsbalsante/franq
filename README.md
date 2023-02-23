# Franq Code Assessment - Finance APP

You can see it live [here](https://franq-mibsbalsante.vercel.app/)

**The login page accepts any data, type an username and a password to get to the dashboard.**

## Prerequisites

Before you can install and run this project, you need to have the following software installed on your computer:

- Node.js (version 16 or 17)
- Yarn (version 3.4.1 is inside the project)

## Installation

1. Open a terminal window and navigate to the root directory of the project.
2. Run the following command to install the project dependencies:

```
yarn
```

## Running the Project

1. Once the installation is complete, you can start the development server by running the following command:

```
yarn dev
```

This will start a development server on your local machine and open your web browser to the [default URL](http://127.0.0.1:9000/). You can make changes to the code and the browser will automatically refresh to reflect the changes.

2. If you want to build the project for production, run the following command:

```
yarn build
```

This will create a production-ready build of your application in the `dist` directory.

## Linting

To run the linter, which checks for coding errors and style issues, run the following command:

```
yarn lint
```

## Committing Changes

To commit changes to the project using the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standard, run the following command:

```
yarn cz
```

## Previewing Production Build

To preview the production build locally, run the following command:

```
yarn preview
```

## Extras instructions

- [HG Finance API](https://hgbrasil.com/status/finance/) isn't accessible for client requests, so I've created a simple Express.js server to handle the requests
  <details>
    <summary><strong>Node.js code</strong></summary>

  You can see it live [here](https://hgbrasil-api-mibsbalsante.vercel.app/)

  ```js
  import * as dotenv from "dotenv"
  import express from "express"
  import fetch from "node-fetch"
  import cors from "cors"

  dotenv.config()

  const app = express()
  const port = process.env.PORT || 80

  const apiURL = process.env.API_URL
  const apiToken = process.env.API_TOKEN

  const requestURL = new URL(apiURL)
  requestURL.search = `key=${apiToken}`

  app.use(cors())

  app.get("/", async (req, res) => {
    try {
      const response = await fetch(requestURL)
      const data = await response.json()
      res.json(data)
    } catch (error) {
      console.error(error)
      res.status(500).send("Something went wrong")
    }
  })

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
  ```

  </details>

- The interface change following your device color scheme. To toggle quickly between color schemes, do the following:
  - Open Chrome Inspect Tools
  - CTRL + P
  - "Show Rendering"
  - Scroll all the way until you find **Emulate CSS media feature prefers-color-scheme**
- Any questions, reach me out through [my email](mailto:mibsbalsante@gmail.com)

## License

This project is licensed under the [GNU License](./LICENSE).
