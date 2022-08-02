import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme();

export default function AboutUs() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Peridot is a web application that allows users to book travel-related services in real-time with email 
            updates and is mobile-optimized, making it easy to navigate through the web application on any mobile 
            device. It allows users to obtain the information they require even during non-business hours.
            </Typography>
            
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    key = ""
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="/images/montesclaros.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Full-Stack
                    </Typography>
                    <Typography>
                    An engineer or developer who works on both the front end (client-side) and the back end (server-side) of a website or application is called a full-stack developer. 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    key = ""
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="/images/rabe.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Backend
                    </Typography>
                    <Typography>
                    Backend developers work on databases, scripting languages, and website design to create the logic upon which websites and web app function.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    key = ""
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="/images/pila.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Full-Stack
                    </Typography>
                    <Typography>
                    An engineer or developer who works on both the front end (client-side) and the back end (server-side) of a website or application is called a full-stack developer. 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          <Grid container spacing={4}>
              <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    key = ""
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="/images/caneda.png"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Quality Assurance
                    </Typography>
                    <Typography>
                    Developed test plans to describe types of tests and coverage of the required system features by reviewing and analyzing product requirements, design and specifications.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    key = ""
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="/images/samson.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Front-End
                    </Typography>
                    <Typography>
                    A Front-End Developer is responsible for developing new user-facing features, determining the structure and design of web pages, building reusable codes, optimizing page loading times, and using a variety of markup languages to create the web pages.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

          </Grid>
        </Container>
        
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}