import { useRoute } from 'vue-router';

export function getSrc(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}

export function currentRouteName(){
  const route = useRoute();
  return route.name;
}

export function getInitials(name) {
  const words = name.split(' ');
  const initials = words.map(word => word.charAt(0)).join('');

  return initials;
}