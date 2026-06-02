import { formatDistanceToNow } from "https://esm.sh/date-fns@2.29.3";
import { ru } from "https://esm.sh/date-fns@2.29.3/locale";

export function getTimeAgo(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ru,
  });
}
