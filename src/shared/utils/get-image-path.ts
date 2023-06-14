export default function getImagePath(path?: string | null) {
  if (!path) return '';
  return `${
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  }${path}`;
}
