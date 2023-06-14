export default function getImagePath(path?: string | null) {
  if (!path) return '';
  return `http://localhost:3000${path}`;
}
