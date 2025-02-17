import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    activity: Activity
    selectActivity: (id: string) => void;
}

export default function ActivityCard({ activity, selectActivity }: Props) {

    const { deleteActivity } = useActivities()

    return (
        <Card sx={{ borderRadius: 3 }} >
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display='flex' gap={1}>
                    <Button onClick={() => selectActivity(activity.id)} size="medium" variant="outlined">View</Button>
                    <Button onClick={() => deleteActivity.mutate(activity.id)}
                        size="medium"
                        color="error"
                        loading={deleteActivity.isPending}
                        variant="outlined"
                    >Delete</Button>
                </Box>

            </CardActions>
        </Card>
    )
}