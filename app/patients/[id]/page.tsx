import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await prisma.patient.findUnique({ where: { id }, include: { encounters: { orderBy: { visitDate: "desc" } } } });
  if (!patient) notFound();

  return (
    <main style={{maxWidth:1100,margin:"0 auto",padding:32}}>
      <a href="/patients">← Patients</a>
      <div style={{background:"white",padding:24,borderRadius:14,border:"1px solid #e4e7ec",marginTop:18}}>
        <h1>{patient.firstName} {patient.middleName || ""} {patient.lastName}</h1>
        <p><strong>MRN:</strong> {patient.mrn}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
          <p><strong>Sex:</strong> {patient.sex}</p>
          <p><strong>Date of birth:</strong> {patient.dateOfBirth?.toISOString().slice(0,10) || "Not recorded"}</p>
          <p><strong>Phone:</strong> {patient.phone || "Not recorded"}</p>
          <p><strong>Blood group:</strong> {patient.bloodGroup || "Not recorded"}</p>
          <p><strong>Genotype:</strong> {patient.genotype || "Not recorded"}</p>
          <p><strong>Address:</strong> {patient.address || "Not recorded"}</p>
        </div>
      </div>
      <div style={{marginTop:24,background:"white",padding:24,borderRadius:14,border:"1px solid #e4e7ec"}}>
        <h2>Clinical Record</h2>
        {patient.encounters.length === 0 ? <p>No clinical encounters recorded yet.</p> :
          patient.encounters.map(e=><article key={e.id} style={{padding:"15px 0",borderBottom:"1px solid #e4e7ec"}}>
            <strong>{e.type}</strong> — {e.visitDate.toISOString().slice(0,16).replace("T"," ")}
            <p><strong>Complaint:</strong> {e.complaint || "—"}</p>
            <p><strong>Assessment:</strong> {e.assessment || "—"}</p>
            <p><strong>Plan:</strong> {e.plan || "—"}</p>
          </article>)}
      </div>
    </main>
  );
}