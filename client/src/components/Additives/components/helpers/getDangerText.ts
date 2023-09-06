export const getDangerLevelInText = (level: number) => {
  switch (level) {
    case 1:
      return 'очень низкая опасность'
    case 2:
      return 'низкая опасность'
    case 3:
      return 'средняя опасность'
    case 4:
      return 'высокая опасность'
    case 5:
      return 'очень высокая опасность'
    default:
      return ''
  }
}
