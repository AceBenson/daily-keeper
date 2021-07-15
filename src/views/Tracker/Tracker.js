import React from 'react'
import { Typography } from '@material-ui/core'

import WorkingTimer from './WorkingTimer';
import TodayTimeline from './TodayTimeline';
import TodayList from './TodayList';

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

  const handleStartTimeChange = (key, value) => {
    // console.log(`handleStartTimeChange key:${key}, value:${value}`);
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].startTime.setHours(value.substr(0, 2));
    newWorkingItemList[key].startTime.setMinutes(value.substr(3, 2));
    newWorkingItemList[key].startTime.setSeconds(value.substr(6, 2));

    setWorkingItemAndList({
      ...workingItemAndList,
      workingItemList: newWorkingItemList
    });
  }

  const handleEndTimeChange = (key, value) => {
    // console.log(`handleEndTimeChange key:${key}, value:${value}`);
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].endTime.setHours(value.substr(0, 2));
    newWorkingItemList[key].endTime.setMinutes(value.substr(3, 2));
    newWorkingItemList[key].endTime.setSeconds(value.substr(6, 2));


    setWorkingItemAndList({
      ...workingItemAndList,
      workingItemList: newWorkingItemList
    });
  }

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
      <TodayList 
        workingItemList={workingItemAndList.workingItemList}
        handleStartTimeChange={handleStartTimeChange}
        handleEndTimeChange={handleEndTimeChange}
      />
      <TodayTimeline
        workingItemList={workingItemAndList.workingItemList}
      />
    </div>
  )
}
