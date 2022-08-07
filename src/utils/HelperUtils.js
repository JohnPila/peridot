export function formatDate(date) {
  return date && new Intl.DateTimeFormat("default", {dateStyle: "long"})
    .format(date);
}

export function formatTime(time) {
  return time && new Intl.DateTimeFormat("default", {timeStyle: "short"})
    .format(time);
}

export function formatDateTime(date) {
  return date && new Intl.DateTimeFormat("default", {dateStyle: "long", timeStyle: "short"})
    .format(date);
}

export function combineDateTime(date, time) {
  const 
    m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1, 
    d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(), 
    y = date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
  const 
    h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours(), 
    mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes(), 
    s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  return Date.parse(`${y}-${m}-${d}T${h}:${mm}:${s}`);
}

const defaults = {
  formatDate,
  formatDateTime,
}
export default defaults;