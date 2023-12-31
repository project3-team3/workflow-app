// Donation page
import AuthService from "../utils/auth.js";
import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_USER_SETTINGS } from "../utils/queries.js";

import LoadingSpinner from "../components/LoadingSpinner/index.jsx";

const SupportUs = () => {
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

  // Get user profile
  const userProfile = AuthService.getProfile();

  // Get user settings
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile._id || userProfile.user._id },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  // Get user's current theme
  const colorTheme = data.getUserSettings.currentTheme || "default-wf";

  // Set the color theme
  const setMode = (mode) => {
    const htmlElement = document.querySelector("html");
    htmlElement.className = "";
    htmlElement.classList.add(mode);

    // Store theme preference in localStorage
    localStorage.setItem("colorTheme", mode);
  };

  setMode(colorTheme);

  // Send user to Stripe payment page
  const handleDonateClick = () => {
    window.open("https://donate.stripe.com/00gaEI7Dsakm8ZWbII", "_blank");
  };

  return isOnline ? (
    <div className="container">
      <div className="admin-message-wf">
        <div className="support-wf">
          <svg
            className="logo-welcome-wf"
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 300 300"
            version="1.1"
          >
            <path
              d="M 191.268 5.604 C 171.122 15.352, 167.976 40.214, 181.606 81.955 C 188.080 101.777, 187.413 108.854, 177.455 126 C 164.943 147.545, 163.595 151.693, 164.295 166.500 C 164.833 177.869, 166.148 183.459, 168.497 184.360 C 171.254 185.418, 171.820 182.651, 170.308 175.500 C 167.176 160.686, 169.100 151.287, 178.394 136 C 193.502 111.150, 194.594 102.611, 186.010 76.433 C 171.107 30.988, 179.907 5.070, 208.423 10.420 C 224.672 13.468, 227.045 44.054, 211.027 43.985 C 203.338 43.951, 201.188 38.028, 206.226 30.757 C 208.330 27.720, 207.878 26, 204.977 26 C 202.254 26, 197.999 32.700, 198.004 36.982 C 198.020 52.113, 219.541 53.915, 225.649 39.298 C 234.332 18.516, 211.278 -4.077, 191.268 5.604 M 131.431 73.757 C 111.378 80.930, 105.735 106.590, 121.149 120.515 C 132.266 130.559, 147 126.299, 147 113.041 C 147 106.634, 142.980 101.640, 138.260 102.183 C 134.003 102.672, 133.968 106.284, 138.209 107.532 C 146.175 109.875, 141.742 121, 132.843 121 C 109.485 121, 115.539 80.496, 139.096 79.164 C 164.391 77.735, 172.529 107.109, 154.237 133.817 C 143.177 149.967, 140.912 158.607, 144.538 170.816 C 146.307 176.774, 152.505 184, 155.845 184 C 158.811 184, 158.665 180.694, 155.628 179.068 C 144.618 173.176, 145.751 153.936, 158.107 136.948 C 181.009 105.460, 162.877 62.508, 131.431 73.757 M 93 176.086 C 86.201 177.397, 73.323 184.193, 65.720 190.484 C 58.940 196.093, 58.940 196.093, 56.066 194.047 C 46.457 187.204, 13 210.429, 13 223.942 C 13 224.433, 16.032 227.684, 19.738 231.167 C 23.444 234.650, 30.162 241.036, 34.666 245.357 C 44.505 254.796, 42.326 255.492, 56.125 238.505 C 70.687 220.578, 74.169 205.907, 65.023 201.012 C 63.155 200.013, 63.252 199.770, 66.773 196.647 C 85.466 180.065, 107.840 175.703, 126 185.100 C 129.494 186.908, 129.466 186.912, 110.276 186.956 C 91.051 187, 91.051 187, 89.526 189.950 C 87.396 194.069, 87.514 194.734, 91.865 203.083 C 93.990 207.162, 96.091 211.850, 96.533 213.500 C 97.443 216.895, 97.460 216.950, 98.253 219 C 98.572 219.825, 99.788 223.875, 100.955 228 C 105.706 244.792, 116.598 261.053, 126.018 265.417 C 130.623 267.551, 130.623 267.551, 128.817 270.525 C 127.823 272.161, 127.008 274.288, 127.005 275.250 C 127 276.881, 124.763 277, 94.071 277 C 65.470 277, 60.936 277.206, 59.571 278.571 C 56.339 281.804, 59.089 284.289, 68.245 286.408 C 75.390 288.061, 82.180 291.714, 84.239 295.012 C 85.603 297.195, 237 298.257, 237 296.084 C 237 293.664, 245.495 288.669, 252.784 286.803 C 261.305 284.621, 263 283.644, 263 280.913 C 263 277.319, 259.953 277, 225.566 277 C 195.190 277, 192 276.845, 192 275.368 C 192 274.470, 191.063 272.220, 189.918 270.368 C 187.945 267.175, 187.933 267, 189.686 267 C 190.703 267, 193.171 265.889, 195.170 264.530 C 198.319 262.391, 198.968 262.257, 200.025 263.530 C 201.932 265.828, 205.127 265.269, 208.452 262.054 C 210.713 259.868, 214.598 258.175, 223.500 255.497 C 240.519 250.376, 249.374 244.520, 257.174 233.230 C 278.949 201.711, 261.531 167.355, 233.277 186.095 C 230.954 187.636, 228.790 188.469, 228.468 187.948 C 228.113 187.374, 210.821 187, 184.673 187 C 141.464 187, 141.464 187, 137.982 184.687 C 126.123 176.811, 107.608 173.271, 93 176.086 M 234.858 197.012 C 228.788 200.220, 219 218.099, 219 225.980 C 219 227.943, 211.750 245.506, 210.217 247.256 C 205.374 252.787, 231.730 245.097, 240.723 238.356 C 261.068 223.104, 255.798 185.949, 234.858 197.012"
              stroke="none"
              fill-rule="evenodd"
            />
          </svg>
          <h1>Support Us</h1>
          <p className="support-blurb-text-wf container">
            Found the perfect harmony in Workflow? Support our mission by buying
            us a cup of herbal tea — your donation fuels the pursuit of quality,
            harmony, and efficiency for all users.
          </p>
          <button
            onClick={handleDonateClick}
            id="support-btn-wf"
            className="waves-effect waves-light btn button-wf"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="admin-message-wf">
        <div className="support-wf">
          <p>You're offline. Please reconnect to use this feature.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
