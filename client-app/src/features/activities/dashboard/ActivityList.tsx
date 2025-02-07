import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;
    const[target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        // Segments give us some padding and it will give us a background color so our activities
        // stand out on our page
        <Segment>
            {/* Divided is going to put a horizontal line in between each activity */}
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    // The key is to let react know that these are each unique items
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header onClick={() => activityStore.selectActivity(activity.id)} as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    negative floated='right'
                                    content='Delete'
                                />
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})