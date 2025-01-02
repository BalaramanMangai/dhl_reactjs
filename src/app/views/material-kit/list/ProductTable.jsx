import { Box, styled } from "@mui/material";
import SimpleTable from "./SimpleTable";
import ProductList from "./ProductList";
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

export default function ProductTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Products", path: "/products" }, { name: "" }]} />
      </Box>

      <SimpleCard title="Product List">
        <ProductList />
      </SimpleCard>
    </Container>
  );
}
