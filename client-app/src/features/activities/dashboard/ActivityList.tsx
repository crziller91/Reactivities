import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {
    return (
        // Segments give us some padding and it will give us a background color so our activities
        // stand out on our page
        <Segment>
            {/* Divided is going to put a horizontal line in between each activity */}
            <Item.Group divided>
                {activities.map(activity => (
                    // The key is to let react know that these are each unique items
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header onClick={() => selectActivity(activity.id)} as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => deleteActivity(activity.id)} negative floated='right' content='Delete' />
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}