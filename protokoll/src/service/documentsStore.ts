import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { CheckState, HeaderState } from "./types";
import { deleteDoc } from "firebase/firestore";

export type Brand = "volkswagen" | "audi" | "seat" | "skoda";
export type DocType = "protocol" | "certificate";

export type ServiceEventDocument = {
  uid: string;
  docType: DocType;
  regNr: string;
  regNrNorm: string;
  templateId: string;
  brand: Brand;
  date: string;
  createdAt: unknown;
  header: HeaderState;
  checks: Record<string, CheckState>;
  rowValues: Record<string, string>;
  maintenanceComment: string;
  selectedExtraWorkIds: string[];
  performedBy?: {
    name: string;
    address1: string;
    address2: string;
  };
};

export type ServiceEventDocumentWithId = ServiceEventDocument & { id: string };

export function normalizeRegNr(regNr: string) {
  return regNr.trim().toUpperCase().replace(/\s+/g, "");
}

export function buildDocId(args: {
  uid: string;
  regNrNorm: string;
  templateId: string;
  date: string;
  docType: DocType;
}) {
  return `${args.uid}__${args.regNrNorm}__${args.templateId}__${args.date}__${args.docType}`;
}

export async function deleteDocumentById(id: string) {
  await deleteDoc(doc(db, "documents", id));
}

export async function upsertServiceEventDocument(
  input: Omit<ServiceEventDocument, "createdAt">
) {
  const id = buildDocId({
    uid: input.uid,
    regNrNorm: input.regNrNorm,
    templateId: input.templateId,
    date: input.date,
    docType: input.docType,
  });

  await setDoc(
    doc(db, "documents", id),
    { ...input, createdAt: serverTimestamp() } as ServiceEventDocument,
    { merge: true }
  );

  return id;
}

export function subscribeMyDocuments(
  uid: string,
  cb: (items: ServiceEventDocumentWithId[]) => void
): Unsubscribe {
  const q = query(
    collection(db, "documents"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snap) =>
      cb(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as ServiceEventDocument),
        }))
      ),
    (err) => {
      console.error("subscribeMyDocuments error:", err);
      cb([]);
    }
  );
}
