export type CheckState = "ok" | "inte_ok" | "atgardad" | null;

export type ServiceRow = {
  id: string;
  text: string;
  valueBox?: {
    placeholder?: string;
    width?: number;
    height?: number;
  };
};

export type ServiceSection = {
  id: string;
  title?: string;
  rows: ServiceRow[];
};

export type ExtraWorkAddToSection = {
  sectionId: string;
  rows: ServiceRow[];
  afterRowId?: string;
  beforeRowId?: string;
  index?: number;
};

export type ExtraWorkOption = {
  id: string;
  label?: string;
  showOnCertificate?: boolean;
  add?: ExtraWorkAddToSection[];
  sectionId?: string;
  rows?: ServiceRow[];
  row?: ServiceRow;
};
export type Template = {
  id: string;
  name: string;
  serviceTitle: string;
  sections: ServiceSection[];
  extraWorks?: ExtraWorkOption[];
};

export type HeaderState = {
  orderNr: string;
  modellKod: string;
  regNr: string;
  registrering: string;
  chassiNr: string;
  mmb: string;
  matarstallning: string;
  serviceRadgivare: string;
  modell: string;
  vmb: string;
  arsmodell: string;
  datum: string;
};
