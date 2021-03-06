// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  dataFiles: {
      games: 'assets/data/dev/games.json',
      teams: 'assets/data/dev/teams.json'
  },
  points: {
      win: 3,
      overtimeLoss: 1,
      loss: 0,
      penalty: -1
  }
};
