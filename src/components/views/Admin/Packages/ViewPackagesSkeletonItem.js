import { Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';

export default function ViewPackagesSkeletonItem() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
        <CardHeader
          title={<Skeleton animation="wave" width="80%" />}
          subheader={<Skeleton animation="wave" width="40%" />}
        />
        <CardContent style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          lineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}>
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" width="50%" />
            <Skeleton animation="wave" width="80%" />
          </>
        </CardContent>
      </Card>
    </Grid>
  );
}