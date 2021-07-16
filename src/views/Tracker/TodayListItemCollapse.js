import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Typography, TextField, Collapse, Button, Accordion, AccordionSummary, AccordionDetails, /*AccordionActions, Divider,*/ makeStyles} from '@material-ui/core';
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

  const progressInput = React.useRef("");
  const todoInput = React.useRef("");

  return (
    <div>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        {[
          {"name": "Progress", "handleSend": props.handleAddProgress, "handleDelte": props.handleDeleteProgress, "ref": progressInput, "items": props.item.progress}, 
          {"name": "To-do", "handleSend": props.handleAddTodo, "handleDelte": props.handleDeleteTodo, "ref": todoInput, "items": props.item.todo}
        ].map((panel, key) => (
          <Accordion key={key} className={classes.accordion} classes={{
            root: classes.root,
            expanded: classes.expanded
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>{panel.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <TextField 
                fullWidth
                inputRef={panel.ref}
                // inputProps={{style: { textAlign: 'center' }}}
              />
              <Button onClick={() => {if (panel.ref.current.value) panel.handleSend(props.index, panel.ref.current.value);}}>
                <SendIcon/>
              </Button>
            </AccordionDetails>
            <AccordionDetails className={classes.accordionDetails}>
              <List style={{width: '100%'}}>
                {panel.items.map((value, key) => (
                  <ListItem key={key} style={{justifyContent:'center'}}>
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
