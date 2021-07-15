import React from 'react'
import { Typography } from '@material-ui/core'

import WorkingTimer from './WorkingTimer';
import TodayTimeline from './TodayTimeline';

const projects = [
  "Course",
  "Web",
  "Machine Learning"
];

export default function Tracker() {

  const [workingItemAndList, setWorkingItemAndList] = React.useState({
    workingItem: {
      project: "",
      startTime: null,
      endTime: null,
    },
    workingItemList: []
  });

  const handleProjectChange = (event) => {
    setWorkingItemAndList({
      ...workingItemAndList, 
      workingItem: {
        ...workingItemAndList.workingItem, 
        project: event.target.value
      }
    });
  };

  const handleStartTimerBtn = () => {
    const newWorkingItem = {
      ...workingItemAndList.workingItem, 
      startTime: new Date()
    }
    setWorkingItemAndList({
      ...workingItemAndList,
      workingItem: newWorkingItem
    });
  };

  const handleStopTimerBtn = () => {
    const newWorkingItem = {
      ...workingItemAndList.workingItem, 
      endTime: new Date()
    }
    setWorkingItemAndList({
      ...workingItemAndList,
      workingItem: newWorkingItem,
      workingItemList: [
        ...workingItemAndList.workingItemList,
        newWorkingItem
      ]
    });
  };

  // const test = () => {
  //   console.log(workingItemAndList);
  // }

  return (
    <div>
      <WorkingTimer 
        projects={projects}
        workingItem={workingItemAndList.workingItem}
        handleProjectChange={handleProjectChange}
        handleStartTimerBtn={handleStartTimerBtn}
        handleStopTimerBtn={handleStopTimerBtn}
      />
      {/* <Button onClick={test}>
        Test
      </Button> */}
      <Typography variant="h5" style={{margin: "50px 0px"}}>
        Today
      </Typography>
      <TodayTimeline
        workingItemList={workingItemAndList.workingItemList}
      />
    </div>
  )
}
