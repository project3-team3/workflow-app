// File Management Widget component
import { useState } from "react";
import { RiDeleteBinLine, RiEyeLine } from "react-icons/ri";

const FileManagementWidget = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(files);
    newFiles.push(e.target.files[0]);
    setFiles(newFiles);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-item" key={index}>
            <span className="file-name">
              {file.name ? file.name : "Unnamed File"}
            </span>
            <div className="file-options">
              <button
                className="waves-effect waves-light btn button-wf"
                onClick={() => handleDeleteFile(index)}
              >
                <RiDeleteBinLine />
              </button>
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noreferrer"
              >
                <RiEyeLine />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="add-file">
        <input type="file" id="fileInput" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default FileManagementWidget;
