import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import EditForm from "../products/ProductEditForm";
import { useLocation } from 'react-router-dom';

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AppForm(props) {
  
  const location = useLocation();
  const { product } = location.state || {}; // Access the product data

  console.log('product',product);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Agents", path: "/agent" }, { name: "" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Agent">
          <EditForm product={product}/>
        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
}
