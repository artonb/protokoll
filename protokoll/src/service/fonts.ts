import { Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => [word]);

Font.register({
  family: "VW Headline OT",
  fonts: [
    {
      src: `${import.meta.env.BASE_URL}fonts/vwheadlineot_black.ttf`,
      fontWeight: "normal",
    },
  ],
});
