export default function UserProfile({params} : any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <br />
            <p className="text-4xl">welcome to profile page : {params.id}</p>
        </div>
    )
}