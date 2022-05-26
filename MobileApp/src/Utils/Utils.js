gamesDict = {};

export function setGamesDict(
  gamesNameList,
  gamesImageList,
  gamesDescriptionList,
  gamesLinkList
) {
  for (var i = 0; i < gamesNameList.length; i++) {
    gamesDict[gamesNameList[i]] = {
      "image": gamesImageList[i],
      "description": gamesDescriptionList[i],
      "link": gamesLinkList[i],
    };
  }
}

export function getGamesDict() {
  return gamesDict;
}
