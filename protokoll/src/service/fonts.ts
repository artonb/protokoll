import { Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => [word]);
Font.register({
  family: "VW Headline OT",
  fonts: [
    {
      src: "/fonts/vwheadlineot_black.ttf",
      fontWeight: "normal",
    },
  ],
});
