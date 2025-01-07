import { Box, styled } from "@mui/material";
import SimpleTable from "./SimpleTable";
import AssignProductList from "./AssignProductList";
import { Breadcrumb, SimpleCard } from "app/components";
import CreateAssign from "../../products/AddForm";
import { useLocation } from "react-router-dom";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function Assign() {


  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales Overview", path: "/sales" }, { name: "" }]} />
      </Box>

        {/* <CreateAssign/> */}
        <AssignProductList />
    </Container>
  );
}
