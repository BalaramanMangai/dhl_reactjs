import { Box, styled } from "@mui/material";
import SimpleTable from "./SimpleTable";
import PaginationTable from "./PaginationTable";
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

export default function UserTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Members", path: "/material" }, { name: "" }]} />
      </Box>

      {/* <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard> */}

      <SimpleCard title="Member List">
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
}
