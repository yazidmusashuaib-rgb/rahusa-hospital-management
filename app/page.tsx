import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 38, marginBottom: 8 }}>RAHUSA CLINIC</h1>
        <p style={{ color: "#667085", fontSize: 18 }}>Hospital Management System</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 35 }}>
          <Link href="/patients" style={{ textDecoration: "none", color: "inherit" }}>
            <section style={{ background: "white", padding: 24, borderRadius: 14, border: "1px solid #e4e7ec" }}>
              <h2>Patients</h2>
              <p>Register, search and open complete patient records.</p>
            </section>
          </Link>
          <section style={{ background: "white", padding: 24, borderRadius: 14, border: "1px solid #e4e7ec" }}>
            <h2>OPD</h2><p>Consultations, diagnosis and treatment — coming next.</p>
          </section>
          <section style={{ background: "white", padding: 24, borderRadius: 14, border: "1px solid #e4e7ec" }}>
            <h2>Inpatient</h2><p>Admissions, beds and monitoring — coming next.</p>
          </section>
          <section style={{ background: "white", padding: 24, borderRadius: 14, border: "1px solid #e4e7ec" }}>
            <h2>Laboratory</h2><p>Orders and results — coming next.</p>
          </section>
        </div>
      </div>
    </main>
  );
}