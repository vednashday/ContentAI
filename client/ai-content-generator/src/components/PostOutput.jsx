export default function PostOutput({ post }) {
  return (
    <textarea value={post} readOnly rows={6} />
  );
}
