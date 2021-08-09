import React from 'react'
import { Typography,  Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box, IconButton,makeStyles } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { BlockPicker } from 'react-color'

import { read_project_detail } from '../../api/projectAPI';

const styles = (theme) => ({
  box: {
    background: "linear-gradient(#303030, #424242)"
  }
});

const useStyles = makeStyles(styles);


export default function ProjectRow(props) {
  const { project } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    // console.table(project);
    // fetch("/api/project/"+project._id)
    //   .then((res) => res.json())
    //   .then((data) => {setHistory(data.history)});
    async function fetchData() {
      const res = await read_project_detail(project._id);
      setHistory(res.data.history);
    }
    fetchData();
  }, [project._id]);

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
          {project.name}
        </TableCell>
        <TableCell align="right">
          <div style={{padding: "2px", float: "right", width: "24px", height: "24px" ,backgroundColor: "white"}}>
            <div style={{ width: "20px", height: "20px", backgroundColor: project.color}}>
            </div>
          </div>
        </TableCell>
        <TableCell align="right">{project.tracked}h</TableCell>
        <TableCell align="right">{project.status}</TableCell>
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
                    <TableCell>Elapsed Time</TableCell>
                    <TableCell style={{width: "25%"}}>Progress</TableCell>
                    <TableCell style={{width: "25%"}}>To-do</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((historyRow, key) => (
                    <TableRow key={key}>
                      <TableCell>{historyRow.start_time}</TableCell>
                      <TableCell>{historyRow.elapsed_time}</TableCell>
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
