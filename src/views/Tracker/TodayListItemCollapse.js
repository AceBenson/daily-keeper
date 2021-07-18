import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Grid, FormControl, IconButton, Typography, TextField, Collapse, Button, Accordion, AccordionSummary, AccordionDetails, /*AccordionActions, Divider,*/ makeStyles} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
// import Green from "@material-ui/core/colors/green";

const styles = (theme) => ({
  expanded: {},
  root: {
    width: '100%', 
    // backgroundColor: theme.palette.action.disabled,
    // margin: 0,
    "&$expanded": {
      margin: 0,
      // backgroundColor: theme.palette.action.disabled,
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    width: "120px"
  },
  accordion: {
    paddingLeft: "20px"
  },
  accordionDetails: {
    // paddingLeft: "40px"
  }
});

const useStyles = makeStyles(styles);

export default function TodayListItemCollapse(props) {
  const classes = useStyles();

  const [openProgress, setOpenProgress] = React.useState(false);
  const [openTodo, setOpenTodo] = React.useState(false);

  const progressInput = React.useRef("");
  const todoInput = React.useRef("");

  const handleSend = (panel) => {
    if (panel.ref.current.value) {
      panel.setOpen(true);
      panel.handleSend(props.index, panel.ref.current.value); 
      panel.ref.current.value = "";
    }
  }

  return (
    <div>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        {[
          {"name": "Progress", "handleSend": props.handleAddProgress, "handleDelte": props.handleDeleteProgress, "ref": progressInput, "items": props.item.progress, "open": openProgress, "setOpen": setOpenProgress}, 
          {"name": "Todo", "handleSend": props.handleAddTodo, "handleDelte": props.handleDeleteTodo, "ref": todoInput, "items": props.item.todo, "open": openTodo, "setOpen": setOpenTodo}
        ].map((panel, key) => (
          <Accordion 
            key={key} 
            expanded={panel.open}
            onChange={() => {panel.setOpen(!panel.open)}}
            className={classes.accordion} 
            classes={{
              root: classes.root,
              expanded: classes.expanded
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              // style={{borderBottom: "2mm ridge rgb(100, 200, 0)"}}
            >
              <Typography className={classes.heading}>{panel.name}</Typography>
              <FormControl
                fullWidth
                onClick={(event) => event.stopPropagation()}
              >
                <Grid container>
                  <Grid item xs={11}>
                    <TextField 
                      fullWidth
                      inputRef={panel.ref}
                      // inputProps={{style: { textAlign: 'center' }}}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={() => {handleSend(panel);}}>
                      <SendIcon/>
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </AccordionSummary>
            <AccordionDetails 
              className={classes.accordionDetails}
              // style={{borderLeft: "2px solid rgb(100, 100, 0)"}}
            >
              <List style={{width: '100%'}}>
                {panel.items.map((value, key) => (
                  <ListItem key={key}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {value}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => panel.handleDelte(props.index, key)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>

            {/* <Divider />
            
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button size="small" color="primary">Save</Button>
            </AccordionActions> */}
          </Accordion>
        ))}
      </Collapse>
    </div>
  )
}
