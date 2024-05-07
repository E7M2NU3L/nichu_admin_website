import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function ErrorDisplay({error}) {

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };


  return (
    <div>
      <Button onClick={handleClick(SlideTransition)}>Open Snackbar</Button>
      <Snackbar 
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            key={state.Transition.name}
            autoHideDuration={1200}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
