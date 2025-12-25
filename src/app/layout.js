import Sidebar from "@/components/layout/Sidebar/Sidebar";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Sidebar />
        <main style={{ marginLeft: "220px", padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
