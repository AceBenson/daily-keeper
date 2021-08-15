import React from 'react'
import { Typography } from '@material-ui/core'

import WorkingTimer from './WorkingTimer';
import TodayList from './TodayList';
import MySnackbar from '../../components/MySnackbar';

import { read_projects } from '../../api/projectAPI';
import { create_workingitem, read_workingitems_filter_by_date, update_workingitem, delete_workingitem } from '../../api/workingitemAPI';

// const projects = [
//   "Course",
//   "Web",
//   "Machine Learning"
// ];

export default function Tracker() {
  const [workingItemAndList, setWorkingItemAndList] = React.useState({
    workingItem: {
      project: {},
      start_time: null,
      end_time: null,
      progress: "",
      todo: "",
    },
    workingItemList: []
  });

  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState("");
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    const fetchAndSetData = async () => {
      const project_res = await read_projects();
      if (project_res.status === 200)
        setProjects(project_res.data);
      else
        console.log(project_res);
  
  
      const workingitem_res = await read_workingitems_filter_by_date({params: {date: new Date()}});
      console.log(workingitem_res);
      if (project_res.status === 200) {
        const newWorkingItem = workingitem_res.data.map(function(item){
          return {
            ...item,
            start_time: new Date(item.start_time),
            end_time: new Date(item.end_time),
          }
        })
        setWorkingItemAndList({
          workingItem: {
            project: {},
            start_time: null,
            end_time: null,
            progress: "",
            todo: "",
          },
          workingItemList: newWorkingItem
        })
      }
      else
        console.log(workingitem_res);
    }
    fetchAndSetData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleProjectChange = (event) => {
    setWorkingItemAndList({
      ...workingItemAndList, 
      workingItem: {
        ...workingItemAndList.workingItem, 
        project: projects.find(project => project.name === event.target.value),
      }
    });
  };

  const handleStartTimerBtn = () => {
    const newWorkingItem = {
      ...workingItemAndList.workingItem, 
      start_time: new Date()
    }
    setWorkingItemAndList({
      ...workingItemAndList,
      workingItem: newWorkingItem
    });
  };

  const handleStopTimerBtn = async () => {
    const newWorkingItem = {
      ...workingItemAndList.workingItem, 
      end_time: new Date()
    }

    const res = await create_workingitem(newWorkingItem);

    if (res.status === 200) {
      setWorkingItemAndList({
        ...workingItemAndList,
        workingItem: {
          project: {},
          start_time: null,
          end_time: null,
          progress: "",
          todo: "",
        },
        workingItemList: [
          ...workingItemAndList.workingItemList,
          newWorkingItem
        ]
      });
      setInfo("Working item entry has been created.");
      setOpen(true);
    } else {
      console.log(res);
    }
  };

  const handleStartTimeChange = async (key, value) => {
    // console.log(`handleStartTimeChange key:${key}, value:${value}`);
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].start_time.setHours(value.substr(0, 2));
    newWorkingItemList[key].start_time.setMinutes(value.substr(3, 2));
    newWorkingItemList[key].start_time.setSeconds(value.substr(6, 2));

    const res = await update_workingitem(newWorkingItemList[key]._id, {start_time: newWorkingItemList[key].start_time});

    if (res.status === 200) {
      setWorkingItemAndList({
        ...workingItemAndList,
        workingItemList: newWorkingItemList
      });
      setInfo("Update start time successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
  }

  const handleEndTimeChange = async (key, value) => {
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].end_time.setHours(value.substr(0, 2));
    newWorkingItemList[key].end_time.setMinutes(value.substr(3, 2));
    newWorkingItemList[key].end_time.setSeconds(value.substr(6, 2));

    const res = await update_workingitem(newWorkingItemList[key]._id, {end_time: newWorkingItemList[key].end_time});

    if (res.status === 200) {
      setWorkingItemAndList({
        ...workingItemAndList,
        workingItemList: newWorkingItemList
      });
      setInfo("Update end time successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
  }

  const handleEditProgress = async (key, value) => {
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].progress = value;

    setWorkingItemAndList({
      ...workingItemAndList,
      workingItemList: newWorkingItemList
    });
  }

  const handleEditTodo = async (key, value) => {
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList[key].todo = value;

    setWorkingItemAndList({
      ...workingItemAndList,
      workingItemList: newWorkingItemList
    });
  }

  const handleUpdateInfo = async (key, progress, todo) => {
    const res = await update_workingitem(workingItemAndList.workingItemList[key]._id, {progress: progress, todo: todo});

    if (res.status === 200) {
      setInfo("Update todo successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
  }

  const handleDeleteItem = async (key) => {
    const newWorkingItemList = [...workingItemAndList.workingItemList];
    newWorkingItemList.splice(key, 1);
    const res = await delete_workingitem(workingItemAndList.workingItemList[key]._id);

    if (res.status === 200) {
      setWorkingItemAndList({
        ...workingItemAndList,
        workingItemList: newWorkingItemList
      });
      setInfo("Update todo successfully.");
      setOpen(true);
    } else {
      console.log(res);
    }
  }

  return (
    <div>
      <WorkingTimer 
        projects={projects}
        workingItem={workingItemAndList.workingItem}
        handleProjectChange={handleProjectChange}
        handleStartTimerBtn={handleStartTimerBtn}
        handleStopTimerBtn={handleStopTimerBtn}
      />
      <Typography variant="h5" style={{margin: "50px 0px"}}>
        Today
      </Typography>
      <TodayList 
        workingItemList={workingItemAndList.workingItemList}
        handleStartTimeChange={handleStartTimeChange}
        handleEndTimeChange={handleEndTimeChange}
        handleEditProgress={handleEditProgress}
        handleEditTodo={handleEditTodo}
        handleUpdateInfo={handleUpdateInfo}
        handleDeleteItem={handleDeleteItem}
      />
      <MySnackbar
        open={open}
        handleClose={handleClose}
        info={info}
      />
    </div>
  )
}
