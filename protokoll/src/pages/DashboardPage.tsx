import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MibWikiIcon from "../components/MibWikiIcon";
import logo from "../assets/logo-nobk.png";

type AppLink = {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
  external?: boolean;
};

const LogoIcon = () => (
  <Box component="img" src={logo} alt="" sx={{ height: 36, width: "auto" }} />
);

const links: AppLink[] = [
  {
    title: "Serviceprotokoll",
    description: "Skapa servicar",
    path: "/service",
    icon: <LogoIcon />,
    color: "#ffffff",
  },
  {
    title: "Historik",
    description: "Se registrerade servicar",
    path: "/protocols",
    icon: <LogoIcon />,
    color: "#ffffff",
  },
  {
    title: "erWin Volkswagen",
    description: "Volkswagen service och timmar",
    path: "https://volkswagen.erwin-store.com/erwin/showHome.do",
    icon: (
      <Box
        component="img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHc09dCaSjCu0x098DETJcO4_NhEcUSeVbXQ&s"
        alt="erWin"
        sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "erWin Audi",
    description: "Audi service och timmar",
    path: "https://audi.erwin-store.com/erwin/showHome.do",
    icon: (
      <Box
        component="img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS819Xs6CmE6903O8OYkvlLq9jbEZtI0tpoAw&s"
        alt="erWin Audi"
        sx={{ width: 100, height: 40, borderRadius: 1, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "erWin Skoda",
    description: "Skoda service och timmar",
    path: "https://skoda.erwin-store.com/erwin/showHome.do",
    icon: (
      <Box
        component="img"
        src="https://www.svgrepo.com/show/306730/skoda.svg"
        alt="erWin Skoda"
        sx={{ width: 60, height: 60, borderRadius: 1, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "erWin Seat",
    description: "Seat service och timmar",
    path: "https://seat.erwin-store.com/erwin/showHome.do",
    icon: (
      <Box
        component="img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOqT1NW2nfed43BWEvWxliipAl66JyX7tZA&s"
        alt="erWin Seat"
        sx={{ width: 60, height: 60, borderRadius: 1, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "ETKA",
    description: "Hitta rätt delar till VAG",
    path: "https://superetka.com/etka/?lang=SV&marke=AU",
    icon: (
      <Box
        component="img"
        src="https://www.etka.com/etkaportal/static/icons/logo.svg"
        alt="ETKA"
        sx={{ width: 80, height: 40, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "Aeromotors",
    description: "Beställa bildelar",
    path: "https://aeromotors.se/",
    icon: (
      <Box
        component="img"
        src="https://aeromotors.se/img/logo.png"
        alt="Aeromotors"
        sx={{ width: 180, height: 40, borderRadius: 1, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "Meta Business Suite",
    description: "Sociala medier och annonser",
    path: "https://www.facebook.com/business/tools/meta-business-suite",
    icon: (
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/960px-Meta_Platforms_Inc._logo.svg.png"
        alt="Meta"
        sx={{ width: 120, height: 40, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "Fortnox",
    description: "Bokföring och fakturering",
    path: "https://www.fortnox.se/",
    icon: (
      <Box
        component="img"
        src="https://onefront360.com/static/media/fortnox.63d101e80fad70dd6ffa.png"
        alt="Fortnox"
        sx={{ width: 120, height: 40, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "MIB Helper",
    description: "MIB verktyg för att se uppdateringar osv",
    path: "https://mib-helper.com/",
    icon: (
      <Box
        component="img"
        src="https://yt3.googleusercontent.com/DwjShDjwcKSXpXww5sUaR7A9wq8V9uoPyanK6iZTXW8B-_RfchCKGymk5RyQI_W1qXD5jOADuY0=s900-c-k-c0x00ffffff-no-rj"
        alt="MIB Helper"
        sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "MIB Solution",
    description: "MIB filer osv",
    path: "https://mibsolution.one/#/1",
    icon: (
      <Box
        component="img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOxKwBlTKsSjCLWZduxF2p1wJhA3DVdo4TA&s"
        alt="MIB Solution"
        sx={{ width: 120, height: 40, borderRadius: 1 }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
  {
    title: "MIB Wiki",
    description: "MIB dokumentation osv",
    path: "https://mibwiki.one/",
    icon: <MibWikiIcon sx={{ fontSize: 40, color: "#000000" }} />,
    color: "#ffffff",
    external: true,
  },
  {
    title: "MEGA",
    description: "MEGA molnlagring",
    path: "https://mega.nz/login",
    icon: (
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/5/57/01_mega_logo.svg"
        alt="MEGA"
        sx={{ width: 120, height: 40, objectFit: "contain" }}
      />
    ),
    color: "#ffffff",
    external: true,
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
      <Stack spacing={4}>
        {/* Welcome header */}
        <Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Vad vill du göra idag?
          </Typography>
        </Box>

        {/* App cards grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          {links.map((link) => (
            <Card
              key={link.path}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: link.color,
                  boxShadow: `0 4px 20px ${alpha(link.color, 0.15)}`,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardActionArea
                onClick={() =>
                  link.external
                    ? window.open(link.path, "_blank", "noopener")
                    : navigate(link.path)
                }
                sx={{ p: 0.5, height: "100%" }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: alpha(link.color, 0.1),
                          color: link.color,
                        }}
                      >
                        {link.icon}
                      </Box>
                      {link.external && (
                        <OpenInNewRoundedIcon
                          sx={{ fontSize: 18, color: "text.disabled", mt: 0.5 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {link.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {link.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
