import moment from "moment"

export default interface DiaryData{
    key?: string | null | undefined,
    category: string,
    description: string,
    image?: string | undefined,
    status?: boolean,
    startDate:string | undefined,
    endDate:string | undefined,
    timeStamps: string

}