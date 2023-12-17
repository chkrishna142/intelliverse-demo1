const FileUploader = ({ setSend, send }) => {
  const selectPicture = (event) => {
    setSend([...send, event.target.files[0]]);
    console.log("send", send);
  };

  return (
    <>
      <div className="my-3">
        <div className="w-[170px]  border border-dotted border-yellow-500 h-6 ">
          <label htmlFor="image" className="cursor-pointer">
            <div className="flex justify-evenly">
              <img src="/expert/upload.svg" alt="upload" />
              <p>Document upload</p>
            </div>
          </label>
          <input
            onChange={(e) => selectPicture(e)}
            type="file"
            name="image"
            id="image"
            style={{ display: "none" }}
          />
        </div>
        <div>
          <input
            onChange={(e) => selectPicture(e)}
            type="file"
            name="image"
            id="image"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
};

export default FileUploader;
