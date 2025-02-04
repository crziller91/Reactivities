import { Button, ButtonOr, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}: Props) {
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
                    <Button onClick={cancelSelectActivity} color='grey' content='Cancel' />
                </Button.Group>
            </CardContent>
        </Card>
    )
}