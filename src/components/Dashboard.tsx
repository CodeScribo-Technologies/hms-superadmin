import { useState } from "react";

export default function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const sampleData = [
    {
      ID: 2,
      CreatedAt: "2024-11-15T14:12:12.156314Z",
      UpdatedAt: "2024-11-15T14:12:12.156314Z",
      name: "Clinic 1",
      is_active: true,
    },
    {
      ID: 3,
      CreatedAt: "2024-11-16T10:22:45.156314Z",
      UpdatedAt: "2024-11-16T10:22:45.156314Z",
      name: "Clinic 2",
      is_active: false,
    },
    {
      ID: 4,
      CreatedAt: "2024-11-17T08:15:33.156314Z",
      UpdatedAt: "2024-11-17T08:15:33.156314Z",
      name: "Clinic 3",
      is_active: true,
    },
    // Add more sample data as needed
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalItems = sampleData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>This is a protected page that only logged-in users can see.</p>

      <div style={{ marginTop: "2rem", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Created At
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Updated At
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                UUID
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.ID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{item.ID}</td>
                <td style={{ padding: "12px" }}>
                  {formatDate(item.CreatedAt)}
                </td>
                <td style={{ padding: "12px" }}>
                  {formatDate(item.UpdatedAt)}
                </td>
                <td style={{ padding: "12px" }}>{item.name}</td>
                <td style={{ padding: "12px" }}>
                  {item.is_active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ margin: "0 5px", padding: "5px 10px", cursor: "pointer" }}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{ margin: "0 5px", padding: "5px 10px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
