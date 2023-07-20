export default interface DiaryData{
    key?: string | null | undefined,
    category: string,
    description: string,
    image?: string | undefined,
    status?: boolean,
    timeStamps: string

}