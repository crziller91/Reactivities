import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  // Setting a hook of an array to get the activities from the database
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      // Wait until the axios.get is finished (then). Then set the activites array with the contents
      .then(response => {
        setActivities(response.data)
      })
  }, []) //Adding this array at the end here means everything inside the useEffect executes once and once only

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((activity : any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App
