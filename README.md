![](https://img.shields.io/badge/Microverse-blueviolet)

# Shooter

![Demo Gif](gif link)

> A shmup game coded in JavaScript using Phaser. 

![screenshot](screenshot link)

<Game intro>

## Built With

- HTML, CSS and JavaScript
- [NodeJS](https://nodejs.org) is required to install dependencies and run scripts via `npm`
- ES6 support via [Babel 7](https://babeljs.io/)
- [Webpack 4](https://webpack.js.org/) for hot-reloading for development and production-ready builds.
- More here

## Live Demo

[Live Demo Link](demo link)

## Code Review

- Clone this repository. 
- Switch to the `game` branch. 

## Development Instructions

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.

I obtained a unique ID for my game by querying the leaderboard API provided by Microverse, using `curl`

```
curl --header "Content-Type: application/json" --request POST --data '{"name": "Shooter Game by Keshav"}' https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/

{"result":"Game with ID: Qa2XUOTtOtFp4SJONyU5 added."}
```

After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Customizing Template

### Babel
You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently
targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

  ```
  "browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
  ```

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.

### Usage

- <Game instructions here>


## Author

👤 **Keshav Chakravarthy**

- Github: [@keshav-c](https://github.com/keshav-c)
- Linkedin: [k3shavchakravarthy](https://www.linkedin.com/in/k3shavchakravarthy/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues link).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- This projects uses the template for Webpack based projects given [here](https://github.com/photonstorm/phaser3-project-template)
- Microverse for reviewing the code
- The Odin Project for the assignment details
- 
- Other acknowledgements...

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
