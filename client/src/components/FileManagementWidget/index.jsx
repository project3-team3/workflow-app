// File Management Widget component
import React, { useState, useEffect } from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { Uppy } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import AuthService from "../../utils/auth.js";
import { GET_FILE_LIST, GET_PRESIGNED_URL } from "../../utils/queries.js";
import { DELETE_FILE } from "../../utils/mutations.js";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const FileManagementWidget = ({ openModal }) => {
  // Check if the user is online
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status when it changes
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // Get the Apollo Client instance
  const client = useApolloClient();

  // Get the user profile
  const userProfile = AuthService.getProfile();

  const [loading, setLoading] = useState(true);

  // Get the user's file list from AWS S3
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

  const [deleteFileMutation] = useMutation(DELETE_FILE);

  useEffect(() => {
    // Update the local state with the file list when data is available
    if (listData?.getFileList && Array.isArray(listData.getFileList)) {
      setFileList(listData.getFileList);
    }
  }, [listData]);

  useEffect(() => {
    // Get download URLs for each file in the file list
    const fetchDownloadUrls = async () => {
      const urls = {};
      for (const fileName of fileList) {
        try {
          const { data } = await client.query({
            query: GET_PRESIGNED_URL,
            variables: {
              username: userProfile?.username || userProfile?.user?.username,
              fileName,
            },
          });
          urls[fileName] = data.generatePresignedUrl;
        } catch (error) {
          console.error(`Error fetching presigned URL for ${fileName}:`, error);
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

  const handleDeleteFile = async (fileName) => {
    try {
      // Send a request to the server to delete the file
      const response = await deleteFileMutation({
        variables: {
          username: userProfile?.username || userProfile?.user?.username,
          fileName,
        },
      });

      // Update the local file list state to reflect the deletion
      setFileList((prevFileList) =>
        prevFileList.filter((name) => name !== fileName)
      );
    } catch (error) {
      console.error("[FileManagementWidget.jsx]: Error deleting file:", error);
    }
  };

  const handleDeleteFileModal = async (fileName) => {
    // Open modal in Dashboard component, wait for user to confirm
    const userChoice = await openModal();
    if (userChoice) {
      // If user confirms, delete the file
      handleDeleteFile(fileName);
    }
  };

  // Initialize Uppy uploader interface
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
        try {
          // Update the local file list state to include the newly uploaded file
          const newFileName = file.data.name;
          setFileList((prevFileList) => [...prevFileList, newFileName]);
        } catch (error) {
          console.error("Error handling file upload:", error);
        }
      })
  );

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      {isOnline ? (
        <>
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
              <div className="download-file-list-wf">
                {fileList.map((fileName) => (
                  <div className="download-item-container-wf" key={fileName}>
                    {downloadUrls[fileName] ? (
                      <a
                        href={downloadUrls[fileName]}
                        className="widget-prevent-drag-wf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="material-icons">file_download</i>
                      </a>
                    ) : (
                      <i className="material-icons">hourglass_empty</i>
                    )}
                    <div className="download-file-name-wf">{fileName}</div>
                    {downloadUrls[fileName] ? (
                      <a
                        className="widget-prevent-drag-wf"
                        onClick={() => handleDeleteFileModal(fileName)}
                      >
                        <i className="material-icons delete-icon-wf">
                          delete_forever
                        </i>
                      </a>
                    ) : (
                      <i className="material-icons delete-icon-wf">
                        hourglass_empty
                      </i>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="file-manager-offline-message-wf">
          <p>You're offline. Please reconnect to see/upload files.</p>
        </div>
      )}
    </div>
  );
};

export default FileManagementWidget;
