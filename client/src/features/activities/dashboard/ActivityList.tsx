import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {

    const { activities } = useActivities()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities?.map(activity => (
                // Activities will always be popoulated here since we check for that on the Activity Dashboard
                <ActivityCard
                    key={activity.id}
                    activity={activity}
                />
            ))}
        </Box>
    )
}