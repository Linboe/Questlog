# Questlog
## Live Link

👉 [Link to Live Portfolio](https://.vercel.app/)

## Project Description
A game backlog app built with React, TypeScript and React Router. Games are stored in the Questlog API under a handle chosen by the user.

## Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

* **Node.js**
* **npm**
* **Git**
* **VS Code** (recommended editor)


### Installation & Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/Linboe/questlog.git
```

2. **Navigate to the project directory and open in VS Code**

```bash
cd questlog
code .
```

3. **Install project dependencies and start the development server**

```bash
npm install
npm run dev
```

`npm install` installs everything listed in `package.json` (React, React Router and the rest), so no other packages need to be installed by hand.

4. **Access the application**

Open your browser and navigate to http://localhost:5173 (the default Vite port). The terminal prints the exact address if the port is taken.

### Choosing a handle

The API has no login. Every user picks a handle, and the games are saved under it. Nobody else's games show up there.

* A handle is 2-40 characters: `a-z`, `0-9` and `-`.
* The first time a handle is used, the API gives it five demo games.
* Anyone who uses the same handle sees and changes the same games, so pick a unique one, for example `your-name-questlog`.

To switch handle, type a new one in the **Username** field in the header and click **Switch**. The choice is saved in the browser. To change the handle used on a first visit, edit `DEFAULT_HANDLE` in `src/config.ts`.

## Custom hooks

All data fetching lives in custom hooks in `src/hooks/`. The pages and components only render data and call the hooks. I built it this way so the components stay small and readable, the fetch logic exists in one place, and the API can be changed without touching the UI.

### `useGames(status)` (`hooks/useGames.ts`)

Fetches the list of games and fetches again when the status filter changes. Returns `{ games, message, isLoading }`. The hook remembers which filter the loaded data belongs to. While that differs from the current filter, `isLoading` is true. This way an old list is never shown for a new filter, and `isLoading` never has to be set inside the effect. A cleanup flag (`ignore`) makes sure a late response for an old filter cannot overwrite a newer one.

### `useGame(id)` (`hooks/useGames.ts`)

Fetches one game in the same way. Returns `{ game, setGame, message, isLoading, notFound }`. `notFound` is true on a 404, so the page can show the 404 page without knowing about the API's error type. `setGame` lets the page show the updated game that PATCH returns, without fetching again.

### `useSaveGame()` (`hooks/useGames.ts`)

Handles POST, PATCH and DELETE through `addGame`, `editGame` and `removeGame`. Returns `{ isSaving, message, addGame, editGame, removeGame, clearMessage }`. One helper runs each request, tracks `isSaving` and stores an error message in `message`. The functions return the result (or `null` / `false` when something went wrong), so the page decides what happens next, for example navigating away or closing the edit form.

### `useLocalStorage(key, initialValue)` (`hooks/useLocalStorage.ts`)

Works like `useState` but also saves the value in `localStorage`. It reads the stored value once on mount (lazy initialization) and writes it in an effect whenever the value changes. It is used for the status filter (key `questlog-filter`), so the selected filter is still there after a reload.

## Reflection

This project was built with the help of Claude. I wanted to use it as extensively as possible in order to understand the tool and to see what it is like to rely on it, so the project is partly an exploration of AI-assisted development.

### How I used Claude

1. **Setup.** I created the folder structure myself and gave Claude the assignment text. I also wrote a standing instruction that told it to act as a senior developer and code reviewer: challenge my approach, point out risks such as bugs, edge cases and performance problems, state clearly when it was unsure, and keep naming and structure consistent throughout the chat. I asked it to build the project step by step, in the order a developer would build it by hand.
2. **Implementation.** Claude wrote the types, the API layer, the components, the pages, the routing and the CSS. When its answers went beyond what I wanted, I narrowed the scope. For example, I asked for routing only, and I asked it to stay within the requirements of the assignment.
3. **Debugging.** I ran the app locally and reported the problems I found. ESLint flagged synchronous `setState` calls inside effects, which Claude fixed by deriving the loading state instead. I also noticed duplicate GET requests in the Network tab, and Claude explained that they come from React's `StrictMode` in development.
4. **Understanding the code.** I asked conceptual questions instead of only copying code: what the `platform` field means, where the games are stored, why React Router still triggers new fetches, and how a handle works as a user identity.
5. **Features beyond the minimum.** I decided to add handle switching in the header, notes and a cover URL when creating a game, an edit form, and a confirmation before deleting. Claude implemented them.

### To what extent I used Claude

Claude wrote almost all of the source code. My contribution was the direction and the decisions: which features to include, how far to go beyond the requirements, and when the code had to follow the documentation or my teacher's style. I also did the testing in the browser, reported errors and reviewed the generated code. I made minor formatting adjustments myself.

### What I learned

* Claude is fast at producing structured and consistent code, and it works best with a precise specification, such as the assignment text and the API documentation.
* When information is missing, Claude makes assumptions. Most of them turned out to be correct, but they still had to be verified against the primary source, which was the documentation.
* Claude cannot run the code in my environment. Problems such as the ESLint errors and the duplicate requests only appeared when I ran the project myself, so testing cannot be handed over.
* Relying on generated code is risky if it is not understood. I tried to reduce that risk by asking why the code works as it does, by reviewing it, and by explaining the hooks in this README.
* Careful review is still necessary. Even small details, such as an empty `catch` block, needed a human reader.
* Working this way was very effective, but compared to my other projects I could not explain the code as thoroughly, and I felt I had less control over it. Since I had not written it myself, I understood the details less well than if I had built it by hand.