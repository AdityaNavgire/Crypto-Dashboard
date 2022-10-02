import React from "react";
import { Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <Container className="banner-content">
        <div className="tagline">
          <Typography className="tag-title" variant="h2">
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
