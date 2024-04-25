import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import image1 from '../assets/collection_3.jpg';
import image2 from '../assets/recycle.jpg';
import image3 from '../assets/mf.jpg';

const img1 = image1;
const img2 = image2;
const img3 = image3;

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 100,
  my: 2,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          // src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 10 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src = {img1}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                Collections
                </Typography>
                <Typography variant="body1" align="center">
                We collect various types of post-consumer and post-industrial recyclables wastes throughout our daily collection channels and prepare them at the MRF for recycling.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src= {img2}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                Mechanical Recycling
                </Typography>
                <Typography variant="body1" align="center">
                Materials undergo segregation, bailing, crushing, washing, and pelletizing, each step refining them until transformed into uniform, usable entities.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src= {img3}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                Micro-Financing
                </Typography>
                <Typography variant="body1" align="center">
                Daily, weekly, or monthly , we offer sufficient budgets for selected collectors to handle their daily plastic and other recyclable collections. 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/signup"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;