export const nth = (num) => {
  const n = num % 100;
  return num + (n >= 11 && n <= 13 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][num % 10]);
}

export const gamePlayers = (game, introText) => {
  const { minNumberOfPlayersPerTeam, maxNumberOfPlayersPerTeam, minNumberOfTeams, maxNumberOfTeams } = game;
  const intro = introText?.length > 0 ? `${introText} ` : '';
  const maxTeams = !maxNumberOfTeams ? '-or-more' : maxNumberOfTeams > minNumberOfTeams ? `-${maxNumberOfTeams}` : '';
  return `${intro}${minNumberOfTeams}${maxTeams} ${maxNumberOfPlayersPerTeam === 1 ? 'players' : `teams of ${minNumberOfPlayersPerTeam}${maxNumberOfPlayersPerTeam > minNumberOfPlayersPerTeam ? `-${maxNumberOfPlayersPerTeam}` : ''}`}`
}

export const formatGameString = (gameDetails, allUsers) => {
  const teams = gameDetails.teams;
  const playerStringArrays = teams.map((team) => {
    const players = team.players;
    const playerStringArray = players.map((player) => {
      const user = allUsers.find((user) => user.id === player);
      if (user) {
        return `@[${user.name}](${user.id})`;
      }
      return '';
    });
    return oxfordComma(playerStringArray, 'and', '');
  })
  if(teams.length === 2) { // Most games (a winning team and everyone else)
    return `${playerStringArrays[0]} defeated ${playerStringArrays[1]}`;
  }
  // And a format for multiple teams (ex: Old College Try)
  let returnString = '';
  for(let i = 0; i < teams.length; i++) {
    if(teams[i].points > 0) {
      if(i > 0){
        returnString += '\r';
      }
      returnString += `*${teams[i].name}*: ${playerStringArrays[i]}`;
    }
  }
  return returnString;
}

export const oxfordComma = function (arr, conjunction, ifempty) {
  let l = arr.length;
  if (!l) return ifempty;
  if (l < 2) return arr[0];
  if (l < 3) return arr.join(` ${conjunction} `);
  arr = arr.slice();
  arr[l - 1] = `${conjunction} ${arr[l - 1]}`;
  return arr.join(", ");
}