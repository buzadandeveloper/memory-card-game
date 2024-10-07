## Memory card game
 
Full description of card memory game find [here](https://www.classicgamesandpuzzles.com/Memory.html) (but don't get into many details)

Simple example of a playable game you can find [here](https://nichitaa.github.io/pokemon-card-memory-game/)

### General game rules: 
- The deck consists of `n` different card types (`n=5`)
- Each turn, you flip over `m` cards (`m=2`)
- If the flipped cards match, then they are removed from the game, otherwise they are flipped back
- The game ends when all the cards are removed

### App requirements:
- To get the cards you can use any public API you like (e.g.: [PokeAPI](https://pokeapi.co/docs/v2))
- You're using `react`, so you're free to use any state management solutions you prefer (don't over complicate it)
- Do not use UI libraries for components - write your own styles

### Development requirements:
- Create private repo and give to your team-mates and mentors access
- Work with pull requests, have a `master` branch each new feature/change needs to be created as a separated PR
- Use squash for merging to `master`
- Mark PRs as draft before working on it
- Add some PR description, with what and how it works, known limitations etc.
- Review your own PRs first and ask the teammate to review your PR as well after marking them as "ready for review"
    - If you are reviewing the PR, please leave comments on areas where you see that some logic can be improved or cleaned up
    - Don't blindly approve the PRs, take some time and try to understand each others progress and implementation logic
- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

### Additional features:

Implement those features only if basic requirement are clear and the game is playable. Each new additional feature is a separated PR which goes through above explained flow

- Responsive design
- Track game time and save best time (for a game) to `localStorage`
- Add dynamic game settings. User needs a way to change card types and card flip count (`n` and `m` variables)
- Add CI/CD that will build and publish your app on each push to `master` to a free self-hosted platform (like github pages, but it won't work for you since the repo is private). Need to do some research here
- Add some unit/component tests (e.g.: vitest)

Good luck!