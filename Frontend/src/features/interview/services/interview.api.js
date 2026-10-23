// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:3000",
//     withCredentials: true,
// })


// /**
//  * @description Service to generate interview report based on user self description, resume and job description.
//  */
// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

//     const formData = new FormData()
//     formData.append("jobDescription", jobDescription)
//     formData.append("selfDescription", selfDescription)
//     formData.append("resume", resumeFile)

//     const response = await api.post("/api/interview/", formData, {
//         headers: {
//             "Content-Type": "multipart/form-data"
//         }
//     })

//     return response.data

// }


// /**
//  * @description Service to get interview report by interviewId.
//  */
// export const getInterviewReportById = async (interviewId) => {
//     const response = await api.get(`/api/interview/report/${interviewId}`)

//     return response.data
// }


// /**
//  * @description Service to get all interview reports of logged in user.
//  */
// export const getAllInterviewReports = async () => {
//     const response = await api.get("/api/interview/")

//     return response.data
// }


// /**
//  * @description Service to generate resume pdf based on user self description, resume content and job description.
//  */
// export const generateResumePdf = async ({ interviewReportId }) => {
//     const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
//         responseType: "blob"
//     })

//     return response.data
// }




import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

/**
 * Generate an interview report using the resume,
 * self-description, and job description.
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
}) => {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post(
        "/api/interview/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/**
 * Get a specific interview report by ID.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return response.data;
};

/**
 * Get all interview reports for the logged-in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/");

    return response.data;
};

/**
 * Generate and download a tailored resume PDF.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    if (!interviewReportId) {
        throw new Error("Interview report ID is missing.");
    }

    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`,
        null,
        {
            responseType: "blob",
        }
    );

    // Check whether the server returned an error instead of a PDF.
    const contentType = response.headers["content-type"] || "";

    if (contentType.includes("application/json")) {
        const errorText = await response.data.text();
        throw new Error(errorText || "Failed to generate resume PDF.");
    }

    return response.data;
};
