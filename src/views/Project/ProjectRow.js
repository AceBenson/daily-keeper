import React from 'react'
import { Typography,  Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box, IconButton,makeStyles } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { BlockPicker } from 'react-color'

const styles = (theme) => ({
  box: {
    background: "linear-gradient(#303030, #424242)"
  }
});

const useStyles = makeStyles(styles);


export default function ProjectRow(props) {
  const { row } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    props.handleClick(props.index);
  }

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => {handleClick()}}
        selected={props.selectedIdx === props.index}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">
          <div style={{padding: "2px", float: "right", width: "24px", height: "24px" ,backgroundColor: "white"}}>
            <div style={{ width: "20px", height: "20px", backgroundColor: row.color}}>
            </div>
          </div>
        </TableCell>
        <TableCell align="right">{row.tracked}h</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box padding={4} className={classes.box} >
              <Typography variant="h6" gutterBottom component="div">
                Recent
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell style={{width: "40%"}}>Progress</TableCell>
                    <TableCell style={{width: "40%"}}>To-do</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, key) => (
                    <TableRow key={key}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.elapsedTime}</TableCell>
                      <TableCell>{historyRow.progress}</TableCell>
                      <TableCell>{historyRow.todo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
