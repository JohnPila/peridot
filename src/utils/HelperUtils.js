export function formatDate(date) {
  return date && new Intl.DateTimeFormat("default", {dateStyle: "long"})
    .format(date);
}

export function formatDateTime(date) {
  return date && new Intl.DateTimeFormat("default", {dateStyle: "long", timeStyle: "short"})
    .format(date);
}

const defaults = {
  formatDate,
  formatDateTime,
}
export default defaults;