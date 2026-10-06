"use client";

import { FormEvent, useEffect, useState } from "react";

type Patient = {
  id: string; mrn: string; firstName: string; middleName?: string | null; lastName: string;
  dateOfBirth?: string | null; sex: string; phone?: string | null; address?: string | null;
};

const emptyForm = { firstName:"", middleName:"", lastName:"", dateOfBirth:"", sex:"", phone:"", address:"", nextOfKinName:"", nextOfKinPhone:"", bloodGroup:"", genotype:"" };

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadPatients(search = "") {
    const res = await fetch(`/api/patients?q=${encodeURIComponent(search)}`, { cache: "no-store" });
    if (res.ok) setPatients(await res.json());
  }

  useEffect(() => { loadPatients(); }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setMessage("");
    const res = await fetch("/api/patients", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setMessage(data.error || "Could not save patient."); return; }
    setMessage(`Patient saved successfully. MRN: ${data.mrn}`);
    setForm(emptyForm);
    await loadPatients();
  }

  return (
    <main style={{ maxWidth:1200, margin:"0 auto", padding:32 }}>
      <a href="/" style={{ color:"#344054" }}>← Dashboard</a>
      <h1>Patient Registration</h1>
      <p style={{ color:"#667085" }}>Every patient receives a permanent Medical Record Number (MRN).</p>

      <form onSubmit={submit} style={{ background:"white", padding:24, borderRadius:14, border:"1px solid #e4e7ec", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
        {[
          ["firstName","First name *"],["middleName","Middle name"],["lastName","Last name *"],["dateOfBirth","Date of birth"]
        ].map(([key,label]) => <label key={key} style={{display:"grid",gap:6}}>{label}<input required={key==="firstName"||key==="lastName"} type={key==="dateOfBirth"?"date":"text"} value={form[key as keyof typeof form]} onChange={e=>setForm({...form,[key]:e.target.value})} style={input}/></label>)}
        <label style={{display:"grid",gap:6}}>Sex *
          <select required value={form.sex} onChange={e=>setForm({...form,sex:e.target.value})} style={input}><option value="">Select</option><option value="MALE">Male</option><option value="FEMALE">Female</option><option value="OTHER">Other</option></select>
        </label>
        {[
          ["phone","Phone"],["address","Address"],["nextOfKinName","Next of kin"],["nextOfKinPhone","Next of kin phone"],["bloodGroup","Blood group"],["genotype","Genotype"]
        ].map(([key,label]) => <label key={key} style={{display:"grid",gap:6}}>{label}<input value={form[key as keyof typeof form]} onChange={e=>setForm({...form,[key]:e.target.value})} style={input}/></label>)}
        <div style={{gridColumn:"1/-1"}}><button disabled={loading} style={button}>{loading ? "Saving..." : "Register Patient"}</button></div>
      </form>

      {message && <p style={{background:"#ecfdf3",padding:12,borderRadius:8}}>{message}</p>}

      <section style={{marginTop:30}}>
        <div style={{display:"flex",gap:10,alignItems:"center",justifyContent:"space-between"}}>
          <h2>Registered Patients</h2>
          <input placeholder="Search name, MRN or phone" value={q} onChange={e=>{setQ(e.target.value);loadPatients(e.target.value)}} style={{...input,maxWidth:320}}/>
        </div>
        <div style={{overflowX:"auto",background:"white",border:"1px solid #e4e7ec",borderRadius:12}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={th}>MRN</th><th style={th}>Patient</th><th style={th}>Sex</th><th style={th}>Phone</th><th style={th}>Action</th></tr></thead>
            <tbody>{patients.map(p=><tr key={p.id}><td style={td}>{p.mrn}</td><td style={td}>{p.firstName} {p.middleName || ""} {p.lastName}</td><td style={td}>{p.sex}</td><td style={td}>{p.phone || "—"}</td><td style={td}><a href={`/patients/${p.id}`}>Open record</a></td></tr>)}</tbody>
          </table>
          {!patients.length && <p style={{padding:20,color:"#667085"}}>No patients found.</p>}
        </div>
      </section>
    </main>
  );
}

const input = { padding:"10px 12px", border:"1px solid #d0d5dd", borderRadius:8, fontSize:14 };
const button = { padding:"11px 18px", border:0, borderRadius:8, background:"#175cd3", color:"white", fontWeight:700, cursor:"pointer" };
const th = { textAlign:"left" as const, padding:12, borderBottom:"1px solid #e4e7ec" };
const td = { padding:12, borderBottom:"1px solid #f2f4f7" };