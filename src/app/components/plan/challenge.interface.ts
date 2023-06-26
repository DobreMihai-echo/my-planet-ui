export interface Challenge {
    id:number,
    points: number,
    title: string,
    description: string,
    creator: string,
    level: string,
    color: string,
    challengeJoiners: string[],
    challengeTags:[]
}