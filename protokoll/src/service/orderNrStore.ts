import { doc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../firebase/firebase";

type ServiceEventKeyArgs = {
  uid: string;
  regNrNorm: string;
  templateId: string;
  date: string;
};

export async function peekNextOrderNrForUser(uid: string): Promise<number> {
  if (!uid) throw new Error("uid missing");

  const counterRef = doc(db, "counters", uid);
  const snap = await getDoc(counterRef);

  const next =
    snap.exists() && typeof (snap.data() as any).nextOrderNr === "number"
      ? (snap.data() as any).nextOrderNr
      : 1101;

  return next;
}

export async function getOrCreateOrderNrForServiceEvent(
  args: ServiceEventKeyArgs
): Promise<number> {
  const { uid, regNrNorm, templateId, date } = args;

  if (!uid) throw new Error("uid missing");
  if (!regNrNorm) throw new Error("regNrNorm missing");
  if (!templateId) throw new Error("templateId missing");
  if (!date) throw new Error("date missing");

  const eventId = `${uid}__${regNrNorm}__${templateId}__${date}`;
  const eventRef = doc(db, "eventOrders", eventId);
  const counterRef = doc(db, "counters", uid);

  return runTransaction(db, async (tx) => {
    const eventSnap = await tx.get(eventRef);
    if (eventSnap.exists()) {
      const data = eventSnap.data() as { orderNr?: number };
      if (typeof data.orderNr === "number") return data.orderNr;
    }

    const counterSnap = await tx.get(counterRef);
    const next =
      counterSnap.exists() &&
      typeof (counterSnap.data() as any).nextOrderNr === "number"
        ? (counterSnap.data() as any).nextOrderNr
        : 1101;

    tx.set(eventRef, {
      uid,
      regNrNorm,
      templateId,
      date,
      orderNr: next,
      createdAt: Date.now(),
    });

    tx.set(counterRef, { uid, nextOrderNr: next + 1 }, { merge: true });

    return next;
  });
}
