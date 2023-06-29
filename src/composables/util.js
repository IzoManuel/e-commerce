import { useRoute } from 'vue-router';

export function getSrc(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}

export function currentRouteName(){
  const route = useRoute();
  return route.name;
}