import { Box } from "@mui/material";
import type { CheckState, ServiceSection } from "../service/types";
import ChecklistSectionTable from "./ChecklistSectionTable";

type Props = {
  sections: ServiceSection[];

  checks: Record<string, CheckState>;
  onChecksChange: (next: Record<string, CheckState>) => void;

  rowValues: Record<string, string>;
  onRowValuesChange: (next: Record<string, string>) => void;
};

export default function ServiceChecklistTable({
  sections,
  checks,
  onChecksChange,
  rowValues,
  onRowValuesChange,
}: Props) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {sections.map((section) => (
        <ChecklistSectionTable
          key={section.id}
          section={section}
          checks={checks}
          rowValues={rowValues}
          onChecksChange={onChecksChange}
          onRowValuesChange={onRowValuesChange}
        />
      ))}
    </Box>
  );
}
