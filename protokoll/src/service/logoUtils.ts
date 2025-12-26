import logoVW from "../assets/VW.png";
import logoAudi from "../assets/Audi.png";
import logoSkoda from "../assets/Skoda.png";
import logoSeat from "../assets/Seat.png";
import type { PdfData } from "../pages/ServicePdfDocument";

export function getBrandLogoConfig(brand: PdfData["brand"]) {
  const common = {
    marginLeft: "auto",
    paddingBottom: 2,
    objectFit: "contain" as const,
  };

  switch (brand) {
    case "audi":
      return {
        src: logoAudi,
        style: {
          ...common,
          width: 90,
          height: 34,
          marginTop: 0,
        },
      };

    case "volkswagen":
    default:
      return {
        src: logoVW,
        style: {
          ...common,
          width: 38,
          height: 42,
          marginTop: 0,
        },
      };

    case "skoda":
      return {
        src: logoSkoda,
        style: {
          ...common,
          width: 70,
          height: 70,
          marginTop: 2,
        },
      };

    case "seat":
      return {
        src: logoSeat,
        style: {
          ...common,
          width: 70,
          height: 70,
          marginTop: 2,
        },
      };
  }
}
