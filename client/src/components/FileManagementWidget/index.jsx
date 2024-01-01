// File Management Widget component
import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { Uppy } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import AuthService from "../../utils/auth.js";
import { GET_FILE_LIST, GET_PRESIGNED_URL } from "../../utils/queries.js";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const FileManagementWidget = () => {
  const client = useApolloClient();

  const userProfile = AuthService.getProfile();
  console.log(
    "[FileManagementWidget.jsx]: username obtained?",
    userProfile?.username || userProfile?.user?.username
  );

  const [loading, setLoading] = useState(true);

  console.log("[FileManagementWidget.jsx]: Starting query for file list...");
  // Use the useQuery hook to fetch the file list
  const {
    loading: listLoading,
    error: listError,
    data: listData,
  } = useQuery(GET_FILE_LIST, {
    variables: {
      username: userProfile?.username || userProfile?.user?.username,
    },
  });

  const [fileList, setFileList] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState({});

  useEffect(() => {
    console.log("[FileManagementWidget.jsx]: In listData useEffect hook");
    console.log("[FileManagementWidget.jsx]: listData obtained?", listData);
    // Update the local state with the file list when data is available
    if (listData?.getFileList && Array.isArray(listData.getFileList)) {
      console.log(
        "[FileManagementWidget.jsx]: listData has data, updating fileList..."
      );
      // Update the local state with the file list when data is available
      setFileList(listData.getFileList);
      console.log(
        "[FileManagementWidget.jsx]: File list updated?",
        listData.getFileList
      );
    }
  }, [listData]);

  useEffect(() => {
    console.log(
      "[FileManagementWidget.jsx]: In fileList useEffect hook. fileList:",
      fileList
    );
    console.log("[FileManagementWidget.jsx]: listLoading?", listLoading);
    if (listLoading) {
      console.log("[FileManagementWidget.jsx]: Still loading file list...");
      // You can render a loading state here if needed
      return;
    }

    // Fetch download URLs for each file in the file list
    const fetchDownloadUrls = async () => {
      console.log(
        "[FileManagementWidget.jsx]: fileList has data, fetching URLs..."
      );
      const urls = {};
      for (const fileName of fileList) {
        try {
          console.log(
            `[FileManagementWidget.jsx]: Fetching presigned URL for ${fileName}...`
          );
          const { data } = await client.query({
            query: GET_PRESIGNED_URL,
            variables: {
              username: userProfile?.username || userProfile?.user?.username,
              fileName,
            },
          });
          console.log(
            `[FileManagementWidget.jsx]: Presigned URL for ${fileName} obtained?`,
            data.generatePresignedUrl
          );
          urls[fileName] = data.generatePresignedUrl;
          console.log(`[FileManagementWidget.jsx]: Current URL list:`, urls);
        } catch (error) {
          console.error(`Error fetching presigned URL for ${fileName}:`, error);
          // Handle error as needed
        }
      }
      setDownloadUrls(urls);
      setLoading(false);
    };

    // Trigger fetchDownloadUrls when fileList changes
    if (fileList.length > 0) {
      fetchDownloadUrls();
    }
  }, [fileList]);

  const [uppy] = useState(
    new Uppy({
      restrictions: {
        maxFileSize: 5000000,
        maxTotalFileSize: 20000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
          "application/rtf",
        ],
      },
      meta: { username: userProfile?.username || userProfile?.user?.username },
    })
      .use(Transloadit, {
        id: "Transloadit",
        assemblyOptions: {
          params: {
            auth: {
              key: "55b7b7bf8b474873a15cae1a2badf647", // Public key, no need to hide
            },
            template_id: "2f153913334741b69bac839c857baf5b", // Public template, no need to hide
            fields: {
              username: userProfile?.username || userProfile?.user?.username,
            },
          },
        },
      })
      .on("upload-success", (file, response) => {
        console.log("File uploaded successfully:", file);
        console.log("Transloadit response:", response);
      })
  );

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      <div className="drag-drop-wf widget-prevent-drag-wf">
        {uppy && (
          <>
            <Dashboard
              id="Dashboard"
              target="drag-drop-wf"
              uppy={uppy}
              height="100%"
            />
          </>
        )}
      </div>
      {fileList.length > 0 && (
      <div className="download-list-wf">
        <p>Your Files</p>
        <ul>
          {fileList.map((fileName) => (
            <div className="download-item-container-wf" key={fileName}>
              <li>
                {downloadUrls[fileName] ? (
                  // Add a link or button to download the file
                  <a
                    href={downloadUrls[fileName]}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="material-icons">cloud_download</i>
                  </a>
                ) : (
                  "Fetching URL..."
                )}
                {fileName}
              </li>
            </div>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default FileManagementWidget;
