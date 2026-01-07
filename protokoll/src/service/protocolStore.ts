import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import type { CheckState, HeaderState } from "./types";

export type Brand = "volkswagen" | "audi" | "seat" | "skoda";

export type ProtocolDoc = {
  uid: string;
  createdAt: unknown;
  regNr: string;
  templateId: string;
  brand: Brand;
  header: HeaderState;
  checks: Record<string, CheckState>;
  rowValues: Record<string, string>;
  maintenanceComment: string;
  selectedExtraWorkLabels: string[];
  certificateExtraWorkLabels: string[];
  serviceTitle: string;
  safeDate: string;
};

export type ProtocolDocWithId = ProtocolDoc & { id: string };

export async function saveProtocol(params: Omit<ProtocolDoc, "createdAt">) {
  const ref = collection(db, "protocols");
  const docToSave: ProtocolDoc = {
    ...params,
    createdAt: serverTimestamp(),
  };
  return addDoc(ref, docToSave);
}

export function subscribeMyProtocols(
  uid: string,
  cb: (items: ProtocolDocWithId[]) => void,
  onError?: (e: unknown) => void
): Unsubscribe {
  const q = query(
    collection(db, "protocols"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as DocumentData),
      })) as ProtocolDocWithId[];
      cb(items);
    },
    onError
  );
}
