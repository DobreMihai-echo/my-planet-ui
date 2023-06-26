export interface Marker {
    id: number,
    latitude: number,
    longitude: number,
    username: string,
    type: string,
    date: Date,
    description: string,
    eventJoiners:string[]
}