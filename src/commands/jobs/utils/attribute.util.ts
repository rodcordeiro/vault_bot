export function Attribute(attr: string) {
  switch (attr) {
    case 'S':
      return 'strength';
    case 'P':
      return 'perception';
    case 'E':
      return 'endurance';
    case 'C':
      return 'charism';
    case 'i':
      return 'intelligence';
    case 'a':
      return 'agility';
    case 'l':
      return 'luck';
    default:
      return 'strength';
  }
}
