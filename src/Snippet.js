import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';

export default function Snippet(props) {
  return (
    <div>
      <Paper
        className="snippetBox"
        style={
          props.item.myMessage
            ? { float: 'right' }
            : { float: 'left', backgroundColor: '#6accc3' }
        }
      >
        <Typography component="p">{props.item.message}</Typography>
      </Paper>
    </div>
  );
}
