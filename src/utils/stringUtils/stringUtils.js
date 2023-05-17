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
