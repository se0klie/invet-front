import { Box, Container } from "@mui/material";

export default function Section({ children, bgColor }) {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: bgColor || "transparent",
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{ px: 3, mx: 0, py: 3 }}
      >
        {children}
      </Container>
    </Box>
  );
}
