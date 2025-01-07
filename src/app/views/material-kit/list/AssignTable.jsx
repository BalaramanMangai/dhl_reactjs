import { Box, styled } from "@mui/material";
import SimpleTable from "./SimpleTable";
import AssignList from "./AssignList";
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

export default function AssignTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales Overview", path: "/sales" }, { name: "" }]} />
      </Box>

      <SimpleCard title="Sales Overview">
        <AssignList />
      </SimpleCard>
    </Container>
  );
}
