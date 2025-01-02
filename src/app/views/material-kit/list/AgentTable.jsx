import { Box, styled } from "@mui/material";
import SimpleTable from "./SimpleTable";
import AgentsList from "./AgentsList";
import { Breadcrumb, SimpleCard } from "app/components";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AgentTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Agents", path: "/agents" }, { name: "" }]} />
      </Box>

      <SimpleCard title="Agent List">
        <AgentsList />
      </SimpleCard>
    </Container>
  );
}
