import { Button, ButtonOr, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity : activity, openForm, cancelSelectedActivity} = activityStore

    // Double check to make sure we have an activity. Removes the errors
    if (!activity) return <LoadingComponent />;

    return (
        // Fluid takes up all the available space in the grid
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
            <CardHeader>{activity.title}</CardHeader>
            <CardMeta>
                <span>{activity.date}</span>
            </CardMeta>
            <CardDescription>
                {activity.description}
            </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='7'>
                    <Button onClick={() => openForm(activity.id)} color='blue' content='Edit' />
                    <ButtonOr />
                    <Button onClick={cancelSelectedActivity} color='grey' content='Cancel' />
                </Button.Group>
            </CardContent>
        </Card>
    )
}