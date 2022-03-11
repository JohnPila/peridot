import { Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';

const SkeletonLayout = styled('div')(({ theme }) => ({
  width: "100%", 
  textAlign: "right", 
  display: "flex", 
  flexDirection: "row",
  "> div:first-of-type": {
    width: "60%"
  },
  "> div:last-child": {
    width: "40%",
    display: "flex",
    flexFlow: "row-reverse",
  },
}));

export default function PackageDetailsOptionSkeleton(props) {
  const {
    innerProps, 
    ...otherProps
  } = props;

  return (
    <SkeletonLayout {...otherProps}>
      <div>
        <Skeleton height={30} animation="wave" {...innerProps} />
      </div>
      <div>
        <Skeleton height={30} animation="wave" width="60%" {...innerProps} />
      </div>
    </SkeletonLayout>
  );
}