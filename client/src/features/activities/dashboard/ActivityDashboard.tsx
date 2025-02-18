import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { useActivities } from "../../../lib/hooks/useActivities";
import LoadingPage from "../../../app/shared/components/LoadingPage";

export default function ActivityDashboard() {

    const { activities, isPending } = useActivities()
    if (!activities || isPending) return <LoadingPage loading={isPending}/>

    return (
        <Grid2 container spacing={3} sx={{ pb: 3 }}>
            <Grid2 size={8}>
                <ActivityList />
            </Grid2>
            <Grid2 size={4}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}