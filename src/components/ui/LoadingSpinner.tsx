import { CircularProgress, Box } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  fullHeight?: boolean;
}

export function LoadingSpinner({ size = 40, fullHeight = false }: LoadingSpinnerProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={fullHeight ? '100vh' : 'auto'}
      padding={2}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
