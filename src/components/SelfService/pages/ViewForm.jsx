import UseCaseDetail from "../Components/UseCaseDetail";
import UploadDetails from "../Components/UploadDetails";
import ProjectDetails from "../Components/ProjectDetails";

const ViewForm = ({ userState }) => {
  return (
    <div className="flex flex-col gap-3 h-full w-full">
      <ProjectDetails userData={userState} viewMode={true} />
      <UseCaseDetail userData={userState} viewMode={true} show={true} />
      <UploadDetails userData={userState} viewMode={true} show={true} />
      <div className="flex flex-col gap-3 p-6">
        <p className="text-[#3E3C42] text-xl font-medium">Annotated data</p>
        <div className="w-full h-fit max-h-full overflow-y-auto grid-cols-1 grid min-[430px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
          {userState.annotatedData != null &&
            userState?.annotatedData.map((item, idx) => {
              return (
                <div className="w-full h-auto bg-black relative rounded flex items-center justify-center">
                  <img
                    src={userState?.uploadedFiles[item.fileId]}
                    alt="image"
                    className="w-full rounded"
                  />
                  <p className="flex items-center gap-1 p-1 rounded-full bg-black absolute top-2 right-2 text-white font-medium text-sm bg-opacity-50">
                    {item.label}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ViewForm;
