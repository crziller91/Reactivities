export interface Activity {
    id: string
    title: string
    date: string // This is how we get it back from the database. Will be changing this to date
    description: string
    category: string
    city: string
    venue: string
}