import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CryptoState } from "../ContextApi";

const Header = () => {
  let navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const { currency, setCurrency } = CryptoState();
  console.log(currency, "currency");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <div className="header">
      <ThemeProvider theme={darkTheme}>
        <AppBar
          color="transparent"
          position="'static
      "
        >
          <Container>
            <Toolbar>
              <Typography onClick={handleHome} className="title" variant="h5">
                Crypto Hunter
              </Typography>

              <Select
                variant="outlined"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}> INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
