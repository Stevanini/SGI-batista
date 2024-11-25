export default function SitePage() {
  return (
    <>
      <div>Site Content</div>
      <div>Site Content</div>

      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>Site Content</div>
      ))}
    </>
  );
}
