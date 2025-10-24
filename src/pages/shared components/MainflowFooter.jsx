import {
    Box,
    Typography,
    Link,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function MainflowFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#8CB5AA",
        px: { xs: 2, sm: 4, md: 5 },
        py: { xs: 2, sm: 2},
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: { xs: 3, md: 0 },
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
              color: "white",
              mb: 1,
            }}
          >
            Contáctanos
          </Typography>
          <Typography sx={{ color: "white", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Lunes a Domingo 6:30AM - 10:30PM
          </Typography>
          <Typography sx={{ color: "white", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Whatsapp: 0999495379 - 0991896990
          </Typography>
          <Typography sx={{ color: "white", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Dirección: Matriz Coop. Quisquis Mz Y2
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: { xs: 2, md: 1 },
          }}
        >
          <Typography sx={{ color: "white", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Correo:{" "}
            <Link href="mailto:drchicaiza25@gmail.com" sx={{ color: "white" }}>
              drchicaiza25@gmail.com
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <a
              href="https://www.facebook.com/people/Invet-cremación-de-mascotas/61575194321265/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaFacebook size={32} />
            </a>

            <a
              href="https://www.instagram.com/invet_ec/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaInstagram size={32} />
            </a>

            <a
              href="https://www.tiktok.com/@invet__"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaTiktok size={32} />
            </a>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          mx: "auto",
          textAlign: "center",
          fontWeight: 600,
          color: "white",
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
        }}
      >
        Todos los derechos reservados
      </Typography>
    </Box>
  );
}