import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  // Setting a hook of an array to get the activities from the database
  // Our activities array is now of type "Activity" from the activity interface
  const [activities, setActivities] = useState<Activity[]>([]);
  // Use state is expected to have an activity but undefined is not an activity. So, we have to have this or '|' statement in there
  // saying it can either be an activity or undefined (which it is defaulted to)
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // Don't need to specify the type since it will infer based on the input
  const [editMode, setEditMode] = useState(false);
  // Loading application indicator
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Using the agent here to call the axios request, enabling type safety and organization
    agent.Activities.list().then(response => {
        let activities: Activity[] = [];
        response.forEach(activity => {
          // Split out the date string. This removes the time stamp and keeps the date
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        // Loaded everything so set it to false
        setLoading(false);
      })
  }, []) //Adding this array at the end here means everything inside the useEffect executes once and once only

  function handleSelectActivity(id: string) {
    // So this x represents an activity object and defines method is going to call this predicate once for each element of the array
    // in ascending order until it finds one where the predicate returns true.
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  // Optional parameter of id
  function handleFormOpen(id?: string) {
    // If we have an id, then set it as the selected activity. If not, set the activity to undefined
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // Function to handle creating a new activity or editing an existing one
  function handleCreateOrEditActivity(activity: Activity) {
    // Check if the activity has an id. If it does, we assume it already exists in our activities list and we need to update it:
    // - Filter out the existing activity with the same id
    // - Add the updated activity to the list
    // If there is no id, it is a new activity and we just add it to the list
    setSubmitting(true);
    // If the activity id is already present, then we simply need to update the changed contents of the activity
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      // Brand new activity
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  // Deletes an activity from the list of activities
  function handleDeleteActivity(id: string) {
    // Update the activities state by filtering out the activity with the specified id.
    // The filter method creates a new array that only includes activities whose id
    // does NOT match the provided id.
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
