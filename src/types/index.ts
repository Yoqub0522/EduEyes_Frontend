type Images = {
    id: string
    image: string
}

interface IAdress {
    id: string
    street_name: string
    lat: number
    long: number
}

type org_type = "private_school" | "university" | "school"

export interface IOrganisation {
    id: string
    name: string
    org_type: org_type
    address: IAdress
    images: Images[]
    distance: number
    distance_km: number
}

export interface ITeacherData {
    id: string
    username: string
    full_name: string
    bio: string
    phone: string
    rating:number
    image: string
    organization: string
}