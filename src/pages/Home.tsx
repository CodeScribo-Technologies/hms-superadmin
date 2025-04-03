export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Home Page</h1>
      <p>This is the public home page.</p>
      <p>
        Try accessing the <a href="/dashboard">Dashboard</a> to test
        authentication.
      </p>
    </div>
  );
}
