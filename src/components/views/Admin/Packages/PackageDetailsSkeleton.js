import { Grid, Skeleton } from "@mui/material";
import PackageDetailsOptionSkeleton from "./PackageDetailsOptionSkeleton";

export default function PackageDetailsSkeleton() {
  return (
    <>
      <Grid item xs={8} paddingRight={2}>
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
        <Skeleton sx={{ mt: 2 }} height={40} animation="wave" width="80%" />
        <Skeleton height={30} animation="wave" width="50%" />
        <br/>
        <Skeleton height={30} animation="wave" />
        <Skeleton height={30} animation="wave" />
        <Skeleton height={30} animation="wave" width="90%"/>
      </Grid>
      <Grid item xs={4} paddingLeft={2} textAlign="right">
        <Skeleton sx={{ height: 50 }} animation="wave" variant="rectangular" />
        <PackageDetailsOptionSkeleton sx={{mt: 2}}/>
        <PackageDetailsOptionSkeleton/>
        <Skeleton sx={{ mt: 2 }} height={5} animation="wave" />
        <PackageDetailsOptionSkeleton sx={{mt: 2}}/>
        <Skeleton sx={{ height: 50, mt: 2 }} animation="wave" variant="rectangular" />
      </Grid>
    </>
  );
}