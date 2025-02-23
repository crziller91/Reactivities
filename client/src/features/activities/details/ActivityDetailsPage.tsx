import { Typography, Grid2 } from "@mui/material"
import { useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"
import ActivityDetailsHeader from "./ActivityDetailsHeader"
import ActivityDetailsInfo from "./ActivityDetailsInfo"
import ActivityDetailsChat from "./ActivityDetailsChat"
import ActivityDetailsSidebar from "./ActivityDetailsSidebar"

export default function ActivityDetailsPage() {

  // Get a hold of the id from the root
  const { id } = useParams()
  const { activity } = useActivities(id)

  if (!activity) return <Typography>Activity Not Found</Typography>

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid2>
      <Grid2 size={4}>
        <ActivityDetailsSidebar />
      </Grid2>
    </Grid2>
  )
}