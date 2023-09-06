export function getDangerBackground(level: number) {
  switch (level) {
    case 1:
      return 'bg-green-400'
    case 2:
      return 'bg-yellow-300'
    case 3:
      return 'bg-orange-400'
    case 4:
      return 'bg-red-500'
    case 5:
      return 'bg-red-600'
    default:
      return ''
  }
}
