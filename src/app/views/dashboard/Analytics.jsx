import { Fragment , useEffect} from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import Campaigns from "./shared/Campaigns";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import UpgradeCard from "./shared/UpgradeCard";
import TopSellingTable from "./shared/TopSellingTable";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

import { useDispatch, useSelector } from 'react-redux';


export default function Analytics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('userInfo',auth.userInfo.role_id);


  const { palette } = useTheme();

  useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);
  
    if (!isAuthenticated) {
      return null;
    }
  

  return (
    <Fragment>
      <ContentBox className="analytics">
            <StatCards />
            <TopSellingTable />
            <StatCards2 />
        {/* <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }}>
            <StatCards />
            <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />
          </Grid>
        </Grid> */}
      </ContentBox>
    </Fragment>
  );
}
