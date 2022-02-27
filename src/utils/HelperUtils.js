export function formatDate(date) {
  return date && new Intl.DateTimeFormat("default", {dateStyle: "long"})
    .format(date);
}

const defaults = {
  formatDate,
}
export default defaults;