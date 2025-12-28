import { Font } from "@react-pdf/renderer";

const base = import.meta.env.BASE_URL;

const VW_REGULAR = `${base}fonts/vwheadlinebook_black.otf`;
const VW_BOLD = `${base}fonts/vwheadlineot_black.ttf`;

const AUDI_REGULAR = `${base}fonts/auditype_extendednormal.ttf`;
const AUDI_BOLD = `${base}fonts/auditype_extendedbold.ttf`;

const SKODA_REGULAR = `${base}fonts/skoda-pro.ttf`;
const SKODA_BOLD = `${base}fonts/skoda-pro-bold.ttf`;

Font.register({
  family: "Brand-VW",
  fonts: [
    { src: VW_REGULAR, fontWeight: "normal" },
    { src: VW_BOLD, fontWeight: "bold" },
  ],
});

Font.register({
  family: "Brand-Seat",
  fonts: [
    { src: VW_REGULAR, fontWeight: "normal" },
    { src: VW_BOLD, fontWeight: "bold" },
  ],
});

Font.register({
  family: "Brand-Audi",
  fonts: [
    { src: AUDI_REGULAR, fontWeight: "normal" },
    { src: AUDI_BOLD, fontWeight: "bold" },
  ],
});

Font.register({
  family: "Brand-Skoda",
  fonts: [
    { src: SKODA_REGULAR, fontWeight: "normal" },
    { src: SKODA_BOLD, fontWeight: "bold" },
  ],
});
