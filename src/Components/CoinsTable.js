import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { CryptoState } from "../ContextApi";
import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  LinearProgress,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@material-ui/core";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinsTable = () => {
  const classes = useStyles();
  // const history = useHistory();
  let navigate = useNavigate();
  const [coinss, setCoinss] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSeacrh] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);
    setCoinss(data);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  const handleSearch = (coins) => {
    return (
      coins &&
      coins?.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      )
    );
  };
  console.log(handleSearch(), "HANDLE");
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography className="title" variant="h5">
          Crypto prices by market cap
        </Typography>
        <TextField
          className="textField"
          label="Search for Crypto"
          variant="outlined"
          onChange={(e) => setSeacrh(e.target.value)}
        />
        <TableContainer>
          {loading === true ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {console.log(head, "HEAD")}
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableBody className="tableBody">
                  {coinss &&
                    handleSearch(coinss)
                      ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                      ?.map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                        return (
                          <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className={classes.row}
                            key={row.name}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ display: "flex", gap: "15" }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </TableHead>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch(coinss)?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};
export default CoinsTable;
