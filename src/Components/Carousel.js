import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendingCoins } from "../Config/api";
import { CryptoState } from "../ContextApi";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  console.log(trending, "trend");
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className="carouselItem">
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{ color: profit > 0 ? "green" : "red", fontWeight: 500 }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
