// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
// import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
// import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: 'Dashboard',
//     description:
//       'This item could provide a snapshot of the most important metrics or data points related to the product.',
//     imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
//     imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: 'Mobile integration',
//     description:
//       'This item could provide information about the mobile app version of the product.',
//     imageLight: 'url("/static/images/templates/templates-images/mobile-light.png")',
//     imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: 'Available on all platforms',
//     description:
//       'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
//     imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
//     imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
//   },
// ];

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <div>
//             <Typography component="h2" variant="h4" color="text.primary">
//               Product features
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mb: { xs: 2, sm: 4 } }}
//             >
//               Here you can provide a brief overview of the key features of the
//               product. For example, you could list the number of features, the types
//               of features, add-ons, or the benefits of the features.
//             </Typography>
//           </div>
//           <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
//             {items.map(({ title }, index) => (
//               <Chip
//                 key={index}
//                 label={title}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   borderColor: (theme) => {
//                     if (theme.palette.mode === 'light') {
//                       return selectedItemIndex === index ? 'primary.light' : '';
//                     }
//                     return selectedItemIndex === index ? 'primary.light' : '';
//                   },
//                   background: (theme) => {
//                     if (theme.palette.mode === 'light') {
//                       return selectedItemIndex === index ? 'none' : '';
//                     }
//                     return selectedItemIndex === index ? 'none' : '';
//                   },
//                   backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
//                   '& .MuiChip-label': {
//                     color: selectedItemIndex === index ? '#fff' : '',
//                   },
//                 }}
//               />
//             ))}
//           </Grid>
//           <Box
//             component={Card}
//             variant="outlined"
//             sx={{
//               display: { xs: 'auto', sm: 'none' },
//               mt: 4,
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundImage: (theme) =>
//                   theme.palette.mode === 'light'
//                     ? items[selectedItemIndex].imageLight
//                     : items[selectedItemIndex].imageDark,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 minHeight: 280,
//               }}
//             />
//             <Box sx={{ px: 2, pb: 2 }}>
//               <Typography color="text.primary" variant="body2" fontWeight="bold">
//                 {selectedFeature.title}
//               </Typography>
//               <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
//                 {selectedFeature.description}
//               </Typography>
//               <Link
//                 color="primary"
//                 variant="body2"
//                 fontWeight="bold"
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   '& > svg': { transition: '0.2s' },
//                   '&:hover > svg': { transform: 'translateX(2px)' },
//                 }}
//               >
//                 <span>Learn more</span>
//                 <ChevronRightRoundedIcon
//                   fontSize="small"
//                   sx={{ mt: '1px', ml: '2px' }}
//                 />
//               </Link>
//             </Box>
//           </Box>
//           <Stack
//             direction="column"
//             justifyContent="center"
//             alignItems="flex-start"
//             spacing={2}
//             useFlexGap
//             sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
//           >
//             {items.map(({ icon, title, description }, index) => (
//               <Card
//                 key={index}
//                 variant="outlined"
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   p: 3,
//                   height: 'fit-content',
//                   width: '100%',
//                   background: 'none',
//                   backgroundColor:
//                     selectedItemIndex === index ? 'action.selected' : undefined,
//                   borderColor: (theme) => {
//                     if (theme.palette.mode === 'light') {
//                       return selectedItemIndex === index
//                         ? 'primary.light'
//                         : 'grey.200';
//                     }
//                     return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: '100%',
//                     display: 'flex',
//                     textAlign: 'left',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     alignItems: { md: 'center' },
//                     gap: 2.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       color: (theme) => {
//                         if (theme.palette.mode === 'light') {
//                           return selectedItemIndex === index
//                             ? 'primary.main'
//                             : 'grey.300';
//                         }
//                         return selectedItemIndex === index
//                           ? 'primary.main'
//                           : 'grey.700';
//                       },
//                     }}
//                   >
//                     {icon}
//                   </Box>
//                   <Box sx={{ textTransform: 'none' }}>
//                     <Typography
//                       color="text.primary"
//                       variant="body2"
//                       fontWeight="bold"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                       sx={{ my: 0.5 }}
//                     >
//                       {description}
//                     </Typography>
//                     <Link
//                       color="primary"
//                       variant="body2"
//                       fontWeight="bold"
//                       sx={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         '& > svg': { transition: '0.2s' },
//                         '&:hover > svg': { transform: 'translateX(2px)' },
//                       }}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <span>Learn more</span>
//                       <ChevronRightRoundedIcon
//                         fontSize="small"
//                         sx={{ mt: '1px', ml: '2px' }}
//                       />
//                     </Link>
//                   </Box>
//                 </Box>
//               </Card>
//             ))}
//           </Stack>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
//         >
//           <Card
//             variant="outlined"
//             sx={{
//               height: '100%',
//               width: '100%',
//               display: { xs: 'none', sm: 'flex' },
//               pointerEvents: 'none',
//             }}
//           >
//             <Box
//               sx={{
//                 m: 'auto',
//                 width: 420,
//                 height: 500,
//                 backgroundSize: 'contain',
//                 backgroundImage: (theme) =>
//                   theme.palette.mode === 'light'
//                     ? items[selectedItemIndex].imageLight
//                     : items[selectedItemIndex].imageDark,
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
// import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
// import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: 'Dashboard',
//     description:
//       'This item could provide a snapshot of the most important metrics or data points related to the product.',
//     imageDark: 'url("C:\Users\USER\Desktop\Eko-plasco-3\client\src\Product.jpg")',
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: 'Mobile integration',
//     description:
//       'This item could provide information about the mobile app version of the product.',
//     imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: 'Available on all platforms',
//     description:
//       'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
//     imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
//   },
// ];

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <div>
//             <Typography component="h2" variant="h4" color="text.primary">
//               Product features
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mb: { xs: 2, sm: 4 } }}
//             >
//               Here you can provide a brief overview of the key features of the
//               product. For example, you could list the number of features, the types
//               of features, add-ons, or the benefits of the features.
//             </Typography>
//           </div>
//           <Stack
//             direction="column"
//             justifyContent="center"
//             alignItems="flex-start"
//             spacing={2}
//             useFlexGap
//             sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
//           >
//             {items.map(({ icon, title, description }, index) => (
//               <Card
//                 key={index}
//                 variant="outlined"
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   p: 3,
//                   height: 'fit-content',
//                   width: '100%',
//                   background: 'none',
//                   backgroundColor:
//                     selectedItemIndex === index ? 'action.selected' : undefined,
//                   borderColor: (theme) => {
//                     return selectedItemIndex === index ? 'primary.light' : 'grey.800';
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: '100%',
//                     display: 'flex',
//                     textAlign: 'left',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     alignItems: { md: 'center' },
//                     gap: 2.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       color: (theme) => {
//                         return selectedItemIndex === index ? 'primary.main' : 'grey.700';
//                       },
//                     }}
//                   >
//                     {icon}
//                   </Box>
//                   <Box sx={{ textTransform: 'none' }}>
//                     <Typography
//                       color="text.primary"
//                       variant="body2"
//                       fontWeight="bold"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                       sx={{ my: 0.5 }}
//                     >
//                       {description}
//                     </Typography>
//                     <Link
//                       color="primary"
//                       variant="body2"
//                       fontWeight="bold"
//                       sx={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         '& > svg': { transition: '0.2s' },
//                         '&:hover > svg': { transform: 'translateX(2px)' },
//                       }}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <span>Learn more</span>
//                       <ChevronRightRoundedIcon
//                         fontSize="small"
//                         sx={{ mt: '1px', ml: '2px' }}
//                       />
//                     </Link>
//                   </Box>
//                 </Box>
//               </Card>
//             ))}
//           </Stack>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
//         >
//           <Card
//             variant="outlined"
//             sx={{
//               height: '100%',
//               width: '100%',
//               display: { xs: 'none', sm: 'flex' },
//               pointerEvents: 'none',
//             }}
//           >
//             <Box
//               sx={{
//                 m: 'auto',
//                 width: 420,
//                 height: 500,
//                 backgroundSize: 'contain',
//                 backgroundImage: selectedFeature.imageDark,
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
// import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
// import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: 'Dashboard',
//     description:
//       'This item could provide a snapshot of the most important metrics or data points related to the product.',
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: 'Mobile integration',
//     description:
//       'This item could provide information about the mobile app version of the product.',
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: 'Available on all platforms',
//     description:
//       'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
//   },
// ];

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <div>
//             <Typography component="h2" variant="h4" color="text.primary">
//               Product features
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mb: { xs: 2, sm: 4 } }}
//             >
//               Here you can provide a brief overview of the key features of the
//               product. For example, you could list the number of features, the types
//               of features, add-ons, or the benefits of the features.
//             </Typography>
//           </div>
//           <Stack
//             direction="column"
//             justifyContent="center"
//             alignItems="flex-start"
//             spacing={2}
//             useFlexGap
//             sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
//           >
//             {items.map(({ icon, title, description }, index) => (
//               <Card
//                 key={index}
//                 variant="outlined"
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   p: 3,
//                   height: 'fit-content',
//                   width: '100%',
//                   background: 'none',
//                   backgroundColor:
//                     selectedItemIndex === index ? 'action.selected' : undefined,
//                   borderColor: (theme) => {
//                     return selectedItemIndex === index ? 'primary.light' : 'grey.800';
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: '100%',
//                     display: 'flex',
//                     textAlign: 'left',
//                     flexDirection: { xs: 'column', md: 'row' },
//                     alignItems: { md: 'center' },
//                     gap: 2.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       color: (theme) => {
//                         return selectedItemIndex === index ? 'primary.main' : 'grey.700';
//                       },
//                     }}
//                   >
//                     {icon}
//                   </Box>
//                   <Box sx={{ textTransform: 'none' }}>
//                     <Typography
//                       color="text.primary"
//                       variant="body2"
//                       fontWeight="bold"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                       sx={{ my: 0.5 }}
//                     >
//                       {description}
//                     </Typography>
//                     <Link
//                       color="primary"
//                       variant="body2"
//                       fontWeight="bold"
//                       sx={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         '& > svg': { transition: '0.2s' },
//                         '&:hover > svg': { transform: 'translateX(2px)' },
//                       }}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <span>Learn more</span>
//                       <ChevronRightRoundedIcon
//                         fontSize="small"
//                         sx={{ mt: '1px', ml: '2px' }}
//                       />
//                     </Link>
//                   </Box>
//                 </Box>
//               </Card>
//             ))}
//           </Stack>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
//         >
//           <Card
//             variant="outlined"
//             sx={{
//               height: '100%',
//               width: '100%',
//               display: { xs: 'none', sm: 'flex' },
//               pointerEvents: 'none',
//             }}
//           >
//             <Box sx={{ p: 3 }}>
//               <Typography variant="body1" color="text.primary">
//                 {selectedFeature.description}
//               </Typography>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import image1 from '../Product.jpg';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    image: image1,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    image: '/static/images/mobile_integration.png',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    image: '/static/images/all_platforms.png',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here you can provide a brief overview of the key features of the
              product. For example, you could list the number of features, the types
              of features, add-ons, or the benefits of the features.
            </Typography>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    return selectedItemIndex === index ? 'primary.light' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" color="text.primary">
                {selectedFeature.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <img src={selectedFeature.image} alt="Product Image" style={{ maxWidth: '100%' }} />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

