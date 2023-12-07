import { Link } from "react-router-dom";
import ProjectCard from "./Components/ProjectCards";





const AddClients = ()=>{

    const data = [
        {
            "id": 1,
            "founded": "12th sepetember 2023",
            "name": "orange detection",
            "client": "AsianPaints",
            "vision": "4",
            "optimus": "3",
            "users": "4",
            "locations": ["baska","Halol","Pathankot","pathankot"]
        },
        {
            "id": 2,
            "founded": "12th sepetember 2023",
            "name": "orange detection",
            "client": "AsianPaints",
            "vision": "4",
            "optimus": "3",
            "users": "4",
            "locations": ["baska","Halol","Pathankot","pathankot"]
        },
        {
            "id": 2,
            "founded": "12th sepetember 2023",
            "name": "orange detection",
            "client": "AsianPaints",
            "vision": "4",
            "optimus": "3",
            "users": "4",
            "locations": ["baska","Halol","Pathankot","pathankot"]
        }
    ]
    return(
        <div className="mt-[3vh] flex flex-col rounded-lg bg-white p-5 border ">
            <div className="bg-[#fafafa] p-4 overflow-y-auto sm:h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4 min-[1750px]:grid-cols-5 min-[2150px]:grid-cols-6 gap-6 text-base font-medium text-[#3E3C42]">
            <div
              className="rounded p-3 w-full flex flex-col justify-center gap-3 items-center bg-white"
              style={{
                boxShadow:
                  "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
              }}
            >
              <Link to={''}>
                <div className="p-[10px] bg-[#DEF] text-center rounded cursor-pointer hover:scale-105">
                  <img src="/selfServiceIcons/add.svg" alt="add" />
                </div>
              </Link>
              Create new project
            </div>
            {data.map((x) => {
              return <ProjectCard data={x} />;
            })}
          </div>
        </div>
    )
}

export default AddClients;