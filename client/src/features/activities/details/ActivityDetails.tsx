import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"
import LoadingPage from "../../../app/shared/components/LoadingPage"

export default function ActivityDetails() {

  const navigate = useNavigate()
  // Get a hold of the id from the root
  const { id } = useParams()
  const { activity, isLoadingActivity } = useActivities(id)

  if (isLoadingActivity) return <LoadingPage loading={isLoadingActivity}/>

  if (!activity) return <Typography>Activity Not Found</Typography>

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component='img'
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/manage/${activity.id}`} color="primary" variant="outlined">Edit</Button>
        <Button onClick={() => navigate('/activities')} color="inherit" variant="outlined">Cancel</Button>
      </CardActions>
    </Card>
  )
}