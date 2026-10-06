import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function makeMrn() {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);
  return `RAH-${stamp}-${random}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  const patients = await prisma.patient.findMany({
    where: q ? {
      OR: [
        { mrn: { contains: q, mode: "insensitive" } },
        { firstName: { contains: q, mode: "insensitive" } },
        { middleName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } }
      ]
    } : undefined,
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, middleName, lastName, dateOfBirth, sex, phone, address, nextOfKinName, nextOfKinPhone, bloodGroup, genotype } = body;

    if (!firstName?.trim() || !lastName?.trim() || !sex) {
      return NextResponse.json({ error: "First name, last name and sex are required." }, { status: 400 });
    }

    const patient = await prisma.patient.create({
      data: {
        mrn: makeMrn(),
        firstName: firstName.trim(),
        middleName: middleName?.trim() || null,
        lastName: lastName.trim(),
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        sex,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        nextOfKinName: nextOfKinName?.trim() || null,
        nextOfKinPhone: nextOfKinPhone?.trim() || null,
        bloodGroup: bloodGroup?.trim() || null,
        genotype: genotype?.trim() || null
      }
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to save patient. Check the database connection." }, { status: 500 });
  }
}