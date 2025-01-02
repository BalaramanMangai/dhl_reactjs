import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import EditForm from "./MemberEditForm";
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
  const { user } = location.state || {}; // Access the user data

  console.log('user',user);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Members", path: "/material" }, { name: "Edit Form" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Edit Member">
          <EditForm user={user}/>
        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
}
