import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../utils/mutations";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
// import Dashboard from "@uppy/dashboard";
// import ProgressBar from "@uppy/progress-bar";
// import FileInput from "@uppy/file-input";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";

const FileManagementWidget = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [uppy, setUppy] = useState(null);

  const handleFileUpload = async (files) => {
    try {
      console.log("In handleFileUpload. files:", files);
      const file = files[0]; // Assuming you're dealing with a single file
      console.log("files[0]:", file);
      await uploadFile({ variables: { file } });
      // Optionally, you can handle success or update UI here
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error or update UI accordingly
    }
  };

  useEffect(() => {
    console.log("Initializing Uppy...");
    const newUppy = new Uppy()
      .use(Transloadit, {
        id: "Transloadit",
        assemblyOptions: {
          params: {
            auth: {
              key: "55b7b7bf8b474873a15cae1a2badf647", // Public key, no need to hide
            },
            template_id: "b311d23b41654cb3bfdc6b4a6c18ecd3", // Public template, no need to hide
          },
        },
      })
      .on('file-added', (file) => {
        console.log('File added:', file);
        // Call handleFileUpload when a file is added
        handleFileUpload([file]);
      });

    setUppy(newUppy);

    return () => {
      newUppy.close();
    };
  }, []);

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      <div className="drag-drop-wf widget-prevent-drag-wf">
        {uppy && <DragDrop
                    id="DragDrop"
                    target=".drag-drop-wf"
                    allowedFileTypes="image/*
                                      application/pdf
                                      application/msword
                                      application/vnd.openxmlformats-officedocument.wordprocessingml.document
                                      application/vnd.ms-excel
                                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                                      application/vnd.ms-powerpoint
                                      application/vnd.openxmlformats-officedocument.presentationml.presentation
                                      text/plain
                                      application/rtf"
                    maxFileSize="5000000"
                    maxTotalFileSize="20000000"
                    uppy={uppy}
                  />
          }
      </div>
    </div>
  );
};

export default FileManagementWidget;
