import axios from "axios";

export const upload = async (file: any) => {
    const CLOUNDINARY_URL = "https://api.cloudinary.com/v1_1/dvj4wwihv/image/upload";
    const CLOUNDINARY_PRESET = "js8yqruv";
    console.log(file);

    const formData = new FormData();
    formData.append("file", file.originFileObj);
    formData.append("upload_preset", CLOUNDINARY_PRESET);

    const { data } = await axios.post(CLOUNDINARY_URL, formData, {
        headers: { "Content-Type": "application/form-data" },
    });

    return data.url;
};


// export const upload = async (file: any) => {
//     const response = [] as any[];
//     const CLOUNDINARY_URL = "https://api.cloudinary.com/v1_1/dvj4wwihv/image/upload";
//     const CLOUNDINARY_PRESET = "js8yqruv";


//     const formData = new FormData();

//     if (!Array.isArray(file)) {
//         formData.append("file", file.originFileObj);
//         formData.append("upload_preset", CLOUNDINARY_PRESET);

//         const { data } = await axios.post(CLOUNDINARY_URL, formData, {
//             headers: { "Content-Type": "application/form-data" },
//         });

//         if (data) {
//             response.push(data.url)
//         }
//         return response;
//     }
//     else {
//         const { filteredArray, images } = filterUploadedFiles(file);
//         for (const i of filteredArray) {
//             formData.append("file", i.originFileObj);
//             formData.append("upload_preset", CLOUNDINARY_PRESET);

//             const { data } = await axios.post(CLOUNDINARY_URL, formData, {
//                 headers: { "Content-Type": "application/form-data" },
//             });

//             if (data) {
//                 response.push(data.url)
//             }
//         }
//         const getUrl = images.map((i: any) => i.url)
//         return [...response, ...getUrl]

//     }

// };


// export const filterUploadedFiles = (input: any) => {
//     if (!input || input.length <= 0) return;
//     console.log("input", input)
//     const filteredArray = input?.filter((record: any) => !record?.hasOwnProperty('image'));
//     const oldData = input?.filter((record: any) => record?.hasOwnProperty('image'));
//     return {
//         images: oldData,
//         filteredArray
//     } as const as any

// }