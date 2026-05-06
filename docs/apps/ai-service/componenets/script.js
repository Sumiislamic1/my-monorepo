export default function Card({ children }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "8px"
    }}>
      {children}
    </div>
  );
}