export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getTitleCase(name: string) {
  const titleTemp = name.replace(/([A-Z])/g, " $1");
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
}

